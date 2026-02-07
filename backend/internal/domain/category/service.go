package category

import "context"

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

// List returns all categories; each category can optionally include subcategories (for GetByID we do).
func (s *Service) List(ctx context.Context) ([]*DBCategory, error) {
	return s.repo.ListCategories(ctx)
}

// GetByID returns a category by ID with its subcategories.
func (s *Service) GetByID(ctx context.Context, id string) (*DBCategory, []*DBSubcategory, error) {
	cat, err := s.repo.GetCategoryByID(ctx, id)
	if err != nil || cat == nil {
		return nil, nil, err
	}
	subs, err := s.repo.ListSubcategoriesByCategoryID(ctx, id)
	if err != nil {
		return cat, nil, err
	}
	return cat, subs, nil
}
