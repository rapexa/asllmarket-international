package message

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	ErrNotFound = errors.New("message not found")
)

type Repository interface {
	ListByConversationID(ctx context.Context, conversationID string, limit, offset int) ([]*Message, error)
	ListConversations(ctx context.Context, userID string) ([]*ConversationPreview, error)
	GetByID(ctx context.Context, id string) (*Message, error)
	Create(ctx context.Context, m *Message) error
	MarkAsRead(ctx context.Context, id string) error
	Delete(ctx context.Context, id string) error
}

type mySQLMessageRepository struct {
	db *sql.DB
}

func NewMySQLMessageRepository(db *sql.DB) Repository {
	return &mySQLMessageRepository{db: db}
}

func (r *mySQLMessageRepository) ListByConversationID(ctx context.Context, conversationID string, limit, offset int) ([]*Message, error) {
	const query = `
SELECT id, conversation_id, sender_id, receiver_id, subject, body, attachments, ` + "`read`" + `, read_at, created_at
FROM messages
WHERE conversation_id = ?
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, conversationID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []*Message
	for rows.Next() {
		var m Message
		if err := rows.Scan(
			&m.ID, &m.ConversationID, &m.SenderID, &m.ReceiverID,
			&m.Subject, &m.Body, &m.Attachments, &m.Read,
			&m.ReadAt, &m.CreatedAt,
		); err != nil {
			return nil, err
		}
		messages = append(messages, &m)
	}
	return messages, rows.Err()
}

func (r *mySQLMessageRepository) ListConversations(ctx context.Context, userID string) ([]*ConversationPreview, error) {
	const query = `
SELECT 
	m.conversation_id,
	CASE 
		WHEN m.sender_id = ? THEN m.receiver_id 
		ELSE m.sender_id 
	END as other_user_id,
	u.full_name as other_user_name,
	m.body as last_message,
	m.created_at as last_message_at,
	(SELECT COUNT(*) FROM messages 
	 WHERE conversation_id = m.conversation_id 
	 AND receiver_id = ? 
	 AND ` + "`read`" + ` = FALSE) as unread_count
FROM messages m
INNER JOIN users u ON u.id = CASE 
	WHEN m.sender_id = ? THEN m.receiver_id 
	ELSE m.sender_id 
END
WHERE m.sender_id = ? OR m.receiver_id = ?
GROUP BY m.conversation_id
ORDER BY m.created_at DESC`

	rows, err := r.db.QueryContext(ctx, query, userID, userID, userID, userID, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var conversations []*ConversationPreview
	for rows.Next() {
		var c ConversationPreview
		if err := rows.Scan(
			&c.ConversationID, &c.OtherUserID, &c.OtherUserName,
			&c.LastMessage, &c.LastMessageAt, &c.UnreadCount,
		); err != nil {
			return nil, err
		}
		conversations = append(conversations, &c)
	}
	return conversations, rows.Err()
}

func (r *mySQLMessageRepository) GetByID(ctx context.Context, id string) (*Message, error) {
	const query = `
SELECT id, conversation_id, sender_id, receiver_id, subject, body, attachments, ` + "`read`" + `, read_at, created_at
FROM messages
WHERE id = ? LIMIT 1`

	var m Message
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&m.ID, &m.ConversationID, &m.SenderID, &m.ReceiverID,
		&m.Subject, &m.Body, &m.Attachments, &m.Read,
		&m.ReadAt, &m.CreatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &m, nil
}

func (r *mySQLMessageRepository) Create(ctx context.Context, m *Message) error {
	if m.ID == "" {
		m.ID = uuid.NewString()
	}
	m.CreatedAt = time.Now().UTC()

	const query = `
INSERT INTO messages (
	id, conversation_id, sender_id, receiver_id, subject, body, attachments, ` + "`read`" + `, read_at, created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(ctx, query,
		m.ID, m.ConversationID, m.SenderID, m.ReceiverID,
		m.Subject, m.Body, m.Attachments, m.Read,
		m.ReadAt, m.CreatedAt,
	)
	return err
}

func (r *mySQLMessageRepository) MarkAsRead(ctx context.Context, id string) error {
	now := time.Now().UTC()
	const query = `UPDATE messages SET ` + "`read`" + ` = TRUE, read_at = ? WHERE id = ?`
	res, err := r.db.ExecContext(ctx, query, now, id)
	if err != nil {
		return err
	}
	rows, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return ErrNotFound
	}
	return nil
}

func (r *mySQLMessageRepository) Delete(ctx context.Context, id string) error {
	const query = `DELETE FROM messages WHERE id = ?`
	res, err := r.db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	rows, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return ErrNotFound
	}
	return nil
}
