package main

// Standalone demo seeder for MySQL.
//
// Usage (from backend/ directory, with GO111MODULE=on and proper env config):
//
//   go run ./migrations/demo_seeder.go up     # insert demo data
//   go run ./migrations/demo_seeder.go down   # delete demo data
//
// It uses the same config and MySQL connection code as the main API binary,
// and the same deterministic IDs as 009_demo_seed.{up,down}.sql so both
// approaches stay compatible.

import (
	"database/sql"
	"log"
	"os"

	mysql "github.com/go-sql-driver/mysql"

	"github.com/example/global-trade-hub/backend/internal/config"
	"github.com/example/global-trade-hub/backend/internal/database"
)

func main() {
	mode := "up"
	if len(os.Args) > 1 {
		mode = os.Args[1]
	}

	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	db, err := database.OpenMySQL(cfg)
	if err != nil {
		log.Fatalf("failed to connect to MySQL: %v", err)
	}
	defer db.Close()

	switch mode {
	case "up":
		if err := seedUp(db); err != nil {
			log.Fatalf("seed up failed: %v", err)
		}
		log.Println("seed up completed successfully")
	case "down":
		if err := seedDown(db); err != nil {
			log.Fatalf("seed down failed: %v", err)
		}
		log.Println("seed down completed successfully")
	default:
		log.Fatalf("unknown mode %q (expected \"up\" or \"down\")", mode)
	}
}

// execIgnoreMissing executes a statement and ignores "table does not exist" errors.
// This makes the seeder tolerant of optional tables like categories/subcategories
// that may not be present in all deployments.
func execIgnoreMissing(tx *sql.Tx, table, query string) (skipped bool, err error) {
	if _, err := tx.Exec(query); err != nil {
		if me, ok := err.(*mysql.MySQLError); ok && me.Number == 1146 {
			log.Printf("[demo-seed] table %s missing, skipping: %v", table, err)
			return true, nil
		}
		return false, err
	}
	log.Printf("[demo-seed] table %s seeded successfully", table)
	return false, nil
}

// seedUp inserts a small but complete set of demo data.
// All IDs are deterministic and match 009_demo_seed.up.sql.
func seedUp(db *sql.DB) error {
	log.Println("[demo-seed] starting seedUp")

	// Quick idempotency check: if our demo user already exists, assume seeding was done.
	var exists int
	if err := db.QueryRow(`SELECT COUNT(1) FROM users WHERE id = '11111111-1111-1111-1111-111111111111'`).Scan(&exists); err == nil {
		if exists > 0 {
			log.Println("[demo-seed] demo users already exist, assuming seed already applied; nothing to do")
			return nil
		}
	} else {
		if me, ok := err.(*mysql.MySQLError); ok && me.Number == 1146 {
			log.Printf("[demo-seed] users table not found during idempotency check, proceeding with inserts: %v", err)
		} else {
			log.Printf("[demo-seed] idempotency check failed (will still try to seed): %v", err)
		}
	}

	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		_ = tx.Rollback()
	}()

	// Users (buyer, supplier, market visitor, admin)
	if _, err := execIgnoreMissing(tx, "users", `
INSERT INTO users (id, email, password, full_name, role)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'buyer1@example.com',   '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi5CR5a9z1Qp/IrYFQEz5k.uq4/8F2W', 'Demo Buyer One',    'buyer'),
  ('11111111-1111-1111-1111-111111111112', 'supplier1@example.com','$2a$10$7EqJtq98hPqEX7fNZaFWoOhi5CR5a9z1Qp/IrYFQEz5k.uq4/8F2W', 'Demo Supplier One', 'supplier'),
  ('11111111-1111-1111-1111-111111111113', 'market1@example.com',  '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi5CR5a9z1Qp/IrYFQEz5k.uq4/8F2W', 'Demo Market User',  'market_visitor'),
  ('11111111-1111-1111-1111-111111111114', 'admin1@example.com',   '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi5CR5a9z1Qp/IrYFQEz5k.uq4/8F2W', 'Demo Admin User',   'admin')
ON DUPLICATE KEY UPDATE email = VALUES(email)`); err != nil {
		return err
	}

	// Suppliers
	if _, err := execIgnoreMissing(tx, "suppliers", `
INSERT INTO suppliers (
  id, user_id, company_name, contact_name, email, phone,
  country, city, address, logo, description,
  verified, status, subscription, rating,
  total_products, total_orders, total_revenue,
  response_rate, response_time, established, employees
)
VALUES
  ('22222222-2222-2222-2222-222222222221',
   '11111111-1111-1111-1111-111111111112',
   'Tehran Electronics Co.',
   'Ali Rezaei',
   'sales@tehranelectronics.com',
   '+98-21-1234-5678',
   'Iran',
   'Tehran',
   'No. 10, Example St, Tehran, Iran',
   NULL,
   'Leading supplier of consumer electronics for the MENA region.',
   TRUE,
   'active',
   'gold',
   4.6,
   3,
   25,
   125000.00,
   95.0,
   24,
   2015,
   '50-100'),
  ('22222222-2222-2222-2222-222222222222',
   '11111111-1111-1111-1111-111111111112',
   'Global Home Appliances',
   'Sara Ahmadi',
   'info@globalhome.com',
   '+44-20-1234-5678',
   'United Kingdom',
   'London',
   '221B Baker Street, London, UK',
   NULL,
   'Exporter of home appliances and smart home devices.',
   TRUE,
   'active',
   'silver',
   4.3,
   2,
   10,
   56000.00,
   90.0,
   36,
   2018,
   '20-50')
ON DUPLICATE KEY UPDATE company_name = VALUES(company_name)`); err != nil {
		return err
	}

	// Categories
	if _, err := execIgnoreMissing(tx, "categories", `
INSERT INTO categories (
  id, name_en, name_fa, name_ar,
  description_en, description_fa, description_ar,
  icon, image, gradient, accent,
  product_count, supplier_count, featured, trending
)
VALUES
  ('33333333-3333-3333-3333-333333333331',
   'Electronics',
   'الکترونیک',
   'إلكترونيات',
   'Phones, laptops, smart devices and accessories.',
   'گوشی، لپ‌تاپ، گجت‌های هوشمند و لوازم جانبی.',
   'هواتف، حواسيب، أجهزة ذكية وإكسسوارات.',
   'smartphone',
   NULL,
   'from-blue-500 to-cyan-500',
   'blue',
   3,
   1,
   TRUE,
   TRUE),
  ('33333333-3333-3333-3333-333333333332',
   'Home & Garden',
   'خانه و آشپزخانه',
   'المنزل والحديقة',
   'Home appliances and smart home products.',
   'لوازم خانگی و محصولات خانه هوشمند.',
   'أجهزة منزلية ومنتجات المنزل الذكي.',
   'home',
   NULL,
   'from-emerald-500 to-lime-500',
   'green',
   2,
   1,
   TRUE,
   FALSE)
ON DUPLICATE KEY UPDATE name_en = VALUES(name_en)`); err != nil {
		return err
	}

	// Subcategories
	if _, err := execIgnoreMissing(tx, "subcategories", `
INSERT INTO subcategories (
  id, category_id, name_en, name_fa, name_ar, icon, product_count, trending
)
VALUES
  ('44444444-4444-4444-4444-444444444441',
   '33333333-3333-3333-3333-333333333331',
   'Smartphones',
   'گوشی هوشمند',
   'هواتف ذكية',
   'smartphone',
   2,
   TRUE),
  ('44444444-4444-4444-4444-444444444442',
   '33333333-3333-3333-3333-333333333331',
   'Laptops',
   'لپ‌تاپ',
   'حواسيب محمولة',
   'laptop',
   1,
   FALSE),
  ('44444444-4444-4444-4444-444444444443',
   '33333333-3333-3333-3333-333333333332',
   'Kitchen Appliances',
   'لوازم آشپزخانه',
   'أجهزة المطبخ',
   'utensils-crossed',
   2,
   TRUE)
ON DUPLICATE KEY UPDATE name_en = VALUES(name_en)`); err != nil {
		return err
	}

	// Products
	if _, err := execIgnoreMissing(tx, "products", `
INSERT INTO products (
  id, supplier_id, category_id, subcategory_id,
  name, description, specifications, images,
  price, currency, moq, stock_quantity, unit,
  lead_time, rating, review_count, featured, status
)
VALUES
  ('55555555-5555-5555-5555-555555555551',
   '22222222-2222-2222-2222-222222222221',
   '33333333-3333-3333-3333-333333333331',
   '44444444-4444-4444-4444-444444444441',
   '5G Smartphone Pro 256GB',
   'Flagship 5G smartphone with AMOLED display and triple camera.',
   '{"color":"black","storage":"256GB","screen":"6.5-inch AMOLED"}',
   '["/images/demo/phone-1.jpg"]',
   799.00, 'USD', 10, 500, 'piece',
   14, 4.7, 10, TRUE, 'active'),
  ('55555555-5555-5555-5555-555555555552',
   '22222222-2222-2222-2222-222222222221',
   '33333333-3333-3333-3333-333333333331',
   '44444444-4444-4444-4444-444444444442',
   'Business Laptop 15\" 512GB',
   'Lightweight business laptop with long battery life.',
   '{"cpu":"Intel i7","ram":"16GB","storage":"512GB SSD"}',
   '["/images/demo/laptop-1.jpg"]',
   1199.00, 'USD', 5, 200, 'piece',
   21, 4.5, 5, TRUE, 'active'),
  ('55555555-5555-5555-5555-555555555553',
   '22222222-2222-2222-2222-222222222222',
   '33333333-3333-3333-3333-333333333332',
   '44444444-4444-4444-4444-444444444443',
   'Smart Air Fryer 5L',
   'Energy-efficient smart air fryer with app control.',
   '{"capacity":"5L","power":"1500W","color":"white"}',
   '["/images/demo/airfryer-1.jpg"]',
   199.00, 'USD', 20, 300, 'piece',
   10, 4.4, 3, TRUE, 'active')
ON DUPLICATE KEY UPDATE name = VALUES(name)`); err != nil {
		return err
	}

	// Orders
	if _, err := execIgnoreMissing(tx, "orders", `
INSERT INTO orders (
  id, order_number, buyer_id, supplier_id, product_id,
  quantity, unit_price, total_amount, currency,
  status, payment_status, payment_method,
  shipping_address, shipping_method, tracking_number
)
VALUES
  ('66666666-6666-6666-6666-666666666661',
   'DEMO-ORD-1001',
   '11111111-1111-1111-1111-111111111111',
   '22222222-2222-2222-2222-222222222221',
   '55555555-5555-5555-5555-555555555551',
   50, 799.00, 39950.00, 'USD',
   'confirmed', 'paid', 'bank_transfer',
   'Demo Buyer Address, Tehran, Iran',
   'air',
   'TRACK-DEMO-1001')
ON DUPLICATE KEY UPDATE order_number = VALUES(order_number)`); err != nil {
		return err
	}

	// RFQs
	if _, err := execIgnoreMissing(tx, "rfqs", `
INSERT INTO rfqs (
  id, buyer_id, product_id, product_name, product_image,
  supplier_id, quantity, unit, specifications, requirements,
  delivery_location, budget, currency, status
)
VALUES
  ('77777777-7777-7777-7777-777777777771',
   '11111111-1111-1111-1111-111111111111',
   '55555555-5555-5555-5555-555555555553',
   'Bulk order for Smart Air Fryer 5L',
   '/images/demo/airfryer-1.jpg',
   '22222222-2222-2222-2222-222222222222',
   200, 'piece',
   '{"color":"white","plug":"EU"}',
   '{"incoterm":"FOB","inspection":"required"}',
   'Bandar Abbas, Iran',
   38000.00, 'USD',
   'active')
ON DUPLICATE KEY UPDATE product_name = VALUES(product_name)`); err != nil {
		return err
	}

	// RFQ Responses
	if _, err := execIgnoreMissing(tx, "rfq_responses", `
INSERT INTO rfq_responses (
  id, rfq_id, supplier_id,
  unit_price, total_price, currency,
  moq, estimated_delivery, payment_terms,
  specifications, message, status
)
VALUES
  ('88888888-8888-8888-8888-888888888881',
   '77777777-7777-7777-7777-777777777771',
   '22222222-2222-2222-2222-222222222222',
   185.00, 37000.00, 'USD',
   150, 25,
   '30% advance, 70% before shipment',
   '{"warranty":"12 months"}',
   'Competitive offer with flexible payment terms.',
   'pending')
ON DUPLICATE KEY UPDATE total_price = VALUES(total_price)`); err != nil {
		return err
	}

	// Notifications
	if _, err := execIgnoreMissing(tx, "notifications", `
INSERT INTO notifications (
  id, user_id, type, priority,
  title, description, icon, action_url, action_label
)
VALUES
  ('99999999-9999-9999-9999-999999999991',
   '11111111-1111-1111-1111-111111111111',
   'business', 'high',
   'New RFQ Response Received',
   'Your RFQ for Smart Air Fryer has a new response.',
   'mail',
   '/rfq/responses?rfqId=77777777-7777-7777-7777-777777777771',
   'View response'),
  ('99999999-9999-9999-9999-999999999992',
   '11111111-1111-1111-1111-111111111114',
   'system', 'medium',
   'Demo Admin Panel Ready',
   'Sample analytics and demo data have been loaded.',
   'settings',
   '/admin',
   'Open admin')
ON DUPLICATE KEY UPDATE title = VALUES(title)`); err != nil {
		return err
	}

	// Verifications
	if _, err := execIgnoreMissing(tx, "verifications", `
INSERT INTO verifications (
  id, supplier_id, status,
  full_name, nationality, id_type, id_number,
  email_verified, phone_verified
)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
   '22222222-2222-2222-2222-222222222221',
   'verified',
   'Ali Rezaei',
   'Iran',
   'passport',
   'P12345678',
   TRUE,
   TRUE)
ON DUPLICATE KEY UPDATE status = VALUES(status)`); err != nil {
		return err
	}

	// Subscriptions
	if _, err := execIgnoreMissing(tx, "subscriptions", `
INSERT INTO subscriptions (
  id, supplier_id, plan, status,
  amount, currency, payment_method
)
VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1',
   '22222222-2222-2222-2222-222222222221',
   'gold', 'active',
   299.00, 'USD', 'credit_card')
ON DUPLICATE KEY UPDATE plan = VALUES(plan)`); err != nil {
		return err
	}

	// Messages
	if _, err := execIgnoreMissing(tx, "messages", `
INSERT INTO messages (
  id, conversation_id, sender_id, receiver_id,
  subject, body, attachments
)
VALUES
  ('cccccccc-cccc-cccc-cccc-ccccccccccc1',
   'demo-conv-1',
   '11111111-1111-1111-1111-111111111111',
   '11111111-1111-1111-1111-111111111112',
   'Inquiry about 5G Smartphone Pro 256GB',
   'Hello, we are interested in bulk purchasing this model. Please share your best price and lead time.',
   '[]')
ON DUPLICATE KEY UPDATE subject = VALUES(subject)`); err != nil {
		return err
	}

	// Reviews
	if _, err := execIgnoreMissing(tx, "reviews", `
INSERT INTO reviews (
  id, product_id, supplier_id, reviewer_id,
  rating, title, comment, verified_purchase, helpful_count
)
VALUES
  ('dddddddd-dddd-dddd-dddd-ddddddddddd1',
   '55555555-5555-5555-5555-555555555551',
   '22222222-2222-2222-2222-222222222221',
   '11111111-1111-1111-1111-111111111111',
   5,
   'Excellent quality and fast shipping',
   'The phones arrived on time and matched the specifications exactly.',
   TRUE,
   3)
ON DUPLICATE KEY UPDATE rating = VALUES(rating)`); err != nil {
		return err
	}

	// Favorites
	if _, err := execIgnoreMissing(tx, "favorites", `
INSERT INTO favorites (
  id, user_id, product_id
)
VALUES
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1',
   '11111111-1111-1111-1111-111111111111',
   '55555555-5555-5555-5555-555555555551')
ON DUPLICATE KEY UPDATE product_id = VALUES(product_id)`); err != nil {
		return err
	}

	// Search history
	if _, err := execIgnoreMissing(tx, "search_history", `
INSERT INTO search_history (
  id, user_id, query, search_type, filters, result_count
)
VALUES
  ('ffffffff-ffff-ffff-ffff-fffffffffff1',
   '11111111-1111-1111-1111-111111111111',
   'smartphone 5G supplier Tehran',
   'text',
   '{"category":"Electronics","country":"Iran"}',
   12)
ON DUPLICATE KEY UPDATE query = VALUES(query)`); err != nil {
		return err
	}

	if err := tx.Commit(); err != nil {
		return err
	}
	log.Println("[demo-seed] seedUp completed successfully")
	return nil
}

// seedDown deletes all the deterministic demo rows inserted by seedUp.
func seedDown(db *sql.DB) error {
	log.Println("[demo-seed] starting seedDown")
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		_ = tx.Rollback()
	}()

	// Child tables first
	if _, err := execIgnoreMissing(tx, "favorites", `DELETE FROM favorites WHERE id IN ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1')`); err != nil {
		return err
	}
	if _, err := execIgnoreMissing(tx, "reviews", `DELETE FROM reviews WHERE id IN ('dddddddd-dddd-dddd-dddd-ddddddddddd1')`); err != nil {
		return err
	}
	if _, err := execIgnoreMissing(tx, "messages", `DELETE FROM messages WHERE id IN ('cccccccc-cccc-cccc-cccc-ccccccccccc1')`); err != nil {
		return err
	}
	if _, err := execIgnoreMissing(tx, "subscriptions", `DELETE FROM subscriptions WHERE id IN ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1')`); err != nil {
		return err
	}
	if _, err := execIgnoreMissing(tx, "verifications", `DELETE FROM verifications WHERE id IN ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1')`); err != nil {
		return err
	}
	if _, err := execIgnoreMissing(tx, "notifications", `
DELETE FROM notifications
WHERE id IN (
  '99999999-9999-9999-9999-999999999991',
  '99999999-9999-9999-9999-999999999992'
)`); err != nil {
		return err
	}
	if _, err := execIgnoreMissing(tx, "rfq_responses", `DELETE FROM rfq_responses WHERE id IN ('88888888-8888-8888-8888-888888888881')`); err != nil {
		return err
	}
	if _, err := execIgnoreMissing(tx, "rfqs", `DELETE FROM rfqs WHERE id IN ('77777777-7777-7777-7777-777777777771')`); err != nil {
		return err
	}
	if _, err := execIgnoreMissing(tx, "orders", `DELETE FROM orders WHERE id IN ('66666666-6666-6666-6666-666666666661')`); err != nil {
		return err
	}
	if _, err := execIgnoreMissing(tx, "search_history", `DELETE FROM search_history WHERE id IN ('ffffffff-ffff-ffff-ffff-fffffffffff1')`); err != nil {
		return err
	}

	// Products and taxonomy
	if _, err := execIgnoreMissing(tx, "products", `
DELETE FROM products
WHERE id IN (
  '55555555-5555-5555-5555-555555555551',
  '55555555-5555-5555-5555-555555555552',
  '55555555-5555-5555-5555-555555555553'
)`); err != nil {
		return err
	}
	if _, err := execIgnoreMissing(tx, "subcategories", `
DELETE FROM subcategories
WHERE id IN (
  '44444444-4444-4444-4444-444444444441',
  '44444444-4444-4444-4444-444444444442',
  '44444444-4444-4444-4444-444444444443'
)`); err != nil {
		return err
	}
	if _, err := execIgnoreMissing(tx, "categories", `
DELETE FROM categories
WHERE id IN (
  '33333333-3333-3333-3333-333333333331',
  '33333333-3333-3333-3333-333333333332'
)`); err != nil {
		return err
	}

	// Suppliers
	if _, err := execIgnoreMissing(tx, "suppliers", `
DELETE FROM suppliers
WHERE id IN (
  '22222222-2222-2222-2222-222222222221',
  '22222222-2222-2222-2222-222222222222'
)`); err != nil {
		return err
	}

	// Users
	if _, err := execIgnoreMissing(tx, "users", `
DELETE FROM users
WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111112',
  '11111111-1111-1111-1111-111111111113',
  '11111111-1111-1111-1111-111111111114'
)`); err != nil {
		return err
	}

	if err := tx.Commit(); err != nil {
		return err
	}
	log.Println("[demo-seed] seedDown completed successfully")
	return nil
}
