package verification

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	ErrNotFound = errors.New("verification not found")
)

type Repository interface {
	List(ctx context.Context, limit, offset int) ([]*Verification, error)
	GetByID(ctx context.Context, id string) (*Verification, error)
	GetBySupplierID(ctx context.Context, supplierID string) (*Verification, error)
	Create(ctx context.Context, v *Verification) error
	Update(ctx context.Context, v *Verification) error
	Delete(ctx context.Context, id string) error
}

type mySQLVerificationRepository struct {
	db *sql.DB
}

func NewMySQLVerificationRepository(db *sql.DB) Repository {
	return &mySQLVerificationRepository{db: db}
}

func (r *mySQLVerificationRepository) List(ctx context.Context, limit, offset int) ([]*Verification, error) {
	const query = `
SELECT id, supplier_id, status, full_name, nationality, id_type, id_number, 
       identity_front_url, identity_back_url, legal_name, registration_number, 
       country_of_registration, company_address, business_type, business_license_url, 
       certificate_url, email_verified, phone_verified, email_verified_at, phone_verified_at, 
       submitted_at, reviewed_at, reviewed_by, rejection_reason, admin_notes, created_at, updated_at
FROM verifications
ORDER BY created_at DESC
LIMIT ? OFFSET ?`

	rows, err := r.db.QueryContext(ctx, query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var verifications []*Verification
	for rows.Next() {
		var v Verification
		if err := rows.Scan(
			&v.ID, &v.SupplierID, &v.Status, &v.FullName, &v.Nationality, &v.IDType,
			&v.IDNumber, &v.IdentityFrontURL, &v.IdentityBackURL, &v.LegalName,
			&v.RegistrationNumber, &v.CountryOfRegistration, &v.CompanyAddress,
			&v.BusinessType, &v.BusinessLicenseURL, &v.CertificateURL,
			&v.EmailVerified, &v.PhoneVerified, &v.EmailVerifiedAt, &v.PhoneVerifiedAt,
			&v.SubmittedAt, &v.ReviewedAt, &v.ReviewedBy, &v.RejectionReason,
			&v.AdminNotes, &v.CreatedAt, &v.UpdatedAt,
		); err != nil {
			return nil, err
		}
		verifications = append(verifications, &v)
	}
	return verifications, rows.Err()
}

func (r *mySQLVerificationRepository) GetByID(ctx context.Context, id string) (*Verification, error) {
	const query = `
SELECT id, supplier_id, status, full_name, nationality, id_type, id_number, 
       identity_front_url, identity_back_url, legal_name, registration_number, 
       country_of_registration, company_address, business_type, business_license_url, 
       certificate_url, email_verified, phone_verified, email_verified_at, phone_verified_at, 
       submitted_at, reviewed_at, reviewed_by, rejection_reason, admin_notes, created_at, updated_at
FROM verifications
WHERE id = ? LIMIT 1`

	var v Verification
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&v.ID, &v.SupplierID, &v.Status, &v.FullName, &v.Nationality, &v.IDType,
		&v.IDNumber, &v.IdentityFrontURL, &v.IdentityBackURL, &v.LegalName,
		&v.RegistrationNumber, &v.CountryOfRegistration, &v.CompanyAddress,
		&v.BusinessType, &v.BusinessLicenseURL, &v.CertificateURL,
		&v.EmailVerified, &v.PhoneVerified, &v.EmailVerifiedAt, &v.PhoneVerifiedAt,
		&v.SubmittedAt, &v.ReviewedAt, &v.ReviewedBy, &v.RejectionReason,
		&v.AdminNotes, &v.CreatedAt, &v.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &v, nil
}

func (r *mySQLVerificationRepository) GetBySupplierID(ctx context.Context, supplierID string) (*Verification, error) {
	const query = `
SELECT id, supplier_id, status, full_name, nationality, id_type, id_number, 
       identity_front_url, identity_back_url, legal_name, registration_number, 
       country_of_registration, company_address, business_type, business_license_url, 
       certificate_url, email_verified, phone_verified, email_verified_at, phone_verified_at, 
       submitted_at, reviewed_at, reviewed_by, rejection_reason, admin_notes, created_at, updated_at
FROM verifications
WHERE supplier_id = ? LIMIT 1`

	var v Verification
	if err := r.db.QueryRowContext(ctx, query, supplierID).Scan(
		&v.ID, &v.SupplierID, &v.Status, &v.FullName, &v.Nationality, &v.IDType,
		&v.IDNumber, &v.IdentityFrontURL, &v.IdentityBackURL, &v.LegalName,
		&v.RegistrationNumber, &v.CountryOfRegistration, &v.CompanyAddress,
		&v.BusinessType, &v.BusinessLicenseURL, &v.CertificateURL,
		&v.EmailVerified, &v.PhoneVerified, &v.EmailVerifiedAt, &v.PhoneVerifiedAt,
		&v.SubmittedAt, &v.ReviewedAt, &v.ReviewedBy, &v.RejectionReason,
		&v.AdminNotes, &v.CreatedAt, &v.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}
	return &v, nil
}

func (r *mySQLVerificationRepository) Create(ctx context.Context, v *Verification) error {
	if v.ID == "" {
		v.ID = uuid.NewString()
	}
	now := time.Now().UTC()
	v.CreatedAt = now
	v.UpdatedAt = now

	const query = `
INSERT INTO verifications (
	id, supplier_id, status, full_name, nationality, id_type, id_number, 
	identity_front_url, identity_back_url, legal_name, registration_number, 
	country_of_registration, company_address, business_type, business_license_url, 
	certificate_url, email_verified, phone_verified, email_verified_at, phone_verified_at, 
	submitted_at, reviewed_at, reviewed_by, rejection_reason, admin_notes, created_at, updated_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(ctx, query,
		v.ID, v.SupplierID, v.Status, v.FullName, v.Nationality, v.IDType,
		v.IDNumber, v.IdentityFrontURL, v.IdentityBackURL, v.LegalName,
		v.RegistrationNumber, v.CountryOfRegistration, v.CompanyAddress,
		v.BusinessType, v.BusinessLicenseURL, v.CertificateURL,
		v.EmailVerified, v.PhoneVerified, v.EmailVerifiedAt, v.PhoneVerifiedAt,
		v.SubmittedAt, v.ReviewedAt, v.ReviewedBy, v.RejectionReason,
		v.AdminNotes, v.CreatedAt, v.UpdatedAt,
	)
	return err
}

func (r *mySQLVerificationRepository) Update(ctx context.Context, v *Verification) error {
	v.UpdatedAt = time.Now().UTC()

	const query = `
UPDATE verifications
SET status = ?, full_name = ?, nationality = ?, id_type = ?, id_number = ?, 
    identity_front_url = ?, identity_back_url = ?, legal_name = ?, registration_number = ?, 
    country_of_registration = ?, company_address = ?, business_type = ?, business_license_url = ?, 
    certificate_url = ?, email_verified = ?, phone_verified = ?, email_verified_at = ?, 
    phone_verified_at = ?, submitted_at = ?, reviewed_at = ?, reviewed_by = ?, 
    rejection_reason = ?, admin_notes = ?, updated_at = ?
WHERE id = ?`

	res, err := r.db.ExecContext(ctx, query,
		v.Status, v.FullName, v.Nationality, v.IDType, v.IDNumber,
		v.IdentityFrontURL, v.IdentityBackURL, v.LegalName, v.RegistrationNumber,
		v.CountryOfRegistration, v.CompanyAddress, v.BusinessType, v.BusinessLicenseURL,
		v.CertificateURL, v.EmailVerified, v.PhoneVerified, v.EmailVerifiedAt,
		v.PhoneVerifiedAt, v.SubmittedAt, v.ReviewedAt, v.ReviewedBy,
		v.RejectionReason, v.AdminNotes, v.UpdatedAt,
		v.ID,
	)
	if err != nil {
		return err
	}
	rows, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return ErrNotFound
	}
	return nil
}

func (r *mySQLVerificationRepository) Delete(ctx context.Context, id string) error {
	const query = `DELETE FROM verifications WHERE id = ?`
	res, err := r.db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	rows, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return ErrNotFound
	}
	return nil
}
