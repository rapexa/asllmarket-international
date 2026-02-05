package rfq

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	ErrNotFound = errors.New("rfq not found")
)

type Repository interface {
	// RFQ
	ListRFQs(ctx context.Context, limit, offset int) ([]*RFQ, error)
	ListRFQsByBuyerID(ctx context.Context, buyerID string, limit, offset int) ([]*RFQ, error)
	ListRFQsBySupplierID(ctx context.Context, supplierID string, limit, offset int) ([]*RFQ, error)
	GetRFQByID(ctx context.Context, id string) (*RFQ, error)
	CreateRFQ(ctx context.Context, rfq *RFQ) error
	UpdateRFQ(ctx context.Context, rfq *RFQ) error
	DeleteRFQ(ctx context.Context, id string) error

	// RFQ Responses
	ListResponsesByRFQID(ctx context.Context, rfqID string) ([]*RFQResponse, error)
	GetResponseByID(ctx context.Context, id string) (*RFQResponse, error)
	CreateResponse(ctx context.Context, resp *RFQResponse) error
	UpdateResponse(ctx context.Context, resp *RFQResponse) error
	DeleteResponse(ctx context.Context, id string) error
}

type mySQLRFQRepository struct {
	db *sql.DB
}

func NewMySQLRFQRepository(db *sql.DB) Repository {
	return &mySQLRFQRepository{db: db}
}

func (r *mySQLRFQRepository) ListRFQs(ctx context.Context, limit, offset int) ([]*RFQ, error) {
	const query = `
SELECT id, buyer_id, product_id, product_name, product_image, supplier_id, quantity, unit, 
       specifications, requirements, delivery_location, preferred_delivery_date, budget, 
       currency, status, submitted_at, expires_at, created_at, updated_at
FROM rfqs
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var rfqs []*RFQ
	for rows.Next() {
		var rfq RFQ
		if err := rows.Scan(
			&rfq.ID, &rfq.BuyerID, &rfq.ProductID, &rfq.ProductName, &rfq.ProductImage,
			&rfq.SupplierID, &rfq.Quantity, &rfq.Unit, &rfq.Specifications, &rfq.Requirements,
			&rfq.DeliveryLocation, &rfq.PreferredDeliveryDate, &rfq.Budget, &rfq.Currency,
			&rfq.Status, &rfq.SubmittedAt, &rfq.ExpiresAt, &rfq.CreatedAt, &rfq.UpdatedAt,
		); err != nil {
			return nil, err
		}
		rfqs = append(rfqs, &rfq)
	}
	return rfqs, rows.Err()
}

func (r *mySQLRFQRepository) ListRFQsByBuyerID(ctx context.Context, buyerID string, limit, offset int) ([]*RFQ, error) {
	const query = `
SELECT id, buyer_id, product_id, product_name, product_image, supplier_id, quantity, unit, 
       specifications, requirements, delivery_location, preferred_delivery_date, budget, 
       currency, status, submitted_at, expires_at, created_at, updated_at
FROM rfqs
WHERE buyer_id = ?
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, buyerID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var rfqs []*RFQ
	for rows.Next() {
		var rfq RFQ
		if err := rows.Scan(
			&rfq.ID, &rfq.BuyerID, &rfq.ProductID, &rfq.ProductName, &rfq.ProductImage,
			&rfq.SupplierID, &rfq.Quantity, &rfq.Unit, &rfq.Specifications, &rfq.Requirements,
			&rfq.DeliveryLocation, &rfq.PreferredDeliveryDate, &rfq.Budget, &rfq.Currency,
			&rfq.Status, &rfq.SubmittedAt, &rfq.ExpiresAt, &rfq.CreatedAt, &rfq.UpdatedAt,
		); err != nil {
			return nil, err
		}
		rfqs = append(rfqs, &rfq)
	}
	return rfqs, rows.Err()
}

func (r *mySQLRFQRepository) ListRFQsBySupplierID(ctx context.Context, supplierID string, limit, offset int) ([]*RFQ, error) {
	const query = `
SELECT id, buyer_id, product_id, product_name, product_image, supplier_id, quantity, unit, 
       specifications, requirements, delivery_location, preferred_delivery_date, budget, 
       currency, status, submitted_at, expires_at, created_at, updated_at
FROM rfqs
WHERE supplier_id = ? OR supplier_id IS NULL
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, supplierID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var rfqs []*RFQ
	for rows.Next() {
		var rfq RFQ
		if err := rows.Scan(
			&rfq.ID, &rfq.BuyerID, &rfq.ProductID, &rfq.ProductName, &rfq.ProductImage,
			&rfq.SupplierID, &rfq.Quantity, &rfq.Unit, &rfq.Specifications, &rfq.Requirements,
			&rfq.DeliveryLocation, &rfq.PreferredDeliveryDate, &rfq.Budget, &rfq.Currency,
			&rfq.Status, &rfq.SubmittedAt, &rfq.ExpiresAt, &rfq.CreatedAt, &rfq.UpdatedAt,
		); err != nil {
			return nil, err
		}
		rfqs = append(rfqs, &rfq)
	}
	return rfqs, rows.Err()
}

func (r *mySQLRFQRepository) GetRFQByID(ctx context.Context, id string) (*RFQ, error) {
	const query = `
SELECT id, buyer_id, product_id, product_name, product_image, supplier_id, quantity, unit, 
       specifications, requirements, delivery_location, preferred_delivery_date, budget, 
       currency, status, submitted_at, expires_at, created_at, updated_at
FROM rfqs
WHERE id = ? LIMIT 1`

	var rfq RFQ
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&rfq.ID, &rfq.BuyerID, &rfq.ProductID, &rfq.ProductName, &rfq.ProductImage,
		&rfq.SupplierID, &rfq.Quantity, &rfq.Unit, &rfq.Specifications, &rfq.Requirements,
		&rfq.DeliveryLocation, &rfq.PreferredDeliveryDate, &rfq.Budget, &rfq.Currency,
		&rfq.Status, &rfq.SubmittedAt, &rfq.ExpiresAt, &rfq.CreatedAt, &rfq.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &rfq, nil
}

func (r *mySQLRFQRepository) CreateRFQ(ctx context.Context, rfq *RFQ) error {
	if rfq.ID == "" {
		rfq.ID = uuid.NewString()
	}
	now := time.Now().UTC()
	rfq.CreatedAt = now
	rfq.UpdatedAt = now

	const query = `
INSERT INTO rfqs (
	id, buyer_id, product_id, product_name, product_image, supplier_id, quantity, unit, 
	specifications, requirements, delivery_location, preferred_delivery_date, budget, 
	currency, status, submitted_at, expires_at, created_at, updated_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(ctx, query,
		rfq.ID, rfq.BuyerID, rfq.ProductID, rfq.ProductName, rfq.ProductImage,
		rfq.SupplierID, rfq.Quantity, rfq.Unit, rfq.Specifications, rfq.Requirements,
		rfq.DeliveryLocation, rfq.PreferredDeliveryDate, rfq.Budget, rfq.Currency,
		rfq.Status, rfq.SubmittedAt, rfq.ExpiresAt, rfq.CreatedAt, rfq.UpdatedAt,
	)
	return err
}

func (r *mySQLRFQRepository) UpdateRFQ(ctx context.Context, rfq *RFQ) error {
	rfq.UpdatedAt = time.Now().UTC()

	const query = `
UPDATE rfqs
SET status = ?, submitted_at = ?, expires_at = ?, updated_at = ?
WHERE id = ?`

	res, err := r.db.ExecContext(ctx, query,
		rfq.Status, rfq.SubmittedAt, rfq.ExpiresAt, rfq.UpdatedAt,
		rfq.ID,
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

func (r *mySQLRFQRepository) DeleteRFQ(ctx context.Context, id string) error {
	const query = `DELETE FROM rfqs WHERE id = ?`
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

// RFQ Responses
func (r *mySQLRFQRepository) ListResponsesByRFQID(ctx context.Context, rfqID string) ([]*RFQResponse, error) {
	const query = `
SELECT id, rfq_id, supplier_id, unit_price, total_price, currency, moq, estimated_delivery, 
       payment_terms, specifications, message, status, submitted_at, expires_at, created_at, updated_at
FROM rfq_responses
WHERE rfq_id = ?
ORDER BY created_at DESC`

	rows, err := r.db.QueryContext(ctx, query, rfqID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var responses []*RFQResponse
	for rows.Next() {
		var resp RFQResponse
		if err := rows.Scan(
			&resp.ID, &resp.RFQID, &resp.SupplierID, &resp.UnitPrice, &resp.TotalPrice,
			&resp.Currency, &resp.MOQ, &resp.EstimatedDelivery, &resp.PaymentTerms,
			&resp.Specifications, &resp.Message, &resp.Status, &resp.SubmittedAt,
			&resp.ExpiresAt, &resp.CreatedAt, &resp.UpdatedAt,
		); err != nil {
			return nil, err
		}
		responses = append(responses, &resp)
	}
	return responses, rows.Err()
}

func (r *mySQLRFQRepository) GetResponseByID(ctx context.Context, id string) (*RFQResponse, error) {
	const query = `
SELECT id, rfq_id, supplier_id, unit_price, total_price, currency, moq, estimated_delivery, 
       payment_terms, specifications, message, status, submitted_at, expires_at, created_at, updated_at
FROM rfq_responses
WHERE id = ? LIMIT 1`

	var resp RFQResponse
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&resp.ID, &resp.RFQID, &resp.SupplierID, &resp.UnitPrice, &resp.TotalPrice,
		&resp.Currency, &resp.MOQ, &resp.EstimatedDelivery, &resp.PaymentTerms,
		&resp.Specifications, &resp.Message, &resp.Status, &resp.SubmittedAt,
		&resp.ExpiresAt, &resp.CreatedAt, &resp.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &resp, nil
}

func (r *mySQLRFQRepository) CreateResponse(ctx context.Context, resp *RFQResponse) error {
	if resp.ID == "" {
		resp.ID = uuid.NewString()
	}
	now := time.Now().UTC()
	resp.CreatedAt = now
	resp.UpdatedAt = now

	const query = `
INSERT INTO rfq_responses (
	id, rfq_id, supplier_id, unit_price, total_price, currency, moq, estimated_delivery, 
	payment_terms, specifications, message, status, submitted_at, expires_at, created_at, updated_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(ctx, query,
		resp.ID, resp.RFQID, resp.SupplierID, resp.UnitPrice, resp.TotalPrice,
		resp.Currency, resp.MOQ, resp.EstimatedDelivery, resp.PaymentTerms,
		resp.Specifications, resp.Message, resp.Status, resp.SubmittedAt,
		resp.ExpiresAt, resp.CreatedAt, resp.UpdatedAt,
	)
	return err
}

func (r *mySQLRFQRepository) UpdateResponse(ctx context.Context, resp *RFQResponse) error {
	resp.UpdatedAt = time.Now().UTC()

	const query = `
UPDATE rfq_responses
SET status = ?, updated_at = ?
WHERE id = ?`

	res, err := r.db.ExecContext(ctx, query,
		resp.Status, resp.UpdatedAt,
		resp.ID,
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

func (r *mySQLRFQRepository) DeleteResponse(ctx context.Context, id string) error {
	const query = `DELETE FROM rfq_responses WHERE id = ?`
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
