package admin

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

type Service struct {
	db *sql.DB
}

func NewService(db *sql.DB) *Service {
	return &Service{db: db}
}

// GetDashboardStats returns overall platform statistics
func (s *Service) GetDashboardStats(ctx context.Context) (*DashboardStats, error) {
	var stats DashboardStats

	// Get total users
	err := s.db.QueryRowContext(ctx, "SELECT COUNT(*) FROM users").Scan(&stats.TotalUsers)
	if err != nil {
		return nil, err
	}

	// Get total products
	err = s.db.QueryRowContext(ctx, "SELECT COUNT(*) FROM products WHERE status = 'active'").Scan(&stats.TotalProducts)
	if err != nil {
		return nil, err
	}

	// Get total orders
	err = s.db.QueryRowContext(ctx, "SELECT COUNT(*) FROM orders").Scan(&stats.TotalOrders)
	if err != nil {
		return nil, err
	}

	// Get total revenue
	err = s.db.QueryRowContext(ctx, "SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE payment_status = 'paid'").Scan(&stats.TotalRevenue)
	if err != nil {
		return nil, err
	}

	// Get new users (last 7 days)
	sevenDaysAgo := time.Now().AddDate(0, 0, -7)
	err = s.db.QueryRowContext(ctx, "SELECT COUNT(*) FROM users WHERE created_at >= ?", sevenDaysAgo).Scan(&stats.NewUsers)
	if err != nil {
		return nil, err
	}

	// Get new products (last 7 days)
	err = s.db.QueryRowContext(ctx, "SELECT COUNT(*) FROM products WHERE created_at >= ?", sevenDaysAgo).Scan(&stats.NewProducts)
	if err != nil {
		return nil, err
	}

	// Get pending orders
	err = s.db.QueryRowContext(ctx, "SELECT COUNT(*) FROM orders WHERE status = 'pending'").Scan(&stats.PendingOrders)
	if err != nil {
		return nil, err
	}

	// Get active suppliers
	err = s.db.QueryRowContext(ctx, "SELECT COUNT(*) FROM suppliers WHERE status = 'active'").Scan(&stats.ActiveSuppliers)
	if err != nil {
		return nil, err
	}

	// Get pending verifications
	err = s.db.QueryRowContext(ctx, "SELECT COUNT(*) FROM verifications WHERE status = 'pending'").Scan(&stats.PendingVerifications)
	if err != nil {
		return nil, err
	}

	// Calculate revenue change (compare last 7 days vs previous 7 days)
	var lastWeekRevenue, previousWeekRevenue float64
	fourteenDaysAgo := time.Now().AddDate(0, 0, -14)

	s.db.QueryRowContext(ctx,
		"SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE payment_status = 'paid' AND created_at >= ? AND created_at < ?",
		fourteenDaysAgo, sevenDaysAgo).Scan(&previousWeekRevenue)

	s.db.QueryRowContext(ctx,
		"SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE payment_status = 'paid' AND created_at >= ?",
		sevenDaysAgo).Scan(&lastWeekRevenue)

	if previousWeekRevenue > 0 {
		stats.RevenueChange = ((lastWeekRevenue - previousWeekRevenue) / previousWeekRevenue) * 100
	}

	return &stats, nil
}

// GetSalesData returns sales metrics over time
func (s *Service) GetSalesData(ctx context.Context, days int) ([]*SalesData, error) {
	query := `
SELECT 
	DATE(created_at) as date,
	COALESCE(SUM(total_amount), 0) as sales,
	COUNT(*) as orders
FROM orders
WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
	AND payment_status = 'paid'
GROUP BY DATE(created_at)
ORDER BY date ASC`

	rows, err := s.db.QueryContext(ctx, query, days)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var data []*SalesData
	for rows.Next() {
		var item SalesData
		if err := rows.Scan(&item.Date, &item.Sales, &item.Orders); err != nil {
			return nil, err
		}
		data = append(data, &item)
	}

	return data, rows.Err()
}

// GetCategoryStats returns product and revenue distribution by category
func (s *Service) GetCategoryStats(ctx context.Context) ([]*CategoryStats, error) {
	query := `
SELECT 
	c.id,
	c.name_en,
	COUNT(DISTINCT p.id) as product_count,
	COALESCE(SUM(o.total_amount), 0) as revenue
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
LEFT JOIN orders o ON p.id = o.product_id AND o.payment_status = 'paid'
GROUP BY c.id, c.name_en
ORDER BY revenue DESC`

	rows, err := s.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var stats []*CategoryStats
	var totalRevenue float64

	// First pass: collect data and calculate total
	var tempStats []*CategoryStats
	for rows.Next() {
		var stat CategoryStats
		if err := rows.Scan(&stat.CategoryID, &stat.CategoryName, &stat.ProductCount, &stat.Revenue); err != nil {
			return nil, err
		}
		totalRevenue += stat.Revenue
		tempStats = append(tempStats, &stat)
	}

	// Second pass: calculate percentages
	for _, stat := range tempStats {
		if totalRevenue > 0 {
			stat.Percentage = (stat.Revenue / totalRevenue) * 100
		}
		stats = append(stats, stat)
	}

	return stats, rows.Err()
}

// GetTopProducts returns best-selling products
func (s *Service) GetTopProducts(ctx context.Context, limit int) ([]*TopProduct, error) {
	query := `
SELECT 
	p.id,
	p.name,
	COUNT(o.id) as sales_count,
	COALESCE(SUM(o.total_amount), 0) as revenue
FROM products p
INNER JOIN orders o ON p.id = o.product_id
WHERE o.payment_status = 'paid'
GROUP BY p.id, p.name
ORDER BY revenue DESC
LIMIT ?`

	rows, err := s.db.QueryContext(ctx, query, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []*TopProduct
	for rows.Next() {
		var p TopProduct
		if err := rows.Scan(&p.ProductID, &p.ProductName, &p.SalesCount, &p.Revenue); err != nil {
			return nil, err
		}
		// TODO: Calculate change percentage (compare with previous period)
		p.Change = 0
		products = append(products, &p)
	}

	return products, rows.Err()
}

// GetUserStats returns user growth metrics
func (s *Service) GetUserStats(ctx context.Context, days int) ([]*UserStats, error) {
	query := `
SELECT 
	DATE(created_at) as date,
	COUNT(*) as new_users,
	SUM(CASE WHEN role = 'buyer' THEN 1 ELSE 0 END) as buyers,
	SUM(CASE WHEN role = 'supplier' THEN 1 ELSE 0 END) as suppliers
FROM users
WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
GROUP BY DATE(created_at)
ORDER BY date ASC`

	rows, err := s.db.QueryContext(ctx, query, days)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var stats []*UserStats
	for rows.Next() {
		var stat UserStats
		if err := rows.Scan(&stat.Date, &stat.NewUsers, &stat.Buyers, &stat.Suppliers); err != nil {
			return nil, err
		}
		// ActiveUsers would need session tracking - set to 0 for now
		stat.ActiveUsers = 0
		stats = append(stats, &stat)
	}

	return stats, rows.Err()
}

// GetRecentActivities returns recent platform activities
func (s *Service) GetRecentActivities(ctx context.Context, limit int) ([]*RecentActivity, error) {
	// This combines multiple tables - simplified version
	// In production, you might want a dedicated activities/audit log table

	query := `
(SELECT 
	CONCAT('order-', id) as id,
	'order' as type,
	CONCAT('New order ', order_number, ' received') as message,
	'success' as status,
	created_at
FROM orders
ORDER BY created_at DESC
LIMIT ?)
UNION ALL
(SELECT 
	CONCAT('user-', id) as id,
	'user' as type,
	CONCAT('New ', role, ' registered: ', email) as message,
	'info' as status,
	created_at
FROM users
ORDER BY created_at DESC
LIMIT ?)
ORDER BY created_at DESC
LIMIT ?`

	rows, err := s.db.QueryContext(ctx, query, limit/2, limit/2, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var activities []*RecentActivity
	for rows.Next() {
		var a RecentActivity
		if err := rows.Scan(&a.ID, &a.Type, &a.Message, &a.Status, &a.CreatedAt); err != nil {
			return nil, err
		}
		activities = append(activities, &a)
	}

	return activities, rows.Err()
}

// ListBuyers returns all buyers with their statistics
func (s *Service) ListBuyers(ctx context.Context, limit, offset int) ([]*BuyerListItem, error) {
	query := `
SELECT 
	u.id,
	u.email,
	u.full_name,
	u.phone,
	'Unknown' as country,
	COUNT(DISTINCT o.id) as total_orders,
	COALESCE(SUM(o.total_amount), 0) as total_spent,
	u.created_at,
	u.updated_at as last_active
FROM users u
LEFT JOIN orders o ON u.id = o.buyer_id AND o.payment_status = 'paid'
WHERE u.role = 'buyer'
GROUP BY u.id, u.email, u.full_name, u.phone, u.created_at, u.updated_at
ORDER BY total_spent DESC
LIMIT ? OFFSET ?`

	rows, err := s.db.QueryContext(ctx, query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var buyers []*BuyerListItem
	for rows.Next() {
		var b BuyerListItem
		if err := rows.Scan(
			&b.ID, &b.Email, &b.FullName, &b.Phone, &b.Country,
			&b.TotalOrders, &b.TotalSpent, &b.CreatedAt, &b.LastActive,
		); err != nil {
			return nil, err
		}
		b.Status = "active" // Default status since column may not exist yet
		buyers = append(buyers, &b)
	}

	return buyers, rows.Err()
}

// UpdateUserStatus updates a user's status (admin only)
func (s *Service) UpdateUserStatus(ctx context.Context, userID string, status string) error {
	query := `UPDATE users SET status = ?, updated_at = NOW() WHERE id = ?`
	result, err := s.db.ExecContext(ctx, query, status, userID)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return fmt.Errorf("user not found")
	}

	return nil
}

// ListProducts returns all products for admin with filters
func (s *Service) ListProducts(ctx context.Context, limit, offset int, status, category string) ([]*AdminProduct, error) {
	query := `
SELECT 
	p.id,
	p.name,
	p.description,
	p.category_id,
	COALESCE(c.name, 'Unknown') as category_name,
	p.supplier_id,
	COALESCE(sup.company_name, u.full_name, 'Unknown') as supplier_name,
	p.price,
	p.currency,
	p.min_order_qty,
	COALESCE(p.stock_quantity, 0) as stock,
	COALESCE(p.status, 'active') as status,
	0 as views,
	COUNT(DISTINCT o.id) as orders,
	COALESCE(AVG(r.rating), 0) as rating,
	COUNT(DISTINCT r.id) as review_count,
	p.created_at,
	p.updated_at
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN suppliers sup ON p.supplier_id = sup.id
LEFT JOIN users u ON p.supplier_id = u.id
LEFT JOIN orders o ON p.id = o.product_id
LEFT JOIN reviews r ON p.id = r.product_id
WHERE 1=1`

	args := []interface{}{}

	if status != "" && status != "all" {
		query += " AND COALESCE(p.status, 'active') = ?"
		args = append(args, status)
	}

	if category != "" && category != "all" {
		query += " AND p.category_id = ?"
		args = append(args, category)
	}

	query += `
GROUP BY p.id
ORDER BY p.created_at DESC
LIMIT ? OFFSET ?`

	args = append(args, limit, offset)

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []*AdminProduct
	for rows.Next() {
		var p AdminProduct
		if err := rows.Scan(
			&p.ID, &p.Name, &p.Description, &p.CategoryID, &p.CategoryName,
			&p.SupplierID, &p.SupplierName, &p.Price, &p.Currency, &p.MinOrderQty,
			&p.Stock, &p.Status, &p.Views, &p.Orders, &p.Rating, &p.ReviewCount,
			&p.CreatedAt, &p.UpdatedAt,
		); err != nil {
			return nil, err
		}
		products = append(products, &p)
	}

	return products, rows.Err()
}

// UpdateProductStatus changes a product's status
func (s *Service) UpdateProductStatus(ctx context.Context, productID string, input *UpdateProductStatusInput) error {
	query := `UPDATE products SET status = ?, updated_at = NOW() WHERE id = ?`
	result, err := s.db.ExecContext(ctx, query, input.Status, productID)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return fmt.Errorf("product not found")
	}

	return nil
}

// DeleteProduct soft deletes a product
func (s *Service) DeleteProduct(ctx context.Context, productID string) error {
	query := `UPDATE products SET status = 'inactive', updated_at = NOW() WHERE id = ?`
	result, err := s.db.ExecContext(ctx, query, productID)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return fmt.Errorf("product not found")
	}

	return nil
}

// ListOrders returns all orders for admin with filters
func (s *Service) ListOrders(ctx context.Context, limit, offset int, status, paymentStatus string) ([]*AdminOrder, error) {
	query := `
SELECT 
	o.id,
	o.order_number,
	o.buyer_id,
	COALESCE(bu.full_name, bu.email, 'Unknown') as buyer_name,
	'Unknown' as buyer_country,
	o.supplier_id,
	COALESCE(s.company_name, su.full_name, 'Unknown') as supplier_name,
	o.product_id,
	COALESCE(p.name, 'Unknown') as product_name,
	o.quantity,
	o.unit_price,
	o.total_amount,
	o.currency,
	o.status,
	o.payment_status,
	o.created_at,
	o.updated_at
FROM orders o
LEFT JOIN users bu ON o.buyer_id = bu.id
LEFT JOIN users su ON o.supplier_id = su.id
LEFT JOIN suppliers s ON o.supplier_id = s.id
LEFT JOIN products p ON o.product_id = p.id
WHERE 1=1`

	args := []interface{}{}

	if status != "" && status != "all" {
		query += " AND o.status = ?"
		args = append(args, status)
	}

	if paymentStatus != "" && paymentStatus != "all" {
		query += " AND o.payment_status = ?"
		args = append(args, paymentStatus)
	}

	query += `
ORDER BY o.created_at DESC
LIMIT ? OFFSET ?`

	args = append(args, limit, offset)

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var orders []*AdminOrder
	for rows.Next() {
		var o AdminOrder
		if err := rows.Scan(
			&o.ID, &o.OrderNumber, &o.BuyerID, &o.BuyerName, &o.BuyerCountry,
			&o.SupplierID, &o.SupplierName, &o.ProductID, &o.ProductName,
			&o.Quantity, &o.UnitPrice, &o.TotalAmount, &o.Currency,
			&o.Status, &o.PaymentStatus, &o.CreatedAt, &o.UpdatedAt,
		); err != nil {
			return nil, err
		}
		orders = append(orders, &o)
	}

	return orders, rows.Err()
}

// UpdateOrderStatus changes an order's status
func (s *Service) UpdateOrderStatus(ctx context.Context, orderID string, input *UpdateOrderStatusInput) error {
	query := `UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?`
	result, err := s.db.ExecContext(ctx, query, input.Status, orderID)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return fmt.Errorf("order not found")
	}

	return nil
}

// ListSuppliers returns all suppliers for admin
func (s *Service) ListSuppliers(ctx context.Context, limit, offset int, status, subscription string) ([]*AdminSupplier, error) {
	query := `
SELECT 
	u.id,
	COALESCE(s.company_name, 'Unknown') as company_name,
	u.full_name as contact_name,
	u.email,
	COALESCE(s.phone, u.phone, '') as phone,
	COALESCE(s.country, 'Unknown') as country,
	COALESCE(s.city, '') as city,
	s.verified,
	COALESCE(u.status, 'active') as status,
	COALESCE(sub.plan_type, 'free') as subscription,
	COUNT(DISTINCT p.id) as total_products,
	COUNT(DISTINCT o.id) as total_orders,
	COALESCE(SUM(o.total_amount), 0) as total_revenue,
	COALESCE(AVG(r.rating), 0) as rating,
	u.created_at
FROM users u
INNER JOIN suppliers s ON u.id = s.user_id
LEFT JOIN subscriptions sub ON u.id = sub.user_id AND sub.status = 'active'
LEFT JOIN products p ON s.id = p.supplier_id
LEFT JOIN orders o ON s.id = o.supplier_id AND o.payment_status = 'paid'
LEFT JOIN reviews r ON s.id = r.supplier_id
WHERE u.role = 'supplier'`

	args := []interface{}{}

	if status != "" && status != "all" {
		query += " AND COALESCE(u.status, 'active') = ?"
		args = append(args, status)
	}

	if subscription != "" && subscription != "all" {
		query += " AND COALESCE(sub.plan_type, 'free') = ?"
		args = append(args, subscription)
	}

	query += `
GROUP BY u.id, s.id, sub.plan_type
ORDER BY u.created_at DESC
LIMIT ? OFFSET ?`

	args = append(args, limit, offset)

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var suppliers []*AdminSupplier
	for rows.Next() {
		var sup AdminSupplier
		if err := rows.Scan(
			&sup.ID, &sup.CompanyName, &sup.ContactName, &sup.Email, &sup.Phone,
			&sup.Country, &sup.City, &sup.Verified, &sup.Status, &sup.Subscription,
			&sup.TotalProducts, &sup.TotalOrders, &sup.TotalRevenue, &sup.Rating, &sup.CreatedAt,
		); err != nil {
			return nil, err
		}
		suppliers = append(suppliers, &sup)
	}

	return suppliers, rows.Err()
}

// UpdateSupplierStatus changes a supplier's status
func (s *Service) UpdateSupplierStatus(ctx context.Context, supplierID string, input *UpdateSupplierStatusInput) error {
	query := `UPDATE users SET status = ?, updated_at = NOW() WHERE id = ? AND role = 'supplier'`
	result, err := s.db.ExecContext(ctx, query, input.Status, supplierID)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return fmt.Errorf("supplier not found")
	}

	return nil
}

// ListVerifications returns all verification requests for admin
func (s *Service) ListVerifications(ctx context.Context, limit, offset int, status string) ([]*AdminVerification, error) {
	query := `
SELECT 
	v.id,
	v.user_id,
	u.full_name as user_name,
	u.email as user_email,
	u.role as user_role,
	v.document_type,
	v.document_url,
	v.status,
	v.created_at,
	v.reviewed_at,
	v.reviewed_by,
	v.review_message
FROM verifications v
INNER JOIN users u ON v.user_id = u.id
WHERE 1=1`

	args := []interface{}{}

	if status != "" && status != "all" {
		query += " AND v.status = ?"
		args = append(args, status)
	}

	query += `
ORDER BY v.created_at DESC
LIMIT ? OFFSET ?`

	args = append(args, limit, offset)

	rows, err := s.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var verifications []*AdminVerification
	for rows.Next() {
		var v AdminVerification
		if err := rows.Scan(
			&v.ID, &v.UserID, &v.UserName, &v.UserEmail, &v.UserRole,
			&v.DocumentType, &v.DocumentURL, &v.Status, &v.SubmittedAt,
			&v.ReviewedAt, &v.ReviewedBy, &v.ReviewMessage,
		); err != nil {
			return nil, err
		}
		verifications = append(verifications, &v)
	}

	return verifications, rows.Err()
}

// ReviewVerification approves or rejects a verification request
func (s *Service) ReviewVerification(ctx context.Context, verificationID, adminID string, input *ReviewVerificationInput) error {
	query := `
UPDATE verifications 
SET status = ?, reviewed_by = ?, reviewed_at = NOW(), review_message = ?, updated_at = NOW()
WHERE id = ?`

	result, err := s.db.ExecContext(ctx, query, input.Status, adminID, input.Message, verificationID)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return fmt.Errorf("verification not found")
	}

	// If approved, update user's verified status
	if input.Status == "approved" {
		_, err = s.db.ExecContext(ctx, `
UPDATE users u 
INNER JOIN verifications v ON u.id = v.user_id 
SET u.verified = true 
WHERE v.id = ?`, verificationID)
		if err != nil {
			return err
		}
	}

	return nil
}
