package product

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"strings"
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
SELECT id, name, description, images, price, moq, currency, supplier_id, created_at, updated_at
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
		var imagesJSON sql.NullString
		if err := rows.Scan(
			&p.ID,
			&p.Name,
			&p.Description,
			&imagesJSON,
			&p.Price,
			&p.MOQ,
			&p.Currency,
			&p.SupplierID,
			&p.CreatedAt,
			&p.UpdatedAt,
		); err != nil {
			return nil, err
		}
		// Extract first image from JSON array
		if imagesJSON.Valid && imagesJSON.String != "" {
			var images []string
			if err := json.Unmarshal([]byte(imagesJSON.String), &images); err == nil && len(images) > 0 {
				p.ImageURL = images[0]
			} else if !strings.HasPrefix(imagesJSON.String, "[") {
				// Fallback: if it's not JSON, treat as single string
				p.ImageURL = imagesJSON.String
			}
		}
		products = append(products, &p)
	}
	return products, rows.Err()
}

func (r *mySQLProductRepository) GetByID(ctx context.Context, id string) (*Product, error) {
	const query = `
SELECT id, name, description, images, price, moq, currency, supplier_id, created_at, updated_at
FROM products
WHERE id = ? LIMIT 1`

	var p Product
	var imagesJSON sql.NullString
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&p.ID,
		&p.Name,
		&p.Description,
		&imagesJSON,
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
	// Extract first image from JSON array
	if imagesJSON.Valid && imagesJSON.String != "" {
		var images []string
		if err := json.Unmarshal([]byte(imagesJSON.String), &images); err == nil && len(images) > 0 {
			p.ImageURL = images[0]
		} else if !strings.HasPrefix(imagesJSON.String, "[") {
			// Fallback: if it's not JSON, treat as single string
			p.ImageURL = imagesJSON.String
		}
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

	// Convert ImageURL to JSON array format for images column
	imagesJSON := "[]"
	if p.ImageURL != "" {
		images := []string{p.ImageURL}
		if data, err := json.Marshal(images); err == nil {
			imagesJSON = string(data)
		}
	}

	const query = `
INSERT INTO products (id, name, description, images, price, moq, currency, supplier_id, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(ctx, query,
		p.ID,
		p.Name,
		p.Description,
		imagesJSON,
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

	// Convert ImageURL to JSON array format for images column
	imagesJSON := "[]"
	if p.ImageURL != "" {
		images := []string{p.ImageURL}
		if data, err := json.Marshal(images); err == nil {
			imagesJSON = string(data)
		}
	}

	const query = `
UPDATE products
SET name = ?, description = ?, images = ?, price = ?, moq = ?, currency = ?, updated_at = ?
WHERE id = ?`

	res, err := r.db.ExecContext(ctx, query,
		p.Name,
		p.Description,
		imagesJSON,
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
