package review

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
)

var ErrNotFound = errors.New("review not found")

type Repository interface {
	ListByProductID(ctx context.Context, productID string, limit, offset int) ([]*Review, error)
	ListBySupplierID(ctx context.Context, supplierID string, limit, offset int) ([]*Review, error)
	Create(ctx context.Context, r *Review) error
}

type mySQLReviewRepository struct {
	db *sql.DB
}

func NewMySQLReviewRepository(db *sql.DB) Repository {
	return &mySQLReviewRepository{db: db}
}

func (r *mySQLReviewRepository) ListByProductID(ctx context.Context, productID string, limit, offset int) ([]*Review, error) {
	const query = `
SELECT id, product_id, supplier_id, reviewer_id, rating, title, comment, verified_purchase, helpful_count, created_at, updated_at
FROM reviews
WHERE product_id = ?
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, productID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []*Review
	for rows.Next() {
		var rev Review
		if err := rows.Scan(
			&rev.ID, &rev.ProductID, &rev.SupplierID, &rev.ReviewerID, &rev.Rating, &rev.Title, &rev.Comment,
			&rev.VerifiedPurchase, &rev.HelpfulCount, &rev.CreatedAt, &rev.UpdatedAt,
		); err != nil {
			return nil, err
		}
		list = append(list, &rev)
	}
	return list, rows.Err()
}

func (r *mySQLReviewRepository) ListBySupplierID(ctx context.Context, supplierID string, limit, offset int) ([]*Review, error) {
	const query = `
SELECT id, product_id, supplier_id, reviewer_id, rating, title, comment, verified_purchase, helpful_count, created_at, updated_at
FROM reviews
WHERE supplier_id = ?
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, supplierID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []*Review
	for rows.Next() {
		var rev Review
		if err := rows.Scan(
			&rev.ID, &rev.ProductID, &rev.SupplierID, &rev.ReviewerID, &rev.Rating, &rev.Title, &rev.Comment,
			&rev.VerifiedPurchase, &rev.HelpfulCount, &rev.CreatedAt, &rev.UpdatedAt,
		); err != nil {
			return nil, err
		}
		list = append(list, &rev)
	}
	return list, rows.Err()
}

func (r *mySQLReviewRepository) Create(ctx context.Context, rev *Review) error {
	if rev.ID == "" {
		rev.ID = uuid.NewString()
	}
	now := time.Now().UTC()
	rev.CreatedAt = now
	rev.UpdatedAt = now

	const query = `
INSERT INTO reviews (id, product_id, supplier_id, reviewer_id, rating, title, comment, verified_purchase, helpful_count, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(ctx, query,
		rev.ID, rev.ProductID, rev.SupplierID, rev.ReviewerID, rev.Rating, rev.Title, rev.Comment,
		rev.VerifiedPurchase, rev.HelpfulCount, rev.CreatedAt, rev.UpdatedAt,
	)
	return err
}
