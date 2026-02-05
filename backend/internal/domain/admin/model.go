package admin

import "time"

// DashboardStats represents overall platform statistics for admin dashboard
type DashboardStats struct {
	TotalUsers      int     `json:"totalUsers"`
	TotalProducts   int     `json:"totalProducts"`
	TotalOrders     int     `json:"totalOrders"`
	TotalRevenue    float64 `json:"totalRevenue"`
	NewUsers        int     `json:"newUsers"`        // Last 7 days
	NewProducts     int     `json:"newProducts"`     // Last 7 days
	PendingOrders   int     `json:"pendingOrders"`
	RevenueChange   float64 `json:"revenueChange"`   // Percentage change
	ActiveSuppliers int     `json:"activeSuppliers"`
	PendingVerifications int `json:"pendingVerifications"`
}

// SalesData represents sales metrics over time
type SalesData struct {
	Date   string  `json:"date"`
	Sales  float64 `json:"sales"`
	Orders int     `json:"orders"`
}

// CategoryStats represents product distribution by category
type CategoryStats struct {
	CategoryID   string  `json:"categoryId"`
	CategoryName string  `json:"categoryName"`
	ProductCount int     `json:"productCount"`
	Revenue      float64 `json:"revenue"`
	Percentage   float64 `json:"percentage"`
}

// TopProduct represents best-selling products
type TopProduct struct {
	ProductID   string  `json:"productId"`
	ProductName string  `json:"productName"`
	SalesCount  int     `json:"salesCount"`
	Revenue     float64 `json:"revenue"`
	Change      float64 `json:"change"` // Percentage change
}

// RecentActivity represents recent platform activity
type RecentActivity struct {
	ID        string    `json:"id"`
	Type      string    `json:"type"` // order, user, product, verification, payment
	Message   string    `json:"message"`
	Status    string    `json:"status"` // success, info, warning, error
	CreatedAt time.Time `json:"createdAt"`
}

// UserStats represents user growth and activity metrics
type UserStats struct {
	Date        string `json:"date"`
	NewUsers    int    `json:"newUsers"`
	ActiveUsers int    `json:"activeUsers"`
	Buyers      int    `json:"buyers"`
	Suppliers   int    `json:"suppliers"`
}

// BuyerListItem represents buyer information for admin
type BuyerListItem struct {
	ID          string  `json:"id"`
	Email       string  `json:"email"`
	FullName    string  `json:"fullName"`
	Phone       string  `json:"phone"`
	Country     string  `json:"country"`
	TotalOrders int     `json:"totalOrders"`
	TotalSpent  float64 `json:"totalSpent"`
	Status      string  `json:"status"` // active, inactive, suspended
	CreatedAt   time.Time `json:"createdAt"`
	LastActive  time.Time `json:"lastActive"`
}

// UpdateUserStatusInput for admin to change user status
type UpdateUserStatusInput struct {
	Status string `json:"status" binding:"required,oneof=active inactive suspended"`
	Reason string `json:"reason"`
}

// AdminProduct represents product information for admin
type AdminProduct struct {
	ID              string    `json:"id"`
	Name            string    `json:"name"`
	Description     string    `json:"description"`
	CategoryID      string    `json:"categoryId"`
	CategoryName    string    `json:"categoryName"`
	SupplierID      string    `json:"supplierId"`
	SupplierName    string    `json:"supplierName"`
	Price           float64   `json:"price"`
	Currency        string    `json:"currency"`
	MinOrderQty     int       `json:"minOrderQty"`
	Stock           int       `json:"stock"`
	Status          string    `json:"status"` // active, inactive, pending, rejected
	Views           int       `json:"views"`
	Orders          int       `json:"orders"`
	Rating          float64   `json:"rating"`
	ReviewCount     int       `json:"reviewCount"`
	CreatedAt       time.Time `json:"createdAt"`
	UpdatedAt       time.Time `json:"updatedAt"`
}

// UpdateProductStatusInput for admin to change product status
type UpdateProductStatusInput struct {
	Status string `json:"status" binding:"required,oneof=active inactive pending rejected"`
	Reason string `json:"reason"`
}

// AdminOrder represents order information for admin
type AdminOrder struct {
	ID            string    `json:"id"`
	OrderNumber   string    `json:"orderNumber"`
	BuyerID       string    `json:"buyerId"`
	BuyerName     string    `json:"buyerName"`
	BuyerCountry  string    `json:"buyerCountry"`
	SupplierID    string    `json:"supplierId"`
	SupplierName  string    `json:"supplierName"`
	ProductID     string    `json:"productId"`
	ProductName   string    `json:"productName"`
	Quantity      int       `json:"quantity"`
	UnitPrice     float64   `json:"unitPrice"`
	TotalAmount   float64   `json:"totalAmount"`
	Currency      string    `json:"currency"`
	Status        string    `json:"status"` // pending, confirmed, processing, shipped, delivered, cancelled, refunded
	PaymentStatus string    `json:"paymentStatus"` // pending, paid, failed, refunded
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
}

// UpdateOrderStatusInput for admin to change order status
type UpdateOrderStatusInput struct {
	Status string `json:"status" binding:"required,oneof=pending confirmed processing shipped delivered cancelled refunded"`
	Reason string `json:"reason"`
}

// AdminSupplier represents supplier information for admin
type AdminSupplier struct {
	ID              string    `json:"id"`
	CompanyName     string    `json:"companyName"`
	ContactName     string    `json:"contactName"`
	Email           string    `json:"email"`
	Phone           string    `json:"phone"`
	Country         string    `json:"country"`
	City            string    `json:"city"`
	Verified        bool      `json:"verified"`
	Status          string    `json:"status"` // active, inactive, suspended, pending
	Subscription    string    `json:"subscription"` // free, silver, gold, diamond
	TotalProducts   int       `json:"totalProducts"`
	TotalOrders     int       `json:"totalOrders"`
	TotalRevenue    float64   `json:"totalRevenue"`
	Rating          float64   `json:"rating"`
	CreatedAt       time.Time `json:"createdAt"`
}

// UpdateSupplierStatusInput for admin to change supplier status
type UpdateSupplierStatusInput struct {
	Status string `json:"status" binding:"required,oneof=active inactive suspended pending"`
	Reason string `json:"reason"`
}

// AdminVerification represents verification request for admin
type AdminVerification struct {
	ID            string    `json:"id"`
	UserID        string    `json:"userId"`
	UserName      string    `json:"userName"`
	UserEmail     string    `json:"userEmail"`
	UserRole      string    `json:"userRole"`
	DocumentType  string    `json:"documentType"`
	DocumentURL   string    `json:"documentUrl"`
	Status        string    `json:"status"` // pending, approved, rejected
	SubmittedAt   time.Time `json:"submittedAt"`
	ReviewedAt    *time.Time `json:"reviewedAt,omitempty"`
	ReviewedBy    *string   `json:"reviewedBy,omitempty"`
	ReviewMessage *string   `json:"reviewMessage,omitempty"`
}

// ReviewVerificationInput for admin to review verification
type ReviewVerificationInput struct {
	Status  string `json:"status" binding:"required,oneof=approved rejected"`
	Message string `json:"message"`
}
