package product

import (
	"context"
)

// Service contains product-related business logic (validation, access rules).
type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) List(ctx context.Context, limit, offset int) ([]*Product, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, limit, offset)
}

func (s *Service) GetByID(ctx context.Context, id string) (*Product, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *Service) Create(ctx context.Context, supplierID string, in CreateInput) (*Product, error) {
	p := &Product{
		Name:        in.Name,
		Description: in.Description,
		ImageURL:    in.ImageURL,
		Price:       in.Price,
		MOQ:         in.MOQ,
		Currency:    in.Currency,
		SupplierID:  supplierID,
	}
	if err := s.repo.Create(ctx, p); err != nil {
		return nil, err
	}
	return p, nil
}

func (s *Service) Update(ctx context.Context, id string, in UpdateInput) (*Product, error) {
	p, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	if in.Name != nil {
		p.Name = *in.Name
	}
	if in.Description != nil {
		p.Description = *in.Description
	}
	if in.ImageURL != nil {
		p.ImageURL = *in.ImageURL
	}
	if in.Price != nil {
		p.Price = *in.Price
	}
	if in.MOQ != nil {
		p.MOQ = *in.MOQ
	}
	if in.Currency != nil {
		p.Currency = *in.Currency
	}

	if err := s.repo.Update(ctx, p); err != nil {
		return nil, err
	}
	return p, nil
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}

