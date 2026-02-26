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
		Name:                   in.Name,
		Description:            in.Description,
		ImageURL:               in.ImageURL,
		Price:                  in.Price,
		MOQ:                    in.MOQ,
		Currency:               in.Currency,
		SupplierID:             supplierID,
		DiscountPercent:        in.DiscountPercent,
		FreeShipping:           in.FreeShipping,
		FirstOrderFreeShipping: in.FirstOrderFreeShipping,
		Guaranteed:             in.Guaranteed,
		FastCustomization:      in.FastCustomization,
		SellingPointTags:       in.SellingPointTags,
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
	if in.DiscountPercent != nil {
		p.DiscountPercent = *in.DiscountPercent
	}
	if in.FreeShipping != nil {
		p.FreeShipping = *in.FreeShipping
	}
	if in.FirstOrderFreeShipping != nil {
		p.FirstOrderFreeShipping = *in.FirstOrderFreeShipping
	}
	if in.Guaranteed != nil {
		p.Guaranteed = *in.Guaranteed
	}
	if in.FastCustomization != nil {
		p.FastCustomization = *in.FastCustomization
	}
	if in.SellingPointTags != nil {
		p.SellingPointTags = *in.SellingPointTags
	}

	if err := s.repo.Update(ctx, p); err != nil {
		return nil, err
	}
	return p, nil
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}

