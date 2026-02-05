package message

import (
	"context"
	"fmt"
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) ListByConversationID(ctx context.Context, conversationID string, limit, offset int) ([]*Message, error) {
	if limit <= 0 || limit > 100 {
		limit = 50
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.ListByConversationID(ctx, conversationID, limit, offset)
}

func (s *Service) ListConversations(ctx context.Context, userID string) ([]*ConversationPreview, error) {
	return s.repo.ListConversations(ctx, userID)
}

func (s *Service) GetByID(ctx context.Context, id string) (*Message, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *Service) Create(ctx context.Context, senderID string, in CreateMessageInput) (*Message, error) {
	// Generate conversation ID (sorted user IDs to ensure consistency)
	conversationID := generateConversationID(senderID, in.ReceiverID)

	msg := &Message{
		ConversationID: conversationID,
		SenderID:       senderID,
		ReceiverID:     in.ReceiverID,
		Subject:        in.Subject,
		Body:           in.Body,
		Attachments:    in.Attachments,
		Read:           false,
	}

	if err := s.repo.Create(ctx, msg); err != nil {
		return nil, err
	}
	return msg, nil
}

func (s *Service) MarkAsRead(ctx context.Context, id string) error {
	return s.repo.MarkAsRead(ctx, id)
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}

// generateConversationID creates a consistent ID for a conversation between two users.
func generateConversationID(userID1, userID2 string) string {
	if userID1 < userID2 {
		return fmt.Sprintf("%s_%s", userID1, userID2)
	}
	return fmt.Sprintf("%s_%s", userID2, userID1)
}
