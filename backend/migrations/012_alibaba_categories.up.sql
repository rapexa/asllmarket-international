-- Alibaba-style categories (deep copy from alibaba.com)
-- First: point existing products to category 1 before we replace categories
UPDATE products SET category_id = '1', subcategory_id = NULL WHERE category_id IN ('1','2','3','4','5');
DELETE FROM subcategories;
DELETE FROM categories;

INSERT INTO categories (id, name_en, name_fa, name_ar, description_en, description_fa, description_ar, icon, product_count, supplier_count, featured, trending) VALUES
('1', 'Apparel & Accessories', 'پوشاک و لوازم جانبی', 'الملابس والإكسسوارات', 'Global fashion suppliers & manufacturers', 'تأمین‌کنندگان و تولیدکنندگان جهانی مد', 'الموردون والمصنعون العالميون للموضة', '👔', 250000, 18000, TRUE, TRUE),
('2', 'Consumer Electronics', 'الکترونیک مصرفی', 'الإلكترونيات الاستهلاكية', 'Smart devices & technology', 'دستگاه‌های هوشمند و فناوری', 'الأجهزة الذكية والتكنولوجيا', '📱', 180000, 12000, TRUE, TRUE),
('3', 'Sports & Entertainment', 'ورزش و سرگرمی', 'الرياضة والترفيه', 'Fitness & recreational products', 'تجهیزات ورزشی و محصولات تفریحی', 'معدات اللياقة والمنتجات الترفيهية', '⚽', 95000, 7500, TRUE, TRUE),
('4', 'Beauty', 'زیبایی', 'الجمال', 'Cosmetics & skincare', 'آرایشی و مراقبت از پوست', 'التجميل والعناية بالبشرة', '💄', 85000, 6500, TRUE, TRUE),
('5', 'Jewelry, Eyewear & Watches', 'جواهرات، عینک و ساعت', 'المجوهرات والنظارات والساعات', 'Jewelry & timepieces', 'جواهرات و ساعت', 'المجوهرات والساعات', '⌚', 65000, 5000, TRUE, TRUE),
('6', 'Home & Garden', 'خانه و باغ', 'المنزل والحديقة', 'Furniture, decor & garden', 'مبلمان، دکور و باغ', 'الأثاث والديكور والحديقة', '🏠', 120000, 8500, TRUE, FALSE),
('7', 'Sportswear & Outdoor Apparel', 'پوشاک ورزشی و فضای باز', 'ملابس رياضية وخارجية', 'Athletic & outdoor wear', 'پوشاک ورزشی و فضای باز', 'ملابس رياضية وخارجية', '👕', 75000, 6000, TRUE, TRUE),
('8', 'Shoes & Accessories', 'کفش و لوازم جانبی', 'أحذية وإكسسوارات', 'Footwear & accessories', 'کفش و اکسسوری', 'أحذية وإكسسوارات', '👟', 55000, 4500, FALSE, TRUE),
('9', 'Luggage, Bags & Cases', 'چمدان، کیف و کاور', 'الأمتعة والحقائب', 'Bags & luggage', 'کیف و چمدان', 'حقائب وأمتعة', '👜', 48000, 4000, FALSE, TRUE),
('10', 'Packaging & Printing', 'بسته‌بندی و چاپ', 'التعبئة والطباعة', 'Packaging materials & printing', 'مواد بسته‌بندی و چاپ', 'مواد التعبئة والطباعة', '📦', 68000, 5500, FALSE, FALSE),
('11', 'Parents, Kids & Toys', 'کودک و اسباب‌بازی', 'الأطفال والألعاب', 'Kids & toys', 'کودک و اسباب‌بازی', 'أطفال وألعاب', '🧸', 72000, 5800, TRUE, TRUE),
('12', 'Personal Care & Home Care', 'مراقبت شخصی و خانه', 'العناية الشخصية والمنزلية', 'Personal & home care', 'مراقبت شخصی و خانه', 'العناية الشخصية والمنزلية', '🧴', 62000, 5000, FALSE, FALSE),
('13', 'Health & Medical', 'سلامت و پزشکی', 'الصحة والطبية', 'Health & medical supplies', 'سلامت و پزشکی', 'الصحة والطبية', '💊', 58000, 4700, FALSE, TRUE),
('14', 'Gifts & Crafts', 'هدایا و صنایع‌دستی', 'الهدايا والحرف', 'Gifts & handmade', 'هدایا و صنایع‌دستی', 'الهدايا والحرف', '🎁', 45000, 3800, FALSE, FALSE),
('15', 'Pet Supplies', 'لوازم حیوانات خانگی', 'مستلزمات الحيوانات الأليفة', 'Pet food & accessories', 'غذای حیوانات و لوازم', 'طعام وإكسسوارات الحيوانات', '🐶', 38000, 3200, FALSE, TRUE),
('16', 'School & Office Supplies', 'لوازم مدرسه و اداری', 'المستلزمات المدرسية والمكتبية', 'Stationery & office', 'لوازم التحریر و اداری', 'القرطاسية والمكتب', '📚', 62000, 5000, FALSE, FALSE),
('17', 'Industrial Machinery', 'ماشین‌آلات صنعتی', 'الآلات الصناعية', 'Industrial equipment', 'تجهیزات صنعتی', 'المعدات الصناعية', '⚙️', 95000, 6200, TRUE, TRUE),
('18', 'Commercial Equipment & Machinery', 'تجهیزات و ماشین‌آلات تجاری', 'معدات وآلات تجارية', 'Commercial machinery', 'ماشین‌آلات تجاری', 'آلات تجارية', '🏭', 82000, 5500, TRUE, FALSE),
('19', 'Construction & Building Machinery', 'ماشین‌آلات ساختمانی', 'آلات البناء والإنشاء', 'Construction equipment', 'تجهیزات ساختمانی', 'معدات البناء', '🏗️', 78000, 5200, TRUE, TRUE),
('20', 'Construction & Real Estate', 'ساخت و املاک', 'البناء والعقارات', 'Construction & real estate', 'ساخت و املاک', 'البناء والعقارات', '🏢', 45000, 3500, FALSE, FALSE),
('21', 'Furniture', 'مبلمان', 'الأثاث', 'Furniture & furnishings', 'مبلمان و اثاثیه', 'الأثاث والأثاث', '🪑', 88000, 6800, TRUE, TRUE),
('22', 'Lights & Lighting', 'روشنایی', 'الإضاءة', 'Lighting solutions', 'روشنایی', 'الإضاءة', '💡', 52000, 4200, FALSE, FALSE),
('23', 'Home Appliances', 'لوازم خانگی', 'الأجهزة المنزلية', 'Home appliances', 'لوازم خانگی', 'الأجهزة المنزلية', '🔌', 95000, 7200, TRUE, TRUE),
('24', 'Automotive Supplies & Tools', 'لوازم و ابزار خودرو', 'مستلزمات وأدوات السيارات', 'Auto supplies & tools', 'لوازم و ابزار خودرو', 'مستلزمات وأدوات السيارات', '🔧', 85000, 5500, TRUE, TRUE),
('25', 'Vehicle Parts & Accessories', 'قطعات و لوازم جانبی خودرو', 'قطع وإكسسوارات المركبات', 'Vehicle parts', 'قطعات خودرو', 'قطع المركبات', '🚗', 92000, 6000, TRUE, TRUE),
('26', 'Tools & Hardware', 'ابزار و سخت‌افزار', 'أدوات ومعدات', 'Tools & hardware', 'ابزار و سخت‌افزار', 'أدوات ومعدات', '🔨', 88000, 5800, TRUE, FALSE),
('27', 'Renewable Energy', 'انرژی تجدیدپذیر', 'الطاقة المتجددة', 'Solar & renewable', 'خورشیدی و تجدیدپذیر', 'الشمسية والمتجددة', '☀️', 55000, 4500, TRUE, TRUE),
('28', 'Electrical Equipment & Supplies', 'تجهیزات و لوازم الکتریکی', 'معدات ومستلزمات كهربائية', 'Electrical equipment', 'تجهیزات الکتریکی', 'معدات كهربائية', '⚡', 72000, 5500, FALSE, FALSE),
('29', 'Safety & Security', 'ایمنی و امنیت', 'السلامة والأمن', 'Safety & security', 'ایمنی و امنیت', 'السلامة والأمن', '🛡️', 48000, 4000, FALSE, FALSE),
('30', 'Material Handling', 'جابجایی مواد', 'معالجة المواد', 'Material handling', 'جابجایی مواد', 'معالجة المواد', '📦', 42000, 3500, FALSE, FALSE),
('31', 'Testing Instrument & Equipment', 'ابزار و تجهیزات آزمایشگاهی', 'أدوات ومعدات الاختبار', 'Testing equipment', 'تجهیزات آزمایشگاهی', 'معدات الاختبار', '🔬', 35000, 2800, FALSE, FALSE),
('32', 'Power Transmission', 'انتقال قدرت', 'نقل الطاقة', 'Power transmission', 'انتقال قدرت', 'نقل الطاقة', '⚙️', 38000, 3000, FALSE, FALSE),
('33', 'Electronic Components', 'قطعات الکترونیکی', 'المكونات الإلكترونية', 'Electronic components', 'قطعات الکترونیکی', 'المكونات الإلكترونية', '🔌', 125000, 8500, TRUE, TRUE),
('34', 'Vehicles & Transportation', 'خودرو و حمل‌ونقل', 'المركبات والنقل', 'Vehicles & transport', 'خودرو و حمل‌ونقل', 'المركبات والنقل', '🚚', 65000, 4800, TRUE, TRUE),
('35', 'Agriculture, Food & Beverage', 'کشاورزی، غذا و نوشیدنی', 'الزراعة والطعام والمشروبات', 'Agriculture & food', 'کشاورزی و غذا', 'الزراعة والطعام', '🌾', 110000, 9000, TRUE, TRUE),
('36', 'Raw Materials', 'مواد اولیه', 'المواد الخام', 'Raw materials', 'مواد اولیه', 'المواد الخام', '🧪', 85000, 7000, FALSE, FALSE),
('37', 'Fabrication Services', 'خدمات ساخت', 'خدمات التصنيع', 'Fabrication services', 'خدمات ساخت', 'خدمات التصنيع', '🏭', 32000, 2500, FALSE, FALSE),
('38', 'Service', 'خدمات', 'خدمات', 'Professional services', 'خدمات حرفه‌ای', 'خدمات مهنية', '📋', 28000, 2200, FALSE, FALSE);

-- Subcategories for top categories (Alibaba-style)
INSERT INTO subcategories (id, category_id, name_en, name_fa, name_ar, product_count, trending) VALUES
('1-1', '1', 'Clothing', 'پوشاک', 'ملابس', 150000, TRUE),
('1-2', '1', 'Shoes', 'کفش', 'أحذية', 50000, TRUE),
('1-3', '1', 'Bags & Accessories', 'کیف و اکسسوری', 'حقائب وإكسسوارات', 50000, FALSE),
('2-1', '2', 'Smartphones', 'گوشی هوشمند', 'هواتف ذكية', 80000, TRUE),
('2-2', '2', 'Computers', 'کامپیوتر', 'حواسيب', 60000, TRUE),
('2-3', '2', 'Wearables', 'پوشیدنی', 'قابلة للارتداء', 40000, TRUE),
('6-1', '6', 'Furniture', 'مبلمان', 'الأثاث', 55000, TRUE),
('6-2', '6', 'Home Decor', 'دکور خانه', 'ديكور المنزل', 45000, FALSE),
('17-1', '17', 'Manufacturing', 'تولید', 'التصنيع', 35000, TRUE),
('17-2', '17', 'Construction', 'ساختمانی', 'البناء', 40000, TRUE);
