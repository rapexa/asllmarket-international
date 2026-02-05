package notification

import "time"

type NotificationType string

const (
	TypeSystem       NotificationType = "system"
	TypeBusiness     NotificationType = "business"
	TypeInteraction  NotificationType = "interaction"
	TypePromotional  NotificationType = "promotional"
)

type NotificationPriority string

const (
	PriorityLow      NotificationPriority = "low"
	PriorityMedium   NotificationPriority = "medium"
	PriorityHigh     NotificationPriority = "high"
	PriorityCritical NotificationPriority = "critical"
)

// Notification represents a user notification (matches frontend NotificationContext).
type Notification struct {
	ID          string               `db:"id" json:"id"`
	UserID      string               `db:"user_id" json:"userId"`
	Type        NotificationType     `db:"type" json:"type"`
	Priority    NotificationPriority `db:"priority" json:"priority"`
	Title       string               `db:"title" json:"title"`
	Description string               `db:"description" json:"description"`
	Icon        string               `db:"icon" json:"icon"`
	ActionURL   string               `db:"action_url" json:"actionUrl"`
	ActionLabel string               `db:"action_label" json:"actionLabel"`
	Read        bool                 `db:"read" json:"read"`
	Metadata    string               `db:"metadata" json:"metadata"` // JSON blob
	CreatedAt   time.Time            `db:"created_at" json:"createdAt"`
	ReadAt      *time.Time           `db:"read_at" json:"readAt,omitempty"`
}

type CreateNotificationInput struct {
	UserID      string               `json:"userId" binding:"required"`
	Type        NotificationType     `json:"type" binding:"required"`
	Priority    NotificationPriority `json:"priority" binding:"required"`
	Title       string               `json:"title" binding:"required"`
	Description string               `json:"description" binding:"required"`
	Icon        string               `json:"icon"`
	ActionURL   string               `json:"actionUrl"`
	ActionLabel string               `json:"actionLabel"`
	Metadata    string               `json:"metadata"`
}
