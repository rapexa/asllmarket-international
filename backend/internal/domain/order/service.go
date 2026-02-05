package order

import (
	"context"
	"fmt"
	"time"
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) List(ctx context.Context, limit, offset int) ([]*Order, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, limit, offset)
}

func (s *Service) ListByBuyerID(ctx context.Context, buyerID string, limit, offset int) ([]*Order, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.ListByBuyerID(ctx, buyerID, limit, offset)
}

func (s *Service) ListBySupplierID(ctx context.Context, supplierID string, limit, offset int) ([]*Order, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.ListBySupplierID(ctx, supplierID, limit, offset)
}

func (s *Service) GetByID(ctx context.Context, id string) (*Order, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *Service) Create(ctx context.Context, buyerID string, in CreateOrderInput) (*Order, error) {
	totalAmount := float64(in.Quantity) * in.UnitPrice

	// Generate order number
	orderNumber := fmt.Sprintf("ORD-%d-%06d", time.Now().Year(), time.Now().UnixNano()%1000000)

	// Calculate estimated delivery (default: 14 days from now)
	estimatedDelivery := time.Now().UTC().Add(14 * 24 * time.Hour)

	order := &Order{
		OrderNumber:       orderNumber,
		BuyerID:           buyerID,
		SupplierID:        in.SupplierID,
		ProductID:         in.ProductID,
		Quantity:          in.Quantity,
		UnitPrice:         in.UnitPrice,
		TotalAmount:       totalAmount,
		Currency:          in.Currency,
		Status:            StatusPending,
		PaymentStatus:     PaymentPending,
		PaymentMethod:     in.PaymentMethod,
		ShippingAddress:   in.ShippingAddress,
		ShippingMethod:    in.ShippingMethod,
		EstimatedDelivery: estimatedDelivery,
	}

	if err := s.repo.Create(ctx, order); err != nil {
		return nil, err
	}
	return order, nil
}

func (s *Service) UpdateStatus(ctx context.Context, id string, in UpdateOrderStatusInput) (*Order, error) {
	order, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	order.Status = in.Status
	if in.TrackingNumber != nil {
		order.TrackingNumber = *in.TrackingNumber
	}
	if in.DeliveredAt != nil {
		order.DeliveredAt = in.DeliveredAt
	}

	if err := s.repo.Update(ctx, order); err != nil {
		return nil, err
	}
	return order, nil
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
