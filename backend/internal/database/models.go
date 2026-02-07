// Package database provides migration models for GORM AutoMigrate.
// These structs match backend/migrations/001_init_schema.up.sql (and related migrations)
// so that tables are created/updated correctly on startup.

package database

import "time"

// MigrationUser matches users table (001_init_schema).
type MigrationUser struct {
	ID           string    `gorm:"column:id;type:varchar(36);primaryKey"`
	Email        string    `gorm:"column:email;type:varchar(255);not null;uniqueIndex"`
	PasswordHash string    `gorm:"column:password_hash;type:varchar(255);not null"`
	FullName     string    `gorm:"column:full_name;type:varchar(255);not null"`
	Phone        string    `gorm:"column:phone;type:varchar(50)"`
	Role         string    `gorm:"column:role;type:enum('buyer','supplier','market_visitor','admin');default:buyer"`
	CreatedAt    time.Time `gorm:"column:created_at;type:timestamp;autoCreateTime"`
	UpdatedAt    time.Time `gorm:"column:updated_at;type:timestamp;autoUpdateTime"`
}

func (MigrationUser) TableName() string { return "users" }

// MigrationSupplier matches suppliers table (001_init_schema).
type MigrationSupplier struct {
	ID            string    `gorm:"column:id;type:varchar(36);primaryKey"`
	UserID        string    `gorm:"column:user_id;type:varchar(36);not null;index"`
	CompanyName   string    `gorm:"column:company_name;type:varchar(255);not null"`
	ContactName   string    `gorm:"column:contact_name;type:varchar(255);not null"`
	Email         string    `gorm:"column:email;type:varchar(255);not null"`
	Phone         string    `gorm:"column:phone;type:varchar(50);not null"`
	Country       string    `gorm:"column:country;type:varchar(100);not null"`
	City          string    `gorm:"column:city;type:varchar(100);not null"`
	Address       string    `gorm:"column:address;type:text"`
	Logo          string    `gorm:"column:logo;type:text"`
	Description   string    `gorm:"column:description;type:text"`
	Verified      bool      `gorm:"column:verified;default:false"`
	Status        string    `gorm:"column:status;type:enum('active','inactive','suspended','pending');default:pending"`
	Subscription  string    `gorm:"column:subscription;type:enum('free','silver','gold','diamond');default:free"`
	Rating        float64   `gorm:"column:rating;type:decimal(3,2);default:0"`
	TotalProducts int       `gorm:"column:total_products;default:0"`
	TotalOrders   int       `gorm:"column:total_orders;default:0"`
	TotalRevenue  float64   `gorm:"column:total_revenue;type:decimal(15,2);default:0"`
	ResponseRate  float64   `gorm:"column:response_rate;type:decimal(5,2);default:0"`
	ResponseTime  int       `gorm:"column:response_time;default:0"`
	Established   *int      `gorm:"column:established;type:int"`
	Employees     string    `gorm:"column:employees;type:varchar(50)"`
	CreatedAt     time.Time `gorm:"column:created_at;type:timestamp;autoCreateTime"`
	UpdatedAt     time.Time `gorm:"column:updated_at;type:timestamp;autoUpdateTime"`
}

func (MigrationSupplier) TableName() string { return "suppliers" }

// MigrationCategory matches categories table (001_init_schema).
type MigrationCategory struct {
	ID            string    `gorm:"column:id;type:varchar(36);primaryKey"`
	NameEn        string    `gorm:"column:name_en;type:varchar(255);not null"`
	NameFa        string    `gorm:"column:name_fa;type:varchar(255);not null"`
	NameAr        string    `gorm:"column:name_ar;type:varchar(255);not null"`
	DescriptionEn string    `gorm:"column:description_en;type:text"`
	DescriptionFa string    `gorm:"column:description_fa;type:text"`
	DescriptionAr string    `gorm:"column:description_ar;type:text"`
	Icon          string    `gorm:"column:icon;type:varchar(50)"`
	Image         string    `gorm:"column:image;type:text"`
	Gradient      string    `gorm:"column:gradient;type:varchar(255)"`
	Accent        string    `gorm:"column:accent;type:varchar(50)"`
	ProductCount  int       `gorm:"column:product_count;default:0"`
	SupplierCount int       `gorm:"column:supplier_count;default:0"`
	Featured      bool      `gorm:"column:featured;default:false"`
	Trending      bool      `gorm:"column:trending;default:false"`
	CreatedAt     time.Time `gorm:"column:created_at;type:timestamp;autoCreateTime"`
	UpdatedAt     time.Time `gorm:"column:updated_at;type:timestamp;autoUpdateTime"`
}

func (MigrationCategory) TableName() string { return "categories" }

// MigrationSubcategory matches subcategories table (001_init_schema).
type MigrationSubcategory struct {
	ID           string    `gorm:"column:id;type:varchar(36);primaryKey"`
	CategoryID   string    `gorm:"column:category_id;type:varchar(36);not null;index"`
	NameEn       string    `gorm:"column:name_en;type:varchar(255);not null"`
	NameFa       string    `gorm:"column:name_fa;type:varchar(255);not null"`
	NameAr       string    `gorm:"column:name_ar;type:varchar(255);not null"`
	Icon         string    `gorm:"column:icon;type:varchar(50)"`
	ProductCount int       `gorm:"column:product_count;default:0"`
	Trending     bool      `gorm:"column:trending;default:false"`
	CreatedAt    time.Time `gorm:"column:created_at;type:timestamp;autoCreateTime"`
	UpdatedAt    time.Time `gorm:"column:updated_at;type:timestamp;autoUpdateTime"`
}

func (MigrationSubcategory) TableName() string { return "subcategories" }

// MigrationProduct matches products table (001_init_schema).
type MigrationProduct struct {
	ID             string    `gorm:"column:id;type:varchar(36);primaryKey"`
	SupplierID     string    `gorm:"column:supplier_id;type:varchar(36);not null;index"`
	CategoryID     string    `gorm:"column:category_id;type:varchar(36);index"`
	SubcategoryID  string    `gorm:"column:subcategory_id;type:varchar(36);index"`
	Name           string    `gorm:"column:name;type:varchar(255);not null"`
	Description    string    `gorm:"column:description;type:text"`
	Specifications string    `gorm:"column:specifications;type:text"`
	Images         string    `gorm:"column:images;type:text"`
	Price          float64   `gorm:"column:price;type:decimal(15,2);not null"`
	Currency       string    `gorm:"column:currency;type:varchar(10);default:USD"`
	MOQ            int       `gorm:"column:moq;default:1"`
	StockQuantity  int       `gorm:"column:stock_quantity;default:0"`
	Unit           string    `gorm:"column:unit;type:varchar(50);default:piece"`
	LeadTime       int       `gorm:"column:lead_time;default:0"`
	Rating         float64   `gorm:"column:rating;type:decimal(3,2);default:0"`
	ReviewCount    int       `gorm:"column:review_count;default:0"`
	Featured       bool      `gorm:"column:featured;default:false"`
	Status         string    `gorm:"column:status;type:varchar(20);default:draft"`
	CreatedAt      time.Time `gorm:"column:created_at;type:timestamp;autoCreateTime"`
	UpdatedAt      time.Time `gorm:"column:updated_at;type:timestamp;autoUpdateTime"`
}

func (MigrationProduct) TableName() string { return "products" }

// MigrationOrder matches orders table (001_init_schema).
type MigrationOrder struct {
	ID                string     `gorm:"column:id;type:varchar(36);primaryKey"`
	OrderNumber       string     `gorm:"column:order_number;type:varchar(50);not null;uniqueIndex"`
	BuyerID           string     `gorm:"column:buyer_id;type:varchar(36);not null;index"`
	SupplierID        string     `gorm:"column:supplier_id;type:varchar(36);not null;index"`
	ProductID         string     `gorm:"column:product_id;type:varchar(36);not null"`
	Quantity          int        `gorm:"column:quantity;not null"`
	UnitPrice         float64    `gorm:"column:unit_price;type:decimal(15,2);not null"`
	TotalAmount       float64    `gorm:"column:total_amount;type:decimal(15,2);not null"`
	Currency          string     `gorm:"column:currency;type:varchar(10);default:USD"`
	Status            string     `gorm:"column:status;type:varchar(30);default:pending"`
	PaymentStatus     string     `gorm:"column:payment_status;type:varchar(20);default:pending"`
	PaymentMethod     string     `gorm:"column:payment_method;type:varchar(100)"`
	ShippingAddress   string     `gorm:"column:shipping_address;type:text;not null"`
	ShippingMethod    string     `gorm:"column:shipping_method;type:varchar(100)"`
	TrackingNumber    string     `gorm:"column:tracking_number;type:varchar(100)"`
	EstimatedDelivery *time.Time `gorm:"column:estimated_delivery;type:timestamp"`
	DeliveredAt       *time.Time `gorm:"column:delivered_at;type:timestamp"`
	CreatedAt         time.Time  `gorm:"column:created_at;type:timestamp;autoCreateTime"`
	UpdatedAt         time.Time  `gorm:"column:updated_at;type:timestamp;autoUpdateTime"`
}

func (MigrationOrder) TableName() string { return "orders" }

// MigrationRFQ matches rfqs table (001_init_schema).
type MigrationRFQ struct {
	ID                    string     `gorm:"column:id;type:varchar(36);primaryKey"`
	BuyerID               string     `gorm:"column:buyer_id;type:varchar(36);not null;index"`
	ProductID             string     `gorm:"column:product_id;type:varchar(36)"`
	ProductName           string     `gorm:"column:product_name;type:varchar(255);not null"`
	ProductImage          string     `gorm:"column:product_image;type:text"`
	SupplierID            string     `gorm:"column:supplier_id;type:varchar(36);index"`
	Quantity              int        `gorm:"column:quantity;not null"`
	Unit                  string     `gorm:"column:unit;type:varchar(50);not null"`
	Specifications        string     `gorm:"column:specifications;type:text"`
	Requirements          string     `gorm:"column:requirements;type:text"`
	DeliveryLocation      string     `gorm:"column:delivery_location;type:varchar(255)"`
	PreferredDeliveryDate *time.Time `gorm:"column:preferred_delivery_date;type:timestamp"`
	Budget                *float64   `gorm:"column:budget;type:decimal(15,2)"`
	Currency              string     `gorm:"column:currency;type:varchar(10);default:USD"`
	Status                string     `gorm:"column:status;type:varchar(20);default:draft"`
	SubmittedAt           *time.Time `gorm:"column:submitted_at;type:timestamp"`
	ExpiresAt             *time.Time `gorm:"column:expires_at;type:timestamp"`
	CreatedAt             time.Time  `gorm:"column:created_at;type:timestamp;autoCreateTime"`
	UpdatedAt             time.Time  `gorm:"column:updated_at;type:timestamp;autoUpdateTime"`
}

func (MigrationRFQ) TableName() string { return "rfqs" }

// MigrationRFQResponse matches rfq_responses table (001_init_schema).
type MigrationRFQResponse struct {
	ID                string     `gorm:"column:id;type:varchar(36);primaryKey"`
	RFQID             string     `gorm:"column:rfq_id;type:varchar(36);not null;index"`
	SupplierID        string     `gorm:"column:supplier_id;type:varchar(36);not null;index"`
	UnitPrice         float64    `gorm:"column:unit_price;type:decimal(15,2);not null"`
	TotalPrice        float64    `gorm:"column:total_price;type:decimal(15,2);not null"`
	Currency          string     `gorm:"column:currency;type:varchar(10);default:USD"`
	MOQ               int        `gorm:"column:moq;not null"`
	EstimatedDelivery int        `gorm:"column:estimated_delivery;not null"`
	PaymentTerms      string     `gorm:"column:payment_terms;type:text"`
	Specifications    string     `gorm:"column:specifications;type:text"`
	Message           string     `gorm:"column:message;type:text"`
	Status            string     `gorm:"column:status;type:varchar(20);default:pending"`
	SubmittedAt       time.Time  `gorm:"column:submitted_at;type:timestamp"`
	ExpiresAt         *time.Time `gorm:"column:expires_at;type:timestamp"`
	CreatedAt         time.Time  `gorm:"column:created_at;type:timestamp;autoCreateTime"`
	UpdatedAt         time.Time  `gorm:"column:updated_at;type:timestamp;autoUpdateTime"`
}

func (MigrationRFQResponse) TableName() string { return "rfq_responses" }

// MigrationNotification matches notifications table (001_init_schema).
type MigrationNotification struct {
	ID          string     `gorm:"column:id;type:varchar(36);primaryKey"`
	UserID      string     `gorm:"column:user_id;type:varchar(36);not null;index"`
	Type        string     `gorm:"column:type;type:varchar(20);not null"`
	Priority    string     `gorm:"column:priority;type:varchar(20);default:medium"`
	Title       string     `gorm:"column:title;type:varchar(255);not null"`
	Description string     `gorm:"column:description;type:text;not null"`
	Icon        string     `gorm:"column:icon;type:varchar(100)"`
	ActionURL   string     `gorm:"column:action_url;type:text"`
	ActionLabel string     `gorm:"column:action_label;type:varchar(100)"`
	Read        bool       `gorm:"column:read;default:false"`
	Metadata    string     `gorm:"column:metadata;type:text"`
	CreatedAt   time.Time  `gorm:"column:created_at;type:timestamp;autoCreateTime"`
	ReadAt      *time.Time `gorm:"column:read_at;type:timestamp"`
}

func (MigrationNotification) TableName() string { return "notifications" }

// MigrationVerification matches verifications table (001_init_schema).
type MigrationVerification struct {
	ID                    string     `gorm:"column:id;type:varchar(36);primaryKey"`
	SupplierID            string     `gorm:"column:supplier_id;type:varchar(36);not null;index"`
	Status                string     `gorm:"column:status;type:varchar(20);default:unverified"`
	FullName              string     `gorm:"column:full_name;type:varchar(255)"`
	Nationality           string     `gorm:"column:nationality;type:varchar(100)"`
	IDType                string     `gorm:"column:id_type;type:varchar(20)"`
	IDNumber              string     `gorm:"column:id_number;type:varchar(100)"`
	IdentityFrontURL      string     `gorm:"column:identity_front_url;type:text"`
	IdentityBackURL       string     `gorm:"column:identity_back_url;type:text"`
	LegalName             string     `gorm:"column:legal_name;type:varchar(255)"`
	RegistrationNumber    string     `gorm:"column:registration_number;type:varchar(100)"`
	CountryOfRegistration string     `gorm:"column:country_of_registration;type:varchar(100)"`
	CompanyAddress        string     `gorm:"column:company_address;type:text"`
	BusinessType          string     `gorm:"column:business_type;type:varchar(100)"`
	BusinessLicenseURL    string     `gorm:"column:business_license_url;type:text"`
	CertificateURL        string     `gorm:"column:certificate_url;type:text"`
	EmailVerified         bool       `gorm:"column:email_verified;default:false"`
	PhoneVerified         bool       `gorm:"column:phone_verified;default:false"`
	EmailVerifiedAt       *time.Time `gorm:"column:email_verified_at;type:timestamp"`
	PhoneVerifiedAt       *time.Time `gorm:"column:phone_verified_at;type:timestamp"`
	SubmittedAt           *time.Time `gorm:"column:submitted_at;type:timestamp"`
	ReviewedAt            *time.Time `gorm:"column:reviewed_at;type:timestamp"`
	ReviewedBy            string     `gorm:"column:reviewed_by;type:varchar(36)"`
	RejectionReason       string     `gorm:"column:rejection_reason;type:text"`
	AdminNotes            string     `gorm:"column:admin_notes;type:text"`
	CreatedAt             time.Time  `gorm:"column:created_at;type:timestamp;autoCreateTime"`
	UpdatedAt             time.Time  `gorm:"column:updated_at;type:timestamp;autoUpdateTime"`
}

func (MigrationVerification) TableName() string { return "verifications" }

// MigrationSubscription matches subscriptions table (001_init_schema).
type MigrationSubscription struct {
	ID            string     `gorm:"column:id;type:varchar(36);primaryKey"`
	SupplierID    string     `gorm:"column:supplier_id;type:varchar(36);not null;index"`
	Plan          string     `gorm:"column:plan;type:varchar(20);default:free"`
	Status        string     `gorm:"column:status;type:varchar(20);default:active"`
	StartedAt     time.Time  `gorm:"column:started_at;type:timestamp"`
	ExpiresAt     *time.Time `gorm:"column:expires_at;type:timestamp"`
	CancelledAt   *time.Time `gorm:"column:cancelled_at;type:timestamp"`
	Amount        float64    `gorm:"column:amount;type:decimal(15,2);default:0"`
	Currency      string     `gorm:"column:currency;type:varchar(10);default:USD"`
	PaymentMethod string     `gorm:"column:payment_method;type:varchar(100)"`
	CreatedAt     time.Time  `gorm:"column:created_at;type:timestamp;autoCreateTime"`
	UpdatedAt     time.Time  `gorm:"column:updated_at;type:timestamp;autoUpdateTime"`
}

func (MigrationSubscription) TableName() string { return "subscriptions" }

// MigrationMessage matches messages table (001_init_schema).
type MigrationMessage struct {
	ID             string     `gorm:"column:id;type:varchar(36);primaryKey"`
	ConversationID string     `gorm:"column:conversation_id;type:varchar(36);not null;index"`
	SenderID       string     `gorm:"column:sender_id;type:varchar(36);not null;index"`
	ReceiverID     string     `gorm:"column:receiver_id;type:varchar(36);not null;index"`
	Subject        string     `gorm:"column:subject;type:varchar(255)"`
	Body           string     `gorm:"column:body;type:text;not null"`
	Attachments    string     `gorm:"column:attachments;type:text"`
	Read           bool       `gorm:"column:read;default:false"`
	ReadAt         *time.Time `gorm:"column:read_at;type:timestamp"`
	CreatedAt      time.Time  `gorm:"column:created_at;type:timestamp;autoCreateTime"`
}

func (MigrationMessage) TableName() string { return "messages" }

// MigrationReview matches reviews table (001_init_schema).
type MigrationReview struct {
	ID               string    `gorm:"column:id;type:varchar(36);primaryKey"`
	ProductID        string    `gorm:"column:product_id;type:varchar(36);index"`
	SupplierID       string    `gorm:"column:supplier_id;type:varchar(36);index"`
	ReviewerID       string    `gorm:"column:reviewer_id;type:varchar(36);not null;index"`
	Rating           int       `gorm:"column:rating;not null"`
	Title            string    `gorm:"column:title;type:varchar(255)"`
	Comment          string    `gorm:"column:comment;type:text"`
	VerifiedPurchase bool      `gorm:"column:verified_purchase;default:false"`
	HelpfulCount     int       `gorm:"column:helpful_count;default:0"`
	CreatedAt        time.Time `gorm:"column:created_at;type:timestamp;autoCreateTime"`
	UpdatedAt        time.Time `gorm:"column:updated_at;type:timestamp;autoUpdateTime"`
}

func (MigrationReview) TableName() string { return "reviews" }

// MigrationFavorite matches favorites table (001_init_schema).
type MigrationFavorite struct {
	ID        string    `gorm:"column:id;type:varchar(36);primaryKey"`
	UserID    string    `gorm:"column:user_id;type:varchar(36);not null;uniqueIndex:unique_user_product"`
	ProductID string    `gorm:"column:product_id;type:varchar(36);not null;uniqueIndex:unique_user_product"`
	CreatedAt time.Time `gorm:"column:created_at;type:timestamp;autoCreateTime"`
}

func (MigrationFavorite) TableName() string { return "favorites" }

// MigrationSearchHistory matches search_history table (001_init_schema).
type MigrationSearchHistory struct {
	ID          string    `gorm:"column:id;type:varchar(36);primaryKey"`
	UserID      string    `gorm:"column:user_id;type:varchar(36);index"`
	Query       string    `gorm:"column:query;type:text;not null"`
	SearchType  string    `gorm:"column:search_type;type:varchar(20);default:text"`
	Filters     string    `gorm:"column:filters;type:text"`
	ResultCount int       `gorm:"column:result_count;default:0"`
	CreatedAt   time.Time `gorm:"column:created_at;type:timestamp;autoCreateTime"`
}

func (MigrationSearchHistory) TableName() string { return "search_history" }
