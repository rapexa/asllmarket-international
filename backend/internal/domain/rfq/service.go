package rfq

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

// RFQ operations
func (s *Service) ListRFQs(ctx context.Context, limit, offset int) ([]*RFQ, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.ListRFQs(ctx, limit, offset)
}

func (s *Service) ListMyRFQs(ctx context.Context, buyerID string, limit, offset int) ([]*RFQ, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}
	return s.repo.ListRFQsByBuyerID(ctx, buyerID, limit, offset)
}

func (s *Service) GetRFQByID(ctx context.Context, id string) (*RFQ, error) {
	return s.repo.GetRFQByID(ctx, id)
}

func (s *Service) CreateRFQ(ctx context.Context, buyerID string, in CreateRFQInput) (*RFQ, error) {
	now := time.Now().UTC()
	submitted := now
	expires := now.Add(30 * 24 * time.Hour) // Default: 30 days

	rfq := &RFQ{
		BuyerID:               buyerID,
		ProductID:             in.ProductID,
		ProductName:           in.ProductName,
		ProductImage:          in.ProductImage,
		SupplierID:            in.SupplierID,
		Quantity:              in.Quantity,
		Unit:                  in.Unit,
		Specifications:        in.Specifications,
		Requirements:          in.Requirements,
		DeliveryLocation:      in.DeliveryLocation,
		PreferredDeliveryDate: in.PreferredDeliveryDate,
		Budget:                in.Budget,
		Currency:              in.Currency,
		Status:                StatusActive,
		SubmittedAt:           &submitted,
		ExpiresAt:             &expires,
	}

	if err := s.repo.CreateRFQ(ctx, rfq); err != nil {
		return nil, err
	}
	return rfq, nil
}

func (s *Service) UpdateRFQStatus(ctx context.Context, id string, status RFQStatus) (*RFQ, error) {
	rfq, err := s.repo.GetRFQByID(ctx, id)
	if err != nil {
		return nil, err
	}

	rfq.Status = status
	if err := s.repo.UpdateRFQ(ctx, rfq); err != nil {
		return nil, err
	}
	return rfq, nil
}

func (s *Service) DeleteRFQ(ctx context.Context, id string) error {
	return s.repo.DeleteRFQ(ctx, id)
}

// RFQ Response operations
func (s *Service) ListResponsesByRFQID(ctx context.Context, rfqID string) ([]*RFQResponse, error) {
	return s.repo.ListResponsesByRFQID(ctx, rfqID)
}

func (s *Service) CreateResponse(ctx context.Context, supplierID string, in CreateRFQResponseInput) (*RFQResponse, error) {
	now := time.Now().UTC()
	totalPrice := in.UnitPrice * float64(in.MOQ)

	resp := &RFQResponse{
		RFQID:             in.RFQID,
		SupplierID:        supplierID,
		UnitPrice:         in.UnitPrice,
		TotalPrice:        totalPrice,
		Currency:          in.Currency,
		MOQ:               in.MOQ,
		EstimatedDelivery: in.EstimatedDelivery,
		PaymentTerms:      in.PaymentTerms,
		Specifications:    in.Specifications,
		Message:           in.Message,
		Status:            ResponsePending,
		SubmittedAt:       now,
	}

	if err := s.repo.CreateResponse(ctx, resp); err != nil {
		return nil, err
	}
	return resp, nil
}

func (s *Service) UpdateResponseStatus(ctx context.Context, id string, status ResponseStatus) (*RFQResponse, error) {
	resp, err := s.repo.GetResponseByID(ctx, id)
	if err != nil {
		return nil, err
	}

	resp.Status = status
	if err := s.repo.UpdateResponse(ctx, resp); err != nil {
		return nil, err
	}
	return resp, nil
}
