-- Revert to original 5 categories from 002_seed_data
DELETE FROM subcategories;
DELETE FROM categories;

INSERT INTO categories (id, name_en, name_fa, name_ar, description_en, description_fa, description_ar, icon, product_count, supplier_count, featured, trending) VALUES
('1', 'Apparel & Accessories', 'پوشاک و لوازم جانبی', 'الملابس والإكسسوارات', 'Global fashion suppliers & manufacturers', 'تأمین‌کنندگان و تولیدکنندگان جهانی مد', 'الموردون والمصنعون العالميون للموضة', '👔', 250000, 18000, TRUE, TRUE),
('2', 'Electronics', 'الکترونیک', 'إلكترونيات', 'Consumer & industrial electronics', 'الکترونیک مصرفی و صنعتی', 'الإلكترونيات الاستهلاكية والصناعية', '📱', 180000, 12000, TRUE, TRUE),
('3', 'Home & Garden', 'خانه و باغ', 'المنزل والحديقة', 'Furniture, decor & garden supplies', 'مبلمان، دکور و لوازم باغبانی', 'الأثاث والديكور ولوازم الحدائق', '🏡', 120000, 8500, TRUE, FALSE),
('4', 'Machinery', 'ماشین‌آلات', 'الآلات', 'Industrial machinery & equipment', 'ماشین‌آلات و تجهیزات صنعتی', 'الآلات والمعدات الصناعية', '⚙️', 95000, 6200, TRUE, TRUE),
('5', 'Automotive', 'خودرو', 'السيارات', 'Auto parts & accessories', 'قطعات و لوازم جانبی خودرو', 'قطع غيار وملحقات السيارات', '🚗', 85000, 5500, FALSE, TRUE);

INSERT INTO subcategories (id, category_id, name_en, name_fa, name_ar, product_count, trending) VALUES
('1-1', '1', 'Clothing', 'پوشاک', 'ملابس', 150000, TRUE),
('1-2', '1', 'Shoes', 'کفش', 'أحذية', 50000, TRUE),
('1-3', '1', 'Bags & Accessories', 'کیف و اکسسوری', 'حقائب وإكسسوارات', 50000, FALSE),
('2-1', '2', 'Smartphones', 'گوشی هوشمند', 'هواتف ذكية', 80000, TRUE),
('2-2', '2', 'Computers', 'کامپیوتر', 'حواسيب', 60000, TRUE),
('2-3', '2', 'Consumer Electronics', 'الکترونیک مصرفی', 'إلكترونيات استهلاكية', 40000, FALSE);
