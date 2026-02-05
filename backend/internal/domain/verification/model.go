package verification

import "time"

type VerificationStatus string

const (
	StatusUnverified  VerificationStatus = "unverified"
	StatusPending     VerificationStatus = "pending"
	StatusVerified    VerificationStatus = "verified"
	StatusRejected    VerificationStatus = "rejected"
	StatusNeedsUpdate VerificationStatus = "needs_update"
)

type IDType string

const (
	IDTypePassport   IDType = "passport"
	IDTypeNationalID IDType = "national_id"
)

// Verification tracks supplier identity & business verification (KYC/KYB).
type Verification struct {
	ID                     string             `db:"id" json:"id"`
	SupplierID             string             `db:"supplier_id" json:"supplierId"`
	Status                 VerificationStatus `db:"status" json:"status"`
	// Personal Identity
	FullName               string    `db:"full_name" json:"fullName"`
	Nationality            string    `db:"nationality" json:"nationality"`
	IDType                 IDType    `db:"id_type" json:"idType"`
	IDNumber               string    `db:"id_number" json:"idNumber"`
	IdentityFrontURL       string    `db:"identity_front_url" json:"identityFrontUrl"`
	IdentityBackURL        string    `db:"identity_back_url" json:"identityBackUrl"`
	// Business Info
	LegalName              string    `db:"legal_name" json:"legalName"`
	RegistrationNumber     string    `db:"registration_number" json:"registrationNumber"`
	CountryOfRegistration  string    `db:"country_of_registration" json:"countryOfRegistration"`
	CompanyAddress         string    `db:"company_address" json:"companyAddress"`
	BusinessType           string    `db:"business_type" json:"businessType"`
	BusinessLicenseURL     string    `db:"business_license_url" json:"businessLicenseUrl"`
	CertificateURL         string    `db:"certificate_url" json:"certificateUrl"`
	// Contact Verification
	EmailVerified          bool       `db:"email_verified" json:"emailVerified"`
	PhoneVerified          bool       `db:"phone_verified" json:"phoneVerified"`
	EmailVerifiedAt        *time.Time `db:"email_verified_at" json:"emailVerifiedAt,omitempty"`
	PhoneVerifiedAt        *time.Time `db:"phone_verified_at" json:"phoneVerifiedAt,omitempty"`
	// Admin Review
	SubmittedAt            *time.Time `db:"submitted_at" json:"submittedAt,omitempty"`
	ReviewedAt             *time.Time `db:"reviewed_at" json:"reviewedAt,omitempty"`
	ReviewedBy             string     `db:"reviewed_by" json:"reviewedBy"`
	RejectionReason        string     `db:"rejection_reason" json:"rejectionReason"`
	AdminNotes             string     `db:"admin_notes" json:"adminNotes"`
	CreatedAt              time.Time  `db:"created_at" json:"createdAt"`
	UpdatedAt              time.Time  `db:"updated_at" json:"updatedAt"`
}

type SubmitVerificationInput struct {
	// Personal Identity
	FullName         string `json:"fullName" binding:"required"`
	Nationality      string `json:"nationality" binding:"required"`
	IDType           IDType `json:"idType" binding:"required"`
	IDNumber         string `json:"idNumber" binding:"required"`
	IdentityFrontURL string `json:"identityFrontUrl" binding:"required"`
	IdentityBackURL  string `json:"identityBackUrl"`
	// Business Info
	LegalName             string `json:"legalName" binding:"required"`
	RegistrationNumber    string `json:"registrationNumber" binding:"required"`
	CountryOfRegistration string `json:"countryOfRegistration" binding:"required"`
	CompanyAddress        string `json:"companyAddress" binding:"required"`
	BusinessType          string `json:"businessType" binding:"required"`
	BusinessLicenseURL    string `json:"businessLicenseUrl" binding:"required"`
	CertificateURL        string `json:"certificateUrl"`
}

type ReviewVerificationInput struct {
	Status          VerificationStatus `json:"status" binding:"required,oneof=verified rejected needs_update"`
	RejectionReason string             `json:"rejectionReason"`
	AdminNotes      string             `json:"adminNotes"`
}
