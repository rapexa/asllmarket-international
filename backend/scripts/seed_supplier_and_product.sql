-- =============================================================================
-- اسکریپت seed: یک فروشنده (Supplier) + دو محصول
-- بعد از اجرا می‌توانید این آدرس‌ها را باز کنید:
--   صفحه فروشنده:  /suppliers/seed-sup-01
--   صفحه محصول ۱: /products/seed-prod-01
--   صفحه محصول ۲: /products/seed-prod-02
--
-- پیش‌نیاز: دسته‌بندی با id=1 و زیردسته 1-1 باید وجود داشته باشد
-- (migrations 002 یا 012 را اجرا کرده باشید).
-- رمز همه یوزرهای زیر: password (bcrypt)
-- =============================================================================

-- یوزر فروشنده (رمز: password)
INSERT INTO users (id, email, password_hash, full_name, phone, role, created_at, updated_at)
VALUES (
  'seed-user-supplier-01',
  'seller@asllmarket.com',
  '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi5CR5a9z1Qp/IrYFQEz5k.uq4/8F2W',
  'رضا فروشنده',
  '+98-912-1234567',
  'supplier',
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- فروشنده (صفحه فروشنده)
INSERT INTO suppliers (
  id, user_id, company_name, contact_name, email, phone,
  country, city, address, description,
  verified, status, subscription, rating,
  total_products, total_orders, total_revenue,
  response_rate, response_time, established, employees,
  created_at, updated_at
)
VALUES (
  'seed-sup-01',
  'seed-user-supplier-01',
  'شرکت نمونه تجارت بین‌الملل',
  'رضا فروشنده',
  'seller@asllmarket.com',
  '+98-912-1234567',
  'Iran',
  'Tehran',
  'تهران، خیابان نمونه، پلاک ۱۰',
  'تأمین‌کننده پوشاک و الکترونیک با سال‌ها تجربه در صادرات به منطقه MENA.',
  TRUE,
  'active',
  'gold',
  4.7,
  2,
  120,
  45000.00,
  96.0,
  12,
  2018,
  '20-50',
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE company_name = VALUES(company_name);

-- محصول ۱ (دسته پوشاک)
INSERT INTO products (
  id, supplier_id, category_id, subcategory_id,
  name, description, specifications, images,
  price, currency, moq, stock_quantity, unit,
  lead_time, rating, review_count, featured, status,
  created_at, updated_at
)
VALUES (
  'seed-prod-01',
  'seed-sup-01',
  '1',
  '1-1',
  'تیشرت پنبه‌ای مردانه با چاپ',
  'تیشرت با پارچه ۱۸۰ گرم، مناسب چاپ و برندینگ، رنگ‌های متنوع.',
  'جنس: 100% پنبه، گرم: 180، سایز: S تا XXL',
  '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"]',
  4.99,
  'USD',
  100,
  5000,
  'piece',
  10,
  4.6,
  24,
  TRUE,
  'active',
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- محصول ۲
INSERT INTO products (
  id, supplier_id, category_id, subcategory_id,
  name, description, specifications, images,
  price, currency, moq, stock_quantity, unit,
  lead_time, rating, review_count, featured, status,
  created_at, updated_at
)
VALUES (
  'seed-prod-02',
  'seed-sup-01',
  '1',
  '1-2',
  'کفش ورزشی سبک مردانه',
  'کفش ورزشی با رویه مشبک و کفی لاستیکی، مناسب دو و پیاده‌روی.',
  'سایز: 39-46، رنگ: مشکی/سفید/آبی',
  '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"]',
  11.50,
  'USD',
  50,
  2000,
  'pair',
  14,
  4.8,
  18,
  TRUE,
  'active',
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- به‌روزرسانی تعداد محصولات فروشنده
UPDATE suppliers SET total_products = (
  SELECT COUNT(*) FROM products WHERE supplier_id = 'seed-sup-01'
) WHERE id = 'seed-sup-01';

SELECT 'Done. Supplier: seed-sup-01 | Products: seed-prod-01, seed-prod-02' AS result;
