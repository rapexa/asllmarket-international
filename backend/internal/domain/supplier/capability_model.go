package supplier

import "time"

// SupplierCapability for company capabilities like OEM/ODM, Trade Assurance, etc.
type SupplierCapability struct {
	ID              string    `db:"id" json:"id"`
	SupplierID      string    `db:"supplier_id" json:"supplierId"`
	CapabilityType  string    `db:"capability_type" json:"capabilityType"` // e.g., "OEM/ODM Service"
	CapabilityValue string    `db:"capability_value" json:"capabilityValue"`
	Icon            string    `db:"icon" json:"icon"`
	DisplayOrder    int       `db:"display_order" json:"displayOrder"`
	CreatedAt       time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt       time.Time `db:"updated_at" json:"updatedAt"`
}

// SupplierCertificate for company certificates like ISO, CE, FDA, etc.
type SupplierCertificate struct {
	ID              string     `db:"id" json:"id"`
	SupplierID      string     `db:"supplier_id" json:"supplierId"`
	CertificateName string     `db:"certificate_name" json:"certificateName"`
	CertificateNum  string     `db:"certificate_number" json:"certificateNumber"`
	IssuedBy        string     `db:"issued_by" json:"issuedBy"`
	IssuedDate      *time.Time `db:"issued_date" json:"issuedDate,omitempty"`
	ExpiryDate      *time.Time `db:"expiry_date" json:"expiryDate,omitempty"`
	DocumentURL     string     `db:"document_url" json:"documentUrl"`
	Verified        bool       `db:"verified" json:"verified"`
	DisplayOrder    int        `db:"display_order" json:"displayOrder"`
	CreatedAt       time.Time  `db:"created_at" json:"createdAt"`
	UpdatedAt       time.Time  `db:"updated_at" json:"updatedAt"`
}
