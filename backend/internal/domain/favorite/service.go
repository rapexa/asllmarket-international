package favorite

import "context"

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) ListByUserID(ctx context.Context, userID string, limit, offset int) ([]*Favorite, error) {
	if limit <= 0 || limit > 100 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.ListByUserID(ctx, userID, limit, offset)
}

func (s *Service) Add(ctx context.Context, userID, productID string) (*Favorite, error) {
	return s.repo.Add(ctx, userID, productID)
}

func (s *Service) Remove(ctx context.Context, userID, productID string) error {
	return s.repo.Remove(ctx, userID, productID)
}

func (s *Service) Exists(ctx context.Context, userID, productID string) (bool, error) {
	return s.repo.Exists(ctx, userID, productID)
}
