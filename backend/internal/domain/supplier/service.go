package supplier

import (
	"context"
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) List(ctx context.Context, limit, offset int) ([]*Supplier, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, limit, offset)
}

func (s *Service) GetByID(ctx context.Context, id string) (*Supplier, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *Service) GetByUserID(ctx context.Context, userID string) (*Supplier, error) {
	return s.repo.GetByUserID(ctx, userID)
}

func (s *Service) Create(ctx context.Context, userID string, in CreateSupplierInput) (*Supplier, error) {
	sup := &Supplier{
		UserID:       userID,
		CompanyName:  in.CompanyName,
		ContactName:  in.ContactName,
		Email:        in.Email,
		Phone:        in.Phone,
		Country:      in.Country,
		City:         in.City,
		Address:      in.Address,
		Description:  in.Description,
		Verified:     false,
		Status:       StatusPending,
		Subscription: PlanFree,
		Established:  in.Established,
		Employees:    in.Employees,
	}
	if err := s.repo.Create(ctx, sup); err != nil {
		return nil, err
	}
	return sup, nil
}

func (s *Service) Update(ctx context.Context, id string, in UpdateSupplierInput) (*Supplier, error) {
	sup, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	if in.CompanyName != nil {
		sup.CompanyName = *in.CompanyName
	}
	if in.ContactName != nil {
		sup.ContactName = *in.ContactName
	}
	if in.Phone != nil {
		sup.Phone = *in.Phone
	}
	if in.Address != nil {
		sup.Address = *in.Address
	}
	if in.City != nil {
		sup.City = *in.City
	}
	if in.Description != nil {
		sup.Description = *in.Description
	}
	if in.Logo != nil {
		sup.Logo = *in.Logo
	}
	if in.Status != nil {
		sup.Status = *in.Status
	}
	if in.Subscription != nil {
		sup.Subscription = *in.Subscription
	}

	if err := s.repo.Update(ctx, sup); err != nil {
		return nil, err
	}
	return sup, nil
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
