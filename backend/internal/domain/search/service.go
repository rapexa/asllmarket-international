package search

import (
	"context"
	"database/sql"
)

type Service struct {
	db *sql.DB
}

func NewService(db *sql.DB) *Service {
	return &Service{db: db}
}

func (s *Service) Search(ctx context.Context, req SearchRequest) (*SearchResponse, error) {
	// Set defaults
	if req.Limit <= 0 || req.Limit > 100 {
		req.Limit = 20
	}
	if req.Offset < 0 {
		req.Offset = 0
	}

	var products []ProductResult
	var suppliers []SupplierResult

	// Search products
	if req.Type == SearchTypeText || req.Type == "" {
		products, _ = s.searchProducts(ctx, req)
		suppliers, _ = s.searchSuppliers(ctx, req)
	}

	total := len(products) + len(suppliers)

	return &SearchResponse{
		Products:  products,
		Suppliers: suppliers,
		Total:     total,
	}, nil
}

func (s *Service) searchProducts(ctx context.Context, req SearchRequest) ([]ProductResult, error) {
	query := `
SELECT p.id, p.name, p.description, p.price, p.currency, p.images, 
       p.supplier_id, s.company_name, p.rating, p.moq
FROM products p
INNER JOIN suppliers s ON p.supplier_id = s.id
WHERE p.status = 'active'
  AND (MATCH(p.name, p.description) AGAINST(? IN NATURAL LANGUAGE MODE) OR ? = '')
`

	args := []interface{}{req.Query, req.Query}

	if req.CategoryID != "" {
		query += " AND p.category_id = ?"
		args = append(args, req.CategoryID)
	}

	if req.MinPrice > 0 {
		query += " AND p.price >= ?"
		args = append(args, req.MinPrice)
	}

	if req.MaxPrice > 0 {
		query += " AND p.price <= ?"
		args = append(args, req.MaxPrice)
	}

	if req.Verified {
		query += " AND s.verified = TRUE"
	}

	query += " ORDER BY p.rating DESC, p.created_at DESC LIMIT ? OFFSET ?"
	args = append(args, req.Limit, req.Offset)

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []ProductResult
	for rows.Next() {
		var p ProductResult
		if err := rows.Scan(
			&p.ID, &p.Name, &p.Description, &p.Price, &p.Currency,
			&p.Images, &p.SupplierID, &p.SupplierName, &p.Rating, &p.MOQ,
		); err != nil {
			return nil, err
		}
		results = append(results, p)
	}

	return results, rows.Err()
}

func (s *Service) searchSuppliers(ctx context.Context, req SearchRequest) ([]SupplierResult, error) {
	query := `
SELECT id, company_name, country, logo, verified, rating, description
FROM suppliers
WHERE status = 'active'
  AND (company_name LIKE ? OR description LIKE ? OR ? = '')
`

	searchPattern := "%" + req.Query + "%"
	args := []interface{}{searchPattern, searchPattern, req.Query}

	if req.Country != "" {
		query += " AND country = ?"
		args = append(args, req.Country)
	}

	if req.Verified {
		query += " AND verified = TRUE"
	}

	query += " ORDER BY rating DESC, created_at DESC LIMIT ? OFFSET ?"
	args = append(args, req.Limit, req.Offset)

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []SupplierResult
	for rows.Next() {
		var s SupplierResult
		if err := rows.Scan(
			&s.ID, &s.CompanyName, &s.Country, &s.Logo,
			&s.Verified, &s.Rating, &s.Description,
		); err != nil {
			return nil, err
		}
		results = append(results, s)
	}

	return results, rows.Err()
}
