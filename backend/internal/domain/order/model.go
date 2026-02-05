package order

import "time"

type OrderStatus string

const (
	StatusPending    OrderStatus = "pending"
	StatusConfirmed  OrderStatus = "confirmed"
	StatusProcessing OrderStatus = "processing"
	StatusShipped    OrderStatus = "shipped"
	StatusDelivered  OrderStatus = "delivered"
	StatusCancelled  OrderStatus = "cancelled"
	StatusRefunded   OrderStatus = "refunded"
)

type PaymentStatus string

const (
	PaymentPending  PaymentStatus = "pending"
	PaymentPaid     PaymentStatus = "paid"
	PaymentFailed   PaymentStatus = "failed"
	PaymentRefunded PaymentStatus = "refunded"
)

// Order represents a B2B transaction between buyer and supplier.
type Order struct {
	ID               string        `db:"id" json:"id"`
	OrderNumber      string        `db:"order_number" json:"orderNumber"`
	BuyerID          string        `db:"buyer_id" json:"buyerId"`
	SupplierID       string        `db:"supplier_id" json:"supplierId"`
	ProductID        string        `db:"product_id" json:"productId"`
	Quantity         int           `db:"quantity" json:"quantity"`
	UnitPrice        float64       `db:"unit_price" json:"unitPrice"`
	TotalAmount      float64       `db:"total_amount" json:"totalAmount"`
	Currency         string        `db:"currency" json:"currency"`
	Status           OrderStatus   `db:"status" json:"status"`
	PaymentStatus    PaymentStatus `db:"payment_status" json:"paymentStatus"`
	PaymentMethod    string        `db:"payment_method" json:"paymentMethod"` // e.g., "Escrow", "Wire Transfer"
	ShippingAddress  string        `db:"shipping_address" json:"shippingAddress"`
	ShippingMethod   string        `db:"shipping_method" json:"shippingMethod"`
	TrackingNumber   string        `db:"tracking_number" json:"trackingNumber"`
	EstimatedDelivery time.Time    `db:"estimated_delivery" json:"estimatedDelivery"`
	DeliveredAt      *time.Time    `db:"delivered_at" json:"deliveredAt,omitempty"`
	CreatedAt        time.Time     `db:"created_at" json:"createdAt"`
	UpdatedAt        time.Time     `db:"updated_at" json:"updatedAt"`
}

type CreateOrderInput struct {
	ProductID        string  `json:"productId" binding:"required"`
	SupplierID       string  `json:"supplierId" binding:"required"`
	Quantity         int     `json:"quantity" binding:"required,gt=0"`
	UnitPrice        float64 `json:"unitPrice" binding:"required,gt=0"`
	Currency         string  `json:"currency" binding:"required,len=3"`
	PaymentMethod    string  `json:"paymentMethod" binding:"required"`
	ShippingAddress  string  `json:"shippingAddress" binding:"required"`
	ShippingMethod   string  `json:"shippingMethod"`
}

type UpdateOrderStatusInput struct {
	Status         OrderStatus    `json:"status" binding:"required"`
	TrackingNumber *string        `json:"trackingNumber,omitempty"`
	DeliveredAt    *time.Time     `json:"deliveredAt,omitempty"`
}
