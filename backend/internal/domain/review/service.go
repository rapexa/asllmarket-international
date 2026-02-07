package review

import "context"

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) ListByProductID(ctx context.Context, productID string, limit, offset int) ([]*Review, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.ListByProductID(ctx, productID, limit, offset)
}

func (s *Service) ListBySupplierID(ctx context.Context, supplierID string, limit, offset int) ([]*Review, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.ListBySupplierID(ctx, supplierID, limit, offset)
}

func (s *Service) Create(ctx context.Context, reviewerID, productID, supplierID string, rating int, title, comment string, verifiedPurchase bool) (*Review, error) {
	if rating < 1 || rating > 5 {
		rating = 5
	}
	rev := &Review{
		ProductID:        productID,
		SupplierID:       supplierID,
		ReviewerID:       reviewerID,
		Rating:           rating,
		Title:            title,
		Comment:          comment,
		VerifiedPurchase: verifiedPurchase,
	}
	if err := s.repo.Create(ctx, rev); err != nil {
		return nil, err
	}
	return rev, nil
}
