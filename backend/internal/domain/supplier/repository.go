package supplier

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	ErrNotFound = errors.New("supplier not found")
)

type Repository interface {
	List(ctx context.Context, limit, offset int) ([]*Supplier, error)
	GetByID(ctx context.Context, id string) (*Supplier, error)
	GetByUserID(ctx context.Context, userID string) (*Supplier, error)
	Create(ctx context.Context, s *Supplier) error
	Update(ctx context.Context, s *Supplier) error
	Delete(ctx context.Context, id string) error
}

type mySQLSupplierRepository struct {
	db *sql.DB
}

func NewMySQLSupplierRepository(db *sql.DB) Repository {
	return &mySQLSupplierRepository{db: db}
}

func (r *mySQLSupplierRepository) List(ctx context.Context, limit, offset int) ([]*Supplier, error) {
	const query = `
SELECT id, user_id, company_name, contact_name, email, phone, country, city, address, 
       logo, description, verified, status, subscription, rating, total_products, 
       total_orders, total_revenue, response_rate, response_time, established, employees, 
       created_at, updated_at
FROM suppliers
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var suppliers []*Supplier
	for rows.Next() {
		var s Supplier
		if err := rows.Scan(
			&s.ID, &s.UserID, &s.CompanyName, &s.ContactName, &s.Email, &s.Phone,
			&s.Country, &s.City, &s.Address, &s.Logo, &s.Description, &s.Verified,
			&s.Status, &s.Subscription, &s.Rating, &s.TotalProducts, &s.TotalOrders,
			&s.TotalRevenue, &s.ResponseRate, &s.ResponseTime, &s.Established, &s.Employees,
			&s.CreatedAt, &s.UpdatedAt,
		); err != nil {
			return nil, err
		}
		suppliers = append(suppliers, &s)
	}
	return suppliers, rows.Err()
}

func (r *mySQLSupplierRepository) GetByID(ctx context.Context, id string) (*Supplier, error) {
	const query = `
SELECT id, user_id, company_name, contact_name, email, phone, country, city, address, 
       logo, description, verified, status, subscription, rating, total_products, 
       total_orders, total_revenue, response_rate, response_time, established, employees, 
       created_at, updated_at
FROM suppliers
WHERE id = ? LIMIT 1`

	var s Supplier
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&s.ID, &s.UserID, &s.CompanyName, &s.ContactName, &s.Email, &s.Phone,
		&s.Country, &s.City, &s.Address, &s.Logo, &s.Description, &s.Verified,
		&s.Status, &s.Subscription, &s.Rating, &s.TotalProducts, &s.TotalOrders,
		&s.TotalRevenue, &s.ResponseRate, &s.ResponseTime, &s.Established, &s.Employees,
		&s.CreatedAt, &s.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &s, nil
}

func (r *mySQLSupplierRepository) GetByUserID(ctx context.Context, userID string) (*Supplier, error) {
	const query = `
SELECT id, user_id, company_name, contact_name, email, phone, country, city, address, 
       logo, description, verified, status, subscription, rating, total_products, 
       total_orders, total_revenue, response_rate, response_time, established, employees, 
       created_at, updated_at
FROM suppliers
WHERE user_id = ? LIMIT 1`

	var s Supplier
	if err := r.db.QueryRowContext(ctx, query, userID).Scan(
		&s.ID, &s.UserID, &s.CompanyName, &s.ContactName, &s.Email, &s.Phone,
		&s.Country, &s.City, &s.Address, &s.Logo, &s.Description, &s.Verified,
		&s.Status, &s.Subscription, &s.Rating, &s.TotalProducts, &s.TotalOrders,
		&s.TotalRevenue, &s.ResponseRate, &s.ResponseTime, &s.Established, &s.Employees,
		&s.CreatedAt, &s.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &s, nil
}

func (r *mySQLSupplierRepository) Create(ctx context.Context, s *Supplier) error {
	if s.ID == "" {
		s.ID = uuid.NewString()
	}
	now := time.Now().UTC()
	s.CreatedAt = now
	s.UpdatedAt = now

	const query = `
INSERT INTO suppliers (
	id, user_id, company_name, contact_name, email, phone, country, city, address, 
	logo, description, verified, status, subscription, rating, total_products, 
	total_orders, total_revenue, response_rate, response_time, established, employees, 
	created_at, updated_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(ctx, query,
		s.ID, s.UserID, s.CompanyName, s.ContactName, s.Email, s.Phone,
		s.Country, s.City, s.Address, s.Logo, s.Description, s.Verified,
		s.Status, s.Subscription, s.Rating, s.TotalProducts, s.TotalOrders,
		s.TotalRevenue, s.ResponseRate, s.ResponseTime, s.Established, s.Employees,
		s.CreatedAt, s.UpdatedAt,
	)
	return err
}

func (r *mySQLSupplierRepository) Update(ctx context.Context, s *Supplier) error {
	s.UpdatedAt = time.Now().UTC()

	const query = `
UPDATE suppliers
SET company_name = ?, contact_name = ?, phone = ?, city = ?, address = ?, 
    logo = ?, description = ?, verified = ?, status = ?, subscription = ?, 
    rating = ?, total_products = ?, total_orders = ?, total_revenue = ?, 
    response_rate = ?, response_time = ?, established = ?, employees = ?, updated_at = ?
WHERE id = ?`

	res, err := r.db.ExecContext(ctx, query,
		s.CompanyName, s.ContactName, s.Phone, s.City, s.Address,
		s.Logo, s.Description, s.Verified, s.Status, s.Subscription,
		s.Rating, s.TotalProducts, s.TotalOrders, s.TotalRevenue,
		s.ResponseRate, s.ResponseTime, s.Established, s.Employees, s.UpdatedAt,
		s.ID,
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

func (r *mySQLSupplierRepository) Delete(ctx context.Context, id string) error {
	const query = `DELETE FROM suppliers WHERE id = ?`
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
