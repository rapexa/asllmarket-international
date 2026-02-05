package supplier

import "time"

type SubscriptionPlan string

const (
	PlanFree    SubscriptionPlan = "free"
	PlanSilver  SubscriptionPlan = "silver"
	PlanGold    SubscriptionPlan = "gold"
	PlanDiamond SubscriptionPlan = "diamond"
)

type SupplierStatus string

const (
	StatusActive    SupplierStatus = "active"
	StatusInactive  SupplierStatus = "inactive"
	StatusSuspended SupplierStatus = "suspended"
	StatusPending   SupplierStatus = "pending"
)

// Supplier represents a company selling products on the platform.
type Supplier struct {
	ID              string           `db:"id" json:"id"`
	UserID          string           `db:"user_id" json:"userId"`           // FK to users table
	CompanyName     string           `db:"company_name" json:"companyName"`
	ContactName     string           `db:"contact_name" json:"contactName"`
	Email           string           `db:"email" json:"email"`
	Phone           string           `db:"phone" json:"phone"`
	Country         string           `db:"country" json:"country"`
	City            string           `db:"city" json:"city"`
	Address         string           `db:"address" json:"address"`
	Logo            string           `db:"logo" json:"logo"`
	Description     string           `db:"description" json:"description"`
	Verified        bool             `db:"verified" json:"verified"`
	Status          SupplierStatus   `db:"status" json:"status"`
	Subscription    SubscriptionPlan `db:"subscription" json:"subscription"`
	Rating          float64          `db:"rating" json:"rating"`
	TotalProducts   int              `db:"total_products" json:"totalProducts"`
	TotalOrders     int              `db:"total_orders" json:"totalOrders"`
	TotalRevenue    float64          `db:"total_revenue" json:"totalRevenue"`
	ResponseRate    float64          `db:"response_rate" json:"responseRate"`     // 0-100
	ResponseTime    int              `db:"response_time" json:"responseTime"`     // in minutes
	Established     int              `db:"established" json:"established"`        // year
	Employees       string           `db:"employees" json:"employees"`            // e.g., "50-100"
	CreatedAt       time.Time        `db:"created_at" json:"createdAt"`
	UpdatedAt       time.Time        `db:"updated_at" json:"updatedAt"`
}

type CreateSupplierInput struct {
	CompanyName string `json:"companyName" binding:"required"`
	ContactName string `json:"contactName" binding:"required"`
	Email       string `json:"email" binding:"required,email"`
	Phone       string `json:"phone" binding:"required"`
	Country     string `json:"country" binding:"required"`
	City        string `json:"city" binding:"required"`
	Address     string `json:"address"`
	Description string `json:"description"`
	Established int    `json:"established"`
	Employees   string `json:"employees"`
}

type UpdateSupplierInput struct {
	CompanyName  *string           `json:"companyName,omitempty"`
	ContactName  *string           `json:"contactName,omitempty"`
	Phone        *string           `json:"phone,omitempty"`
	Address      *string           `json:"address,omitempty"`
	City         *string           `json:"city,omitempty"`
	Description  *string           `json:"description,omitempty"`
	Logo         *string           `json:"logo,omitempty"`
	Status       *SupplierStatus   `json:"status,omitempty"`
	Subscription *SubscriptionPlan `json:"subscription,omitempty"`
}
