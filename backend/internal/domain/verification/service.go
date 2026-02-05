package verification

import (
	"context"
	"time"
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) List(ctx context.Context, limit, offset int) ([]*Verification, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.List(ctx, limit, offset)
}

func (s *Service) GetByID(ctx context.Context, id string) (*Verification, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *Service) GetBySupplierID(ctx context.Context, supplierID string) (*Verification, error) {
	return s.repo.GetBySupplierID(ctx, supplierID)
}

func (s *Service) Submit(ctx context.Context, supplierID string, in SubmitVerificationInput) (*Verification, error) {
	now := time.Now().UTC()

	v := &Verification{
		SupplierID:            supplierID,
		Status:                StatusPending,
		FullName:              in.FullName,
		Nationality:           in.Nationality,
		IDType:                in.IDType,
		IDNumber:              in.IDNumber,
		IdentityFrontURL:      in.IdentityFrontURL,
		IdentityBackURL:       in.IdentityBackURL,
		LegalName:             in.LegalName,
		RegistrationNumber:    in.RegistrationNumber,
		CountryOfRegistration: in.CountryOfRegistration,
		CompanyAddress:        in.CompanyAddress,
		BusinessType:          in.BusinessType,
		BusinessLicenseURL:    in.BusinessLicenseURL,
		CertificateURL:        in.CertificateURL,
		EmailVerified:         false,
		PhoneVerified:         false,
		SubmittedAt:           &now,
	}

	if err := s.repo.Create(ctx, v); err != nil {
		return nil, err
	}
	return v, nil
}

func (s *Service) Review(ctx context.Context, id, reviewerID string, in ReviewVerificationInput) (*Verification, error) {
	v, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	now := time.Now().UTC()
	v.Status = in.Status
	v.ReviewedAt = &now
	v.ReviewedBy = reviewerID
	v.RejectionReason = in.RejectionReason
	v.AdminNotes = in.AdminNotes

	if err := s.repo.Update(ctx, v); err != nil {
		return nil, err
	}
	return v, nil
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
