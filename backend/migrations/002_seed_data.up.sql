-- Seed initial data for development/testing

-- Insert sample categories
INSERT INTO categories (id, name_en, name_fa, name_ar, description_en, description_fa, description_ar, icon, product_count, supplier_count, featured, trending) VALUES
('1', 'Apparel & Accessories', 'پوشاک و لوازم جانبی', 'الملابس والإكسسوارات', 'Global fashion suppliers & manufacturers', 'تأمین‌کنندگان و تولیدکنندگان جهانی مد', 'الموردون والمصنعون العالميون للموضة', '👔', 250000, 18000, TRUE, TRUE),
('2', 'Electronics', 'الکترونیک', 'إلكترونيات', 'Consumer & industrial electronics', 'الکترونیک مصرفی و صنعتی', 'الإلكترونيات الاستهلاكية والصناعية', '📱', 180000, 12000, TRUE, TRUE),
('3', 'Home & Garden', 'خانه و باغ', 'المنزل والحديقة', 'Furniture, decor & garden supplies', 'مبلمان، دکور و لوازم باغبانی', 'الأثاث والديكور ولوازم الحدائق', '🏡', 120000, 8500, TRUE, FALSE),
('4', 'Machinery', 'ماشین‌آلات', 'الآلات', 'Industrial machinery & equipment', 'ماشین‌آلات و تجهیزات صنعتی', 'الآلات والمعدات الصناعية', '⚙️', 95000, 6200, TRUE, TRUE),
('5', 'Automotive', 'خودرو', 'السيارات', 'Auto parts & accessories', 'قطعات و لوازم جانبی خودرو', 'قطع غيار وملحقات السيارات', '🚗', 85000, 5500, FALSE, TRUE);

-- Insert sample subcategories
INSERT INTO subcategories (id, category_id, name_en, name_fa, name_ar, product_count, trending) VALUES
('1-1', '1', 'Clothing', 'پوشاک', 'ملابس', 150000, TRUE),
('1-2', '1', 'Shoes', 'کفش', 'أحذية', 50000, TRUE),
('1-3', '1', 'Bags & Accessories', 'کیف و اکسسوری', 'حقائب وإكسسوارات', 50000, FALSE),
('2-1', '2', 'Smartphones', 'گوشی هوشمند', 'هواتف ذكية', 80000, TRUE),
('2-2', '2', 'Computers', 'کامپیوتر', 'حواسيب', 60000, TRUE),
('2-3', '2', 'Consumer Electronics', 'الکترونیک مصرفی', 'إلكترونيات استهلاكية', 40000, FALSE);

-- Insert admin user (password: Admin123!)
INSERT INTO users (id, email, password_hash, full_name, phone, role, created_at, updated_at) VALUES
('admin-001', 'admin@globaltradehub.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.2qYuhO', 'System Admin', '+1234567890', 'admin', NOW(), NOW());

-- Insert sample buyer
INSERT INTO users (id, email, password_hash, full_name, phone, role, created_at, updated_at) VALUES
('buyer-001', 'buyer@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.2qYuhO', 'John Buyer', '+1234567891', 'buyer', NOW(), NOW());

-- Insert sample supplier users
INSERT INTO users (id, email, password_hash, full_name, phone, role, created_at, updated_at) VALUES
('supplier-001', 'supplier1@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.2qYuhO', 'Jane Supplier', '+1234567892', 'supplier', NOW(), NOW()),
('supplier-002', 'supplier2@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIq.2qYuhO', 'Bob Manufacturer', '+1234567893', 'supplier', NOW(), NOW());

-- Insert sample suppliers
INSERT INTO suppliers (id, user_id, company_name, contact_name, email, phone, country, city, address, description, verified, status, subscription, rating, total_products, total_orders, total_revenue, response_rate, response_time, established, employees, created_at, updated_at) VALUES
('sup-001', 'supplier-001', 'Global Fashion Inc.', 'Jane Supplier', 'supplier1@example.com', '+1234567892', 'USA', 'New York', '123 Fashion Ave', 'Leading supplier of quality apparel', TRUE, 'active', 'gold', 4.8, 150, 500, 250000.00, 95.5, 120, 2015, '50-100', NOW(), NOW()),
('sup-002', 'supplier-002', 'Tech Manufacturing Ltd.', 'Bob Manufacturer', 'supplier2@example.com', '+1234567893', 'China', 'Shenzhen', '456 Tech Park', 'Premium electronics manufacturer', TRUE, 'active', 'diamond', 4.9, 200, 800, 500000.00, 98.0, 60, 2010, '200-500', NOW(), NOW());

-- Insert sample products
INSERT INTO products (id, supplier_id, category_id, subcategory_id, name, description, specifications, images, price, currency, moq, stock_quantity, unit, lead_time, rating, review_count, featured, status, created_at, updated_at) VALUES
('prod-001', 'sup-001', '1', '1-1', 'Premium Cotton T-Shirt', 'High-quality 100% cotton t-shirt for wholesale', '100% cotton, 180gsm, available in 20 colors', '[\"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800\"]', 5.99, 'USD', 500, 10000, 'piece', 7, 4.7, 85, TRUE, 'active', NOW(), NOW()),
('prod-002', 'sup-001', '1', '1-2', 'Running Shoes', 'Professional athletic shoes for bulk orders', 'Breathable mesh, rubber sole, sizes 36-46', '[\"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800\"]', 12.50, 'USD', 200, 5000, 'pair', 14, 4.8, 120, TRUE, 'active', NOW(), NOW()),
('prod-003', 'sup-002', '2', '2-1', 'Smartphone Case', 'Universal smartphone protective case', 'TPU material, shock-proof, multiple colors', '[\"https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800\"]', 2.99, 'USD', 1000, 50000, 'piece', 5, 4.6, 200, TRUE, 'active', NOW(), NOW());

-- Insert sample notification for buyer
INSERT INTO notifications (id, user_id, type, priority, title, description, icon, action_url, action_label, `read`, created_at) VALUES
('notif-001', 'buyer-001', 'system', 'medium', 'Welcome to Global Trade Hub', 'Thank you for joining our platform. Start exploring products!', 'Bell', '/products', 'Browse Products', FALSE, NOW());

-- All passwords are: Admin123!
