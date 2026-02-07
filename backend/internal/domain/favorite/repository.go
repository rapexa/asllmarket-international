package favorite

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
)

var ErrNotFound = errors.New("favorite not found")

type Repository interface {
	ListByUserID(ctx context.Context, userID string, limit, offset int) ([]*Favorite, error)
	Add(ctx context.Context, userID, productID string) (*Favorite, error)
	Remove(ctx context.Context, userID, productID string) error
	Exists(ctx context.Context, userID, productID string) (bool, error)
}

type mySQLFavoriteRepository struct {
	db *sql.DB
}

func NewMySQLFavoriteRepository(db *sql.DB) Repository {
	return &mySQLFavoriteRepository{db: db}
}

func (r *mySQLFavoriteRepository) ListByUserID(ctx context.Context, userID string, limit, offset int) ([]*Favorite, error) {
	const query = `
SELECT id, user_id, product_id, created_at
FROM favorites
WHERE user_id = ?
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, userID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []*Favorite
	for rows.Next() {
		var f Favorite
		if err := rows.Scan(&f.ID, &f.UserID, &f.ProductID, &f.CreatedAt); err != nil {
			return nil, err
		}
		list = append(list, &f)
	}
	return list, rows.Err()
}

func (r *mySQLFavoriteRepository) Add(ctx context.Context, userID, productID string) (*Favorite, error) {
	id := uuid.NewString()
	now := time.Now().UTC()

	_, err := r.db.ExecContext(ctx,
		`INSERT IGNORE INTO favorites (id, user_id, product_id, created_at) VALUES (?, ?, ?, ?)`,
		id, userID, productID, now,
	)
	if err != nil {
		return nil, err
	}
	// Return the row (either just inserted or existing)
	var f Favorite
	err = r.db.QueryRowContext(ctx,
		`SELECT id, user_id, product_id, created_at FROM favorites WHERE user_id = ? AND product_id = ? LIMIT 1`,
		userID, productID,
	).Scan(&f.ID, &f.UserID, &f.ProductID, &f.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &f, nil
}

func (r *mySQLFavoriteRepository) Remove(ctx context.Context, userID, productID string) error {
	const query = `DELETE FROM favorites WHERE user_id = ? AND product_id = ?`
	res, err := r.db.ExecContext(ctx, query, userID, productID)
	if err != nil {
		return err
	}
	rows, _ := res.RowsAffected()
	if rows == 0 {
		return ErrNotFound
	}
	return nil
}

func (r *mySQLFavoriteRepository) Exists(ctx context.Context, userID, productID string) (bool, error) {
	const query = `SELECT 1 FROM favorites WHERE user_id = ? AND product_id = ? LIMIT 1`
	var x int
	err := r.db.QueryRowContext(ctx, query, userID, productID).Scan(&x)
	if err == sql.ErrNoRows {
		return false, nil
	}
	if err != nil {
		return false, err
	}
	return true, nil
}
