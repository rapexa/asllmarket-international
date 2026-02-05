package product

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	ErrNotFound = errors.New("product not found")
)

type Repository interface {
	List(ctx context.Context, limit, offset int) ([]*Product, error)
	GetByID(ctx context.Context, id string) (*Product, error)
	Create(ctx context.Context, p *Product) error
	Update(ctx context.Context, p *Product) error
	Delete(ctx context.Context, id string) error
}

type mySQLProductRepository struct {
	db *sql.DB
}

func NewMySQLProductRepository(db *sql.DB) Repository {
	return &mySQLProductRepository{db: db}
}

func (r *mySQLProductRepository) List(ctx context.Context, limit, offset int) ([]*Product, error) {
	const query = `
SELECT id, name, description, image_url, price, moq, currency, supplier_id, created_at, updated_at
FROM products
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []*Product
	for rows.Next() {
		var p Product
		if err := rows.Scan(
			&p.ID,
			&p.Name,
			&p.Description,
			&p.ImageURL,
			&p.Price,
			&p.MOQ,
			&p.Currency,
			&p.SupplierID,
			&p.CreatedAt,
			&p.UpdatedAt,
		); err != nil {
			return nil, err
		}
		products = append(products, &p)
	}
	return products, rows.Err()
}

func (r *mySQLProductRepository) GetByID(ctx context.Context, id string) (*Product, error) {
	const query = `
SELECT id, name, description, image_url, price, moq, currency, supplier_id, created_at, updated_at
FROM products
WHERE id = ? LIMIT 1`

	var p Product
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&p.ID,
		&p.Name,
		&p.Description,
		&p.ImageURL,
		&p.Price,
		&p.MOQ,
		&p.Currency,
		&p.SupplierID,
		&p.CreatedAt,
		&p.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &p, nil
}

func (r *mySQLProductRepository) Create(ctx context.Context, p *Product) error {
	if p.ID == "" {
		p.ID = uuid.NewString()
	}
	now := time.Now().UTC()
	p.CreatedAt = now
	p.UpdatedAt = now

	const query = `
INSERT INTO products (id, name, description, image_url, price, moq, currency, supplier_id, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(ctx, query,
		p.ID,
		p.Name,
		p.Description,
		p.ImageURL,
		p.Price,
		p.MOQ,
		p.Currency,
		p.SupplierID,
		p.CreatedAt,
		p.UpdatedAt,
	)
	return err
}

func (r *mySQLProductRepository) Update(ctx context.Context, p *Product) error {
	p.UpdatedAt = time.Now().UTC()

	const query = `
UPDATE products
SET name = ?, description = ?, image_url = ?, price = ?, moq = ?, currency = ?, updated_at = ?
WHERE id = ?`

	res, err := r.db.ExecContext(ctx, query,
		p.Name,
		p.Description,
		p.ImageURL,
		p.Price,
		p.MOQ,
		p.Currency,
		p.UpdatedAt,
		p.ID,
	)
	if err != nil {
		return err
	}
	rows, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return ErrNotFound
	}
	return nil
}

func (r *mySQLProductRepository) Delete(ctx context.Context, id string) error {
	const query = `DELETE FROM products WHERE id = ?`
	res, err := r.db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	rows, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return ErrNotFound
	}
	return nil
}

