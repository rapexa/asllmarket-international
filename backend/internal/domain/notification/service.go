package notification

import (
	"context"
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) ListByUserID(ctx context.Context, userID string, limit, offset int) ([]*Notification, error) {
	if limit <= 0 || limit > 100 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.ListByUserID(ctx, userID, limit, offset)
}

func (s *Service) Create(ctx context.Context, in CreateNotificationInput) (*Notification, error) {
	n := &Notification{
		UserID:      in.UserID,
		Type:        in.Type,
		Priority:    in.Priority,
		Title:       in.Title,
		Description: in.Description,
		Icon:        in.Icon,
		ActionURL:   in.ActionURL,
		ActionLabel: in.ActionLabel,
		Metadata:    in.Metadata,
		Read:        false,
	}

	if err := s.repo.Create(ctx, n); err != nil {
		return nil, err
	}
	return n, nil
}

func (s *Service) MarkAsRead(ctx context.Context, id string) error {
	return s.repo.MarkAsRead(ctx, id)
}

func (s *Service) MarkAllAsRead(ctx context.Context, userID string) error {
	return s.repo.MarkAllAsRead(ctx, userID)
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
