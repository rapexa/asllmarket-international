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

func nullIfEmpty(s string) interface{} {
	if s == "" {
		return nil
	}
	return s
}

type Repository interface {
	List(ctx context.Context, limit, offset int, supplierID string) ([]*Product, error)
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

func (r *mySQLProductRepository) List(ctx context.Context, limit, offset int, supplierID string) ([]*Product, error) {
	query := `
SELECT id, name, description, COALESCE(JSON_UNQUOTE(JSON_EXTRACT(images, '$[0]')), '') as image_url, price, moq, currency, supplier_id,
       COALESCE(discount_percent, 0), COALESCE(free_shipping, 0), COALESCE(first_order_free_shipping, 0),
       COALESCE(guaranteed, 0), COALESCE(fast_customization, 0), selling_point_tags,
       created_at, updated_at
FROM products
WHERE status = 'active'`
	args := []interface{}{}
	if supplierID != "" {
		query += ` AND supplier_id = ?`
		args = append(args, supplierID)
	}
	query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`
	args = append(args, limit, offset)

	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []*Product
	for rows.Next() {
		var p Product
		var sellingTags sql.NullString
		if err := rows.Scan(
			&p.ID,
			&p.Name,
			&p.Description,
			&p.ImageURL,
			&p.Price,
			&p.MOQ,
			&p.Currency,
			&p.SupplierID,
			&p.DiscountPercent,
			&p.FreeShipping,
			&p.FirstOrderFreeShipping,
			&p.Guaranteed,
			&p.FastCustomization,
			&sellingTags,
			&p.CreatedAt,
			&p.UpdatedAt,
		); err != nil {
			return nil, err
		}
		if sellingTags.Valid {
			p.SellingPointTags = sellingTags.String
		}
		products = append(products, &p)
	}
	return products, rows.Err()
}

func (r *mySQLProductRepository) GetByID(ctx context.Context, id string) (*Product, error) {
	const query = `
SELECT id, name, description, COALESCE(JSON_UNQUOTE(JSON_EXTRACT(images, '$[0]')), '') as image_url, price, moq, currency, supplier_id,
       COALESCE(discount_percent, 0), COALESCE(free_shipping, 0), COALESCE(first_order_free_shipping, 0),
       COALESCE(guaranteed, 0), COALESCE(fast_customization, 0), selling_point_tags,
       created_at, updated_at
FROM products
WHERE id = ? LIMIT 1`

	var p Product
	var sellingTags sql.NullString
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&p.ID,
		&p.Name,
		&p.Description,
		&p.ImageURL,
		&p.Price,
		&p.MOQ,
		&p.Currency,
		&p.SupplierID,
		&p.DiscountPercent,
		&p.FreeShipping,
		&p.FirstOrderFreeShipping,
		&p.Guaranteed,
		&p.FastCustomization,
		&sellingTags,
		&p.CreatedAt,
		&p.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	if sellingTags.Valid {
		p.SellingPointTags = sellingTags.String
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
INSERT INTO products (id, name, description, image_url, price, moq, currency, supplier_id,
  discount_percent, free_shipping, first_order_free_shipping, guaranteed, fast_customization, selling_point_tags,
  created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(ctx, query,
		p.ID,
		p.Name,
		p.Description,
		p.ImageURL,
		p.Price,
		p.MOQ,
		p.Currency,
		p.SupplierID,
		p.DiscountPercent,
		p.FreeShipping,
		p.FirstOrderFreeShipping,
		p.Guaranteed,
		p.FastCustomization,
		nullIfEmpty(p.SellingPointTags),
		p.CreatedAt,
		p.UpdatedAt,
	)
	return err
}

func (r *mySQLProductRepository) Update(ctx context.Context, p *Product) error {
	p.UpdatedAt = time.Now().UTC()

	const query = `
UPDATE products
SET name = ?, description = ?, image_url = ?, price = ?, moq = ?, currency = ?,
    discount_percent = ?, free_shipping = ?, first_order_free_shipping = ?, guaranteed = ?, fast_customization = ?, selling_point_tags = ?,
    updated_at = ?
WHERE id = ?`

	res, err := r.db.ExecContext(ctx, query,
		p.Name,
		p.Description,
		p.ImageURL,
		p.Price,
		p.MOQ,
		p.Currency,
		p.DiscountPercent,
		p.FreeShipping,
		p.FirstOrderFreeShipping,
		p.Guaranteed,
		p.FastCustomization,
		nullIfEmpty(p.SellingPointTags),
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
