package message

import "time"

// Message represents communication between users (buyer-supplier, etc.)
type Message struct {
	ID             string     `db:"id" json:"id"`
	ConversationID string     `db:"conversation_id" json:"conversationId"`
	SenderID       string     `db:"sender_id" json:"senderId"`
	ReceiverID     string     `db:"receiver_id" json:"receiverId"`
	Subject        string     `db:"subject" json:"subject"`
	Body           string     `db:"body" json:"body"`
	Attachments    string     `db:"attachments" json:"attachments"` // JSON array of URLs
	Read           bool       `db:"read" json:"read"`
	ReadAt         *time.Time `db:"read_at" json:"readAt,omitempty"`
	CreatedAt      time.Time  `db:"created_at" json:"createdAt"`
}

type CreateMessageInput struct {
	ReceiverID  string `json:"receiverId" binding:"required"`
	Subject     string `json:"subject"`
	Body        string `json:"body" binding:"required"`
	Attachments string `json:"attachments"`
}

// ConversationPreview represents a message conversation summary.
type ConversationPreview struct {
	ConversationID string    `json:"conversationId"`
	OtherUserID    string    `json:"otherUserId"`
	OtherUserName  string    `json:"otherUserName"`
	LastMessage    string    `json:"lastMessage"`
	LastMessageAt  time.Time `json:"lastMessageAt"`
	UnreadCount    int       `json:"unreadCount"`
}
