package order

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	ErrNotFound = errors.New("order not found")
)

type Repository interface {
	List(ctx context.Context, limit, offset int) ([]*Order, error)
	ListByBuyerID(ctx context.Context, buyerID string, limit, offset int) ([]*Order, error)
	ListBySupplierID(ctx context.Context, supplierID string, limit, offset int) ([]*Order, error)
	GetByID(ctx context.Context, id string) (*Order, error)
	GetByOrderNumber(ctx context.Context, orderNumber string) (*Order, error)
	Create(ctx context.Context, o *Order) error
	Update(ctx context.Context, o *Order) error
	Delete(ctx context.Context, id string) error
}

type mySQLOrderRepository struct {
	db *sql.DB
}

func NewMySQLOrderRepository(db *sql.DB) Repository {
	return &mySQLOrderRepository{db: db}
}

func (r *mySQLOrderRepository) List(ctx context.Context, limit, offset int) ([]*Order, error) {
	const query = `
SELECT id, order_number, buyer_id, supplier_id, product_id, quantity, unit_price, 
       total_amount, currency, status, payment_status, payment_method, shipping_address, 
       shipping_method, tracking_number, estimated_delivery, delivered_at, created_at, updated_at
FROM orders
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var orders []*Order
	for rows.Next() {
		var o Order
		if err := rows.Scan(
			&o.ID, &o.OrderNumber, &o.BuyerID, &o.SupplierID, &o.ProductID, &o.Quantity,
			&o.UnitPrice, &o.TotalAmount, &o.Currency, &o.Status, &o.PaymentStatus,
			&o.PaymentMethod, &o.ShippingAddress, &o.ShippingMethod, &o.TrackingNumber,
			&o.EstimatedDelivery, &o.DeliveredAt, &o.CreatedAt, &o.UpdatedAt,
		); err != nil {
			return nil, err
		}
		orders = append(orders, &o)
	}
	return orders, rows.Err()
}

func (r *mySQLOrderRepository) ListByBuyerID(ctx context.Context, buyerID string, limit, offset int) ([]*Order, error) {
	const query = `
SELECT id, order_number, buyer_id, supplier_id, product_id, quantity, unit_price, 
       total_amount, currency, status, payment_status, payment_method, shipping_address, 
       shipping_method, tracking_number, estimated_delivery, delivered_at, created_at, updated_at
FROM orders
WHERE buyer_id = ?
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, buyerID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var orders []*Order
	for rows.Next() {
		var o Order
		if err := rows.Scan(
			&o.ID, &o.OrderNumber, &o.BuyerID, &o.SupplierID, &o.ProductID, &o.Quantity,
			&o.UnitPrice, &o.TotalAmount, &o.Currency, &o.Status, &o.PaymentStatus,
			&o.PaymentMethod, &o.ShippingAddress, &o.ShippingMethod, &o.TrackingNumber,
			&o.EstimatedDelivery, &o.DeliveredAt, &o.CreatedAt, &o.UpdatedAt,
		); err != nil {
			return nil, err
		}
		orders = append(orders, &o)
	}
	return orders, rows.Err()
}

func (r *mySQLOrderRepository) ListBySupplierID(ctx context.Context, supplierID string, limit, offset int) ([]*Order, error) {
	const query = `
SELECT id, order_number, buyer_id, supplier_id, product_id, quantity, unit_price, 
       total_amount, currency, status, payment_status, payment_method, shipping_address, 
       shipping_method, tracking_number, estimated_delivery, delivered_at, created_at, updated_at
FROM orders
WHERE supplier_id = ?
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, supplierID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var orders []*Order
	for rows.Next() {
		var o Order
		if err := rows.Scan(
			&o.ID, &o.OrderNumber, &o.BuyerID, &o.SupplierID, &o.ProductID, &o.Quantity,
			&o.UnitPrice, &o.TotalAmount, &o.Currency, &o.Status, &o.PaymentStatus,
			&o.PaymentMethod, &o.ShippingAddress, &o.ShippingMethod, &o.TrackingNumber,
			&o.EstimatedDelivery, &o.DeliveredAt, &o.CreatedAt, &o.UpdatedAt,
		); err != nil {
			return nil, err
		}
		orders = append(orders, &o)
	}
	return orders, rows.Err()
}

func (r *mySQLOrderRepository) GetByID(ctx context.Context, id string) (*Order, error) {
	const query = `
SELECT id, order_number, buyer_id, supplier_id, product_id, quantity, unit_price, 
       total_amount, currency, status, payment_status, payment_method, shipping_address, 
       shipping_method, tracking_number, estimated_delivery, delivered_at, created_at, updated_at
FROM orders
WHERE id = ? LIMIT 1`

	var o Order
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&o.ID, &o.OrderNumber, &o.BuyerID, &o.SupplierID, &o.ProductID, &o.Quantity,
		&o.UnitPrice, &o.TotalAmount, &o.Currency, &o.Status, &o.PaymentStatus,
		&o.PaymentMethod, &o.ShippingAddress, &o.ShippingMethod, &o.TrackingNumber,
		&o.EstimatedDelivery, &o.DeliveredAt, &o.CreatedAt, &o.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &o, nil
}

func (r *mySQLOrderRepository) GetByOrderNumber(ctx context.Context, orderNumber string) (*Order, error) {
	const query = `
SELECT id, order_number, buyer_id, supplier_id, product_id, quantity, unit_price, 
       total_amount, currency, status, payment_status, payment_method, shipping_address, 
       shipping_method, tracking_number, estimated_delivery, delivered_at, created_at, updated_at
FROM orders
WHERE order_number = ? LIMIT 1`

	var o Order
	if err := r.db.QueryRowContext(ctx, query, orderNumber).Scan(
		&o.ID, &o.OrderNumber, &o.BuyerID, &o.SupplierID, &o.ProductID, &o.Quantity,
		&o.UnitPrice, &o.TotalAmount, &o.Currency, &o.Status, &o.PaymentStatus,
		&o.PaymentMethod, &o.ShippingAddress, &o.ShippingMethod, &o.TrackingNumber,
		&o.EstimatedDelivery, &o.DeliveredAt, &o.CreatedAt, &o.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &o, nil
}

func (r *mySQLOrderRepository) Create(ctx context.Context, o *Order) error {
	if o.ID == "" {
		o.ID = uuid.NewString()
	}
	now := time.Now().UTC()
	o.CreatedAt = now
	o.UpdatedAt = now

	const query = `
INSERT INTO orders (
	id, order_number, buyer_id, supplier_id, product_id, quantity, unit_price, 
	total_amount, currency, status, payment_status, payment_method, shipping_address, 
	shipping_method, tracking_number, estimated_delivery, delivered_at, created_at, updated_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(ctx, query,
		o.ID, o.OrderNumber, o.BuyerID, o.SupplierID, o.ProductID, o.Quantity,
		o.UnitPrice, o.TotalAmount, o.Currency, o.Status, o.PaymentStatus,
		o.PaymentMethod, o.ShippingAddress, o.ShippingMethod, o.TrackingNumber,
		o.EstimatedDelivery, o.DeliveredAt, o.CreatedAt, o.UpdatedAt,
	)
	return err
}

func (r *mySQLOrderRepository) Update(ctx context.Context, o *Order) error {
	o.UpdatedAt = time.Now().UTC()

	const query = `
UPDATE orders
SET status = ?, payment_status = ?, shipping_method = ?, tracking_number = ?, 
    estimated_delivery = ?, delivered_at = ?, updated_at = ?
WHERE id = ?`

	res, err := r.db.ExecContext(ctx, query,
		o.Status, o.PaymentStatus, o.ShippingMethod, o.TrackingNumber,
		o.EstimatedDelivery, o.DeliveredAt, o.UpdatedAt,
		o.ID,
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

func (r *mySQLOrderRepository) Delete(ctx context.Context, id string) error {
	const query = `DELETE FROM orders WHERE id = ?`
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
