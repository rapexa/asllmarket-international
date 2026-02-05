package subscription

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	ErrNotFound = errors.New("subscription not found")
)

type Repository interface {
	List(ctx context.Context, limit, offset int) ([]*Subscription, error)
	GetByID(ctx context.Context, id string) (*Subscription, error)
	GetBySupplierID(ctx context.Context, supplierID string) (*Subscription, error)
	GetActiveBySupplierID(ctx context.Context, supplierID string) (*Subscription, error)
	Create(ctx context.Context, s *Subscription) error
	Update(ctx context.Context, s *Subscription) error
	Delete(ctx context.Context, id string) error
}

type mySQLSubscriptionRepository struct {
	db *sql.DB
}

func NewMySQLSubscriptionRepository(db *sql.DB) Repository {
	return &mySQLSubscriptionRepository{db: db}
}

func (r *mySQLSubscriptionRepository) List(ctx context.Context, limit, offset int) ([]*Subscription, error) {
	const query = `
SELECT id, supplier_id, plan, status, started_at, expires_at, cancelled_at, 
       amount, currency, payment_method, created_at, updated_at
FROM subscriptions
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var subscriptions []*Subscription
	for rows.Next() {
		var s Subscription
		if err := rows.Scan(
			&s.ID, &s.SupplierID, &s.Plan, &s.Status, &s.StartedAt,
			&s.ExpiresAt, &s.CancelledAt, &s.Amount, &s.Currency,
			&s.PaymentMethod, &s.CreatedAt, &s.UpdatedAt,
		); err != nil {
			return nil, err
		}
		subscriptions = append(subscriptions, &s)
	}
	return subscriptions, rows.Err()
}

func (r *mySQLSubscriptionRepository) GetByID(ctx context.Context, id string) (*Subscription, error) {
	const query = `
SELECT id, supplier_id, plan, status, started_at, expires_at, cancelled_at, 
       amount, currency, payment_method, created_at, updated_at
FROM subscriptions
WHERE id = ? LIMIT 1`

	var s Subscription
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&s.ID, &s.SupplierID, &s.Plan, &s.Status, &s.StartedAt,
		&s.ExpiresAt, &s.CancelledAt, &s.Amount, &s.Currency,
		&s.PaymentMethod, &s.CreatedAt, &s.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &s, nil
}

func (r *mySQLSubscriptionRepository) GetBySupplierID(ctx context.Context, supplierID string) (*Subscription, error) {
	const query = `
SELECT id, supplier_id, plan, status, started_at, expires_at, cancelled_at, 
       amount, currency, payment_method, created_at, updated_at
FROM subscriptions
WHERE supplier_id = ?
ORDER BY created_at DESC
LIMIT 1`

	var s Subscription
	if err := r.db.QueryRowContext(ctx, query, supplierID).Scan(
		&s.ID, &s.SupplierID, &s.Plan, &s.Status, &s.StartedAt,
		&s.ExpiresAt, &s.CancelledAt, &s.Amount, &s.Currency,
		&s.PaymentMethod, &s.CreatedAt, &s.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &s, nil
}

func (r *mySQLSubscriptionRepository) GetActiveBySupplierID(ctx context.Context, supplierID string) (*Subscription, error) {
	const query = `
SELECT id, supplier_id, plan, status, started_at, expires_at, cancelled_at, 
       amount, currency, payment_method, created_at, updated_at
FROM subscriptions
WHERE supplier_id = ? AND status = 'active'
ORDER BY created_at DESC
LIMIT 1`

	var s Subscription
	if err := r.db.QueryRowContext(ctx, query, supplierID).Scan(
		&s.ID, &s.SupplierID, &s.Plan, &s.Status, &s.StartedAt,
		&s.ExpiresAt, &s.CancelledAt, &s.Amount, &s.Currency,
		&s.PaymentMethod, &s.CreatedAt, &s.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &s, nil
}

func (r *mySQLSubscriptionRepository) Create(ctx context.Context, s *Subscription) error {
	if s.ID == "" {
		s.ID = uuid.NewString()
	}
	now := time.Now().UTC()
	s.CreatedAt = now
	s.UpdatedAt = now

	const query = `
INSERT INTO subscriptions (
	id, supplier_id, plan, status, started_at, expires_at, cancelled_at, 
	amount, currency, payment_method, created_at, updated_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(ctx, query,
		s.ID, s.SupplierID, s.Plan, s.Status, s.StartedAt,
		s.ExpiresAt, s.CancelledAt, s.Amount, s.Currency,
		s.PaymentMethod, s.CreatedAt, s.UpdatedAt,
	)
	return err
}

func (r *mySQLSubscriptionRepository) Update(ctx context.Context, s *Subscription) error {
	s.UpdatedAt = time.Now().UTC()

	const query = `
UPDATE subscriptions
SET status = ?, expires_at = ?, cancelled_at = ?, updated_at = ?
WHERE id = ?`

	res, err := r.db.ExecContext(ctx, query,
		s.Status, s.ExpiresAt, s.CancelledAt, s.UpdatedAt,
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

func (r *mySQLSubscriptionRepository) Delete(ctx context.Context, id string) error {
	const query = `DELETE FROM subscriptions WHERE id = ?`
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
