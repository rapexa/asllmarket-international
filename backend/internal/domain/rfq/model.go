package rfq

import "time"

type RFQStatus string

const (
	StatusDraft     RFQStatus = "draft"
	StatusSubmitted RFQStatus = "submitted"
	StatusActive    RFQStatus = "active"
	StatusClosed    RFQStatus = "closed"
	StatusCancelled RFQStatus = "cancelled"
)

type ResponseStatus string

const (
	ResponsePending   ResponseStatus = "pending"
	ResponseAccepted  ResponseStatus = "accepted"
	ResponseRejected  ResponseStatus = "rejected"
	ResponseCountered ResponseStatus = "countered"
)

// RFQ (Request for Quotation) represents a buyer's request for pricing.
type RFQ struct {
	ID                    string     `db:"id" json:"id"`
	BuyerID               string     `db:"buyer_id" json:"buyerId"`
	ProductID             string     `db:"product_id" json:"productId"`
	ProductName           string     `db:"product_name" json:"productName"`
	ProductImage          string     `db:"product_image" json:"productImage"`
	SupplierID            string     `db:"supplier_id" json:"supplierId"` // optional, can target specific supplier
	Quantity              int        `db:"quantity" json:"quantity"`
	Unit                  string     `db:"unit" json:"unit"`
	Specifications        string     `db:"specifications" json:"specifications"`
	Requirements          string     `db:"requirements" json:"requirements"`
	DeliveryLocation      string     `db:"delivery_location" json:"deliveryLocation"`
	PreferredDeliveryDate *time.Time `db:"preferred_delivery_date" json:"preferredDeliveryDate,omitempty"`
	Budget                float64    `db:"budget" json:"budget"`
	Currency              string     `db:"currency" json:"currency"`
	Status                RFQStatus  `db:"status" json:"status"`
	SubmittedAt           *time.Time `db:"submitted_at" json:"submittedAt,omitempty"`
	ExpiresAt             *time.Time `db:"expires_at" json:"expiresAt,omitempty"`
	CreatedAt             time.Time  `db:"created_at" json:"createdAt"`
	UpdatedAt             time.Time  `db:"updated_at" json:"updatedAt"`
}

// RFQResponse is a supplier's reply to an RFQ.
type RFQResponse struct {
	ID                string         `db:"id" json:"id" gorm:"column:id;type:varchar(36);primaryKey"`
	RFQID             string         `db:"rfq_id" json:"rfqId" gorm:"column:rfq_id;type:varchar(36);not null"`
	SupplierID        string         `db:"supplier_id" json:"supplierId" gorm:"column:supplier_id;type:varchar(36);not null"`
	UnitPrice         float64        `db:"unit_price" json:"unitPrice" gorm:"column:unit_price;type:decimal(15,2);not null"`
	TotalPrice        float64        `db:"total_price" json:"totalPrice" gorm:"column:total_price;type:decimal(15,2);not null"`
	Currency          string         `db:"currency" json:"currency" gorm:"column:currency;type:varchar(10);default:'USD'"`
	MOQ               int            `db:"moq" json:"moq" gorm:"column:moq;type:int;not null"`
	EstimatedDelivery int            `db:"estimated_delivery" json:"estimatedDelivery" gorm:"column:estimated_delivery;type:int;not null"` // days
	PaymentTerms      string         `db:"payment_terms" json:"paymentTerms" gorm:"column:payment_terms;type:text"`
	Specifications    string         `db:"specifications" json:"specifications" gorm:"column:specifications;type:text"`
	Message           string         `db:"message" json:"message" gorm:"column:message;type:text"`
	Status            ResponseStatus `db:"status" json:"status" gorm:"column:status;type:varchar(20);default:'pending'"`
	SubmittedAt       time.Time      `db:"submitted_at" json:"submittedAt" gorm:"column:submitted_at;type:timestamp;default:CURRENT_TIMESTAMP"`
	ExpiresAt         *time.Time     `db:"expires_at" json:"expiresAt,omitempty" gorm:"column:expires_at;type:timestamp"`
	CreatedAt         time.Time      `db:"created_at" json:"createdAt" gorm:"column:created_at;type:timestamp;default:CURRENT_TIMESTAMP"`
	UpdatedAt         time.Time      `db:"updated_at" json:"updatedAt" gorm:"column:updated_at;type:timestamp;default:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
}

func (RFQResponse) TableName() string { return "rfq_responses" }

type CreateRFQInput struct {
	ProductID             string     `json:"productId"`
	ProductName           string     `json:"productName" binding:"required"`
	ProductImage          string     `json:"productImage"`
	SupplierID            string     `json:"supplierId"` // optional
	Quantity              int        `json:"quantity" binding:"required,gt=0"`
	Unit                  string     `json:"unit" binding:"required"`
	Specifications        string     `json:"specifications"`
	Requirements          string     `json:"requirements"`
	DeliveryLocation      string     `json:"deliveryLocation"`
	PreferredDeliveryDate *time.Time `json:"preferredDeliveryDate,omitempty"`
	Budget                float64    `json:"budget"`
	Currency              string     `json:"currency" binding:"required"`
}

type CreateRFQResponseInput struct {
	RFQID             string  `json:"rfqId" binding:"required"`
	UnitPrice         float64 `json:"unitPrice" binding:"required,gt=0"`
	Currency          string  `json:"currency" binding:"required"`
	MOQ               int     `json:"moq" binding:"required,gt=0"`
	EstimatedDelivery int     `json:"estimatedDelivery" binding:"required,gt=0"` // days
	PaymentTerms      string  `json:"paymentTerms"`
	Specifications    string  `json:"specifications"`
	Message           string  `json:"message"`
}
