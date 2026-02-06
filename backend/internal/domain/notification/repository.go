package notification

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	ErrNotFound = errors.New("notification not found")
)

type Repository interface {
	ListByUserID(ctx context.Context, userID string, limit, offset int) ([]*Notification, error)
	GetByID(ctx context.Context, id string) (*Notification, error)
	Create(ctx context.Context, n *Notification) error
	MarkAsRead(ctx context.Context, id string) error
	MarkAllAsRead(ctx context.Context, userID string) error
	Delete(ctx context.Context, id string) error
}

type mySQLNotificationRepository struct {
	db *sql.DB
}

func NewMySQLNotificationRepository(db *sql.DB) Repository {
	return &mySQLNotificationRepository{db: db}
}

func (r *mySQLNotificationRepository) ListByUserID(ctx context.Context, userID string, limit, offset int) ([]*Notification, error) {
	const query = "SELECT id, user_id, type, priority, title, description, icon, action_url, action_label, " +
		"`read`, metadata, created_at, read_at " +
		"FROM notifications " +
		"WHERE user_id = ? " +
		"ORDER BY created_at DESC " +
		"LIMIT ? OFFSET ?"

	rows, err := r.db.QueryContext(ctx, query, userID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var notifications []*Notification
	for rows.Next() {
		var n Notification
		if err := rows.Scan(
			&n.ID, &n.UserID, &n.Type, &n.Priority, &n.Title, &n.Description,
			&n.Icon, &n.ActionURL, &n.ActionLabel, &n.Read, &n.Metadata,
			&n.CreatedAt, &n.ReadAt,
		); err != nil {
			return nil, err
		}
		notifications = append(notifications, &n)
	}
	return notifications, rows.Err()
}

func (r *mySQLNotificationRepository) GetByID(ctx context.Context, id string) (*Notification, error) {
	const query = "SELECT id, user_id, type, priority, title, description, icon, action_url, action_label, " +
		"`read`, metadata, created_at, read_at " +
		"FROM notifications " +
		"WHERE id = ? LIMIT 1"

	var n Notification
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&n.ID, &n.UserID, &n.Type, &n.Priority, &n.Title, &n.Description,
		&n.Icon, &n.ActionURL, &n.ActionLabel, &n.Read, &n.Metadata,
		&n.CreatedAt, &n.ReadAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &n, nil
}

func (r *mySQLNotificationRepository) Create(ctx context.Context, n *Notification) error {
	if n.ID == "" {
		n.ID = uuid.NewString()
	}
	n.CreatedAt = time.Now().UTC()

	const query = "INSERT INTO notifications (" +
		"id, user_id, type, priority, title, description, icon, action_url, action_label, " +
		"`read`, metadata, created_at, read_at" +
		") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

	_, err := r.db.ExecContext(ctx, query,
		n.ID, n.UserID, n.Type, n.Priority, n.Title, n.Description,
		n.Icon, n.ActionURL, n.ActionLabel, n.Read, n.Metadata,
		n.CreatedAt, n.ReadAt,
	)
	return err
}

func (r *mySQLNotificationRepository) MarkAsRead(ctx context.Context, id string) error {
	now := time.Now().UTC()
	const query = "UPDATE notifications SET `read` = TRUE, read_at = ? WHERE id = ?"
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

func (r *mySQLNotificationRepository) MarkAllAsRead(ctx context.Context, userID string) error {
	now := time.Now().UTC()
	const query = "UPDATE notifications SET `read` = TRUE, read_at = ? WHERE user_id = ? AND `read` = FALSE"
	_, err := r.db.ExecContext(ctx, query, now, userID)
	return err
}

func (r *mySQLNotificationRepository) Delete(ctx context.Context, id string) error {
	const query = `DELETE FROM notifications WHERE id = ?`
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
