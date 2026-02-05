package subscription

import (
	"context"
	"time"
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) List(ctx context.Context, limit, offset int) ([]*Subscription, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, limit, offset)
}

func (s *Service) GetByID(ctx context.Context, id string) (*Subscription, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *Service) GetBySupplierID(ctx context.Context, supplierID string) (*Subscription, error) {
	return s.repo.GetBySupplierID(ctx, supplierID)
}

func (s *Service) GetActiveBySupplierID(ctx context.Context, supplierID string) (*Subscription, error) {
	return s.repo.GetActiveBySupplierID(ctx, supplierID)
}

func (s *Service) Create(ctx context.Context, supplierID string, in CreateSubscriptionInput) (*Subscription, error) {
	now := time.Now().UTC()
	expiresAt := now.Add(time.Duration(in.DurationDays) * 24 * time.Hour)

	sub := &Subscription{
		SupplierID:    supplierID,
		Plan:          in.Plan,
		Status:        StatusActive,
		StartedAt:     now,
		ExpiresAt:     &expiresAt,
		Amount:        in.Amount,
		Currency:      in.Currency,
		PaymentMethod: in.PaymentMethod,
	}

	if err := s.repo.Create(ctx, sub); err != nil {
		return nil, err
	}
	return sub, nil
}

func (s *Service) Cancel(ctx context.Context, id string) (*Subscription, error) {
	sub, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	now := time.Now().UTC()
	sub.Status = StatusCancelled
	sub.CancelledAt = &now

	if err := s.repo.Update(ctx, sub); err != nil {
		return nil, err
	}
	return sub, nil
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
