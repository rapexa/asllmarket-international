package subscription

import "time"

type SubscriptionPlan string

const (
	PlanFree    SubscriptionPlan = "free"
	PlanSilver  SubscriptionPlan = "silver"
	PlanGold    SubscriptionPlan = "gold"
	PlanDiamond SubscriptionPlan = "diamond"
)

type SubscriptionStatus string

const (
	StatusActive    SubscriptionStatus = "active"
	StatusCancelled SubscriptionStatus = "cancelled"
	StatusExpired   SubscriptionStatus = "expired"
	StatusTrial     SubscriptionStatus = "trial"
)

// Subscription represents a supplier's subscription record.
type Subscription struct {
	ID            string             `db:"id" json:"id"`
	SupplierID    string             `db:"supplier_id" json:"supplierId"`
	Plan          SubscriptionPlan   `db:"plan" json:"plan"`
	Status        SubscriptionStatus `db:"status" json:"status"`
	StartedAt     time.Time          `db:"started_at" json:"startedAt"`
	ExpiresAt     *time.Time         `db:"expires_at" json:"expiresAt,omitempty"`
	CancelledAt   *time.Time         `db:"cancelled_at" json:"cancelledAt,omitempty"`
	Amount        float64            `db:"amount" json:"amount"`
	Currency      string             `db:"currency" json:"currency"`
	PaymentMethod string             `db:"payment_method" json:"paymentMethod"`
	CreatedAt     time.Time          `db:"created_at" json:"createdAt"`
	UpdatedAt     time.Time          `db:"updated_at" json:"updatedAt"`
}

type CreateSubscriptionInput struct {
	Plan          SubscriptionPlan `json:"plan" binding:"required"`
	Amount        float64          `json:"amount" binding:"required,gt=0"`
	Currency      string           `json:"currency" binding:"required,len=3"`
	PaymentMethod string           `json:"paymentMethod" binding:"required"`
	DurationDays  int              `json:"durationDays" binding:"required,gt=0"` // e.g., 30, 365
}

type UpdateSubscriptionInput struct {
	Status      *SubscriptionStatus `json:"status,omitempty"`
	CancelledAt *time.Time          `json:"cancelledAt,omitempty"`
}
