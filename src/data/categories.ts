// Complete Category Structure based on Alibaba.com
// This file contains all category data for ASL Market International

export interface SubCategory {
  id: string;
  nameEn: string;
  nameFa: string;
  nameAr: string;
  productCount: number;
  icon?: string;
  trending?: boolean;
}

export interface Category {
  id: string;
  nameEn: string;
  nameFa: string;
  nameAr: string;
  icon: string;
  descriptionEn: string;
  descriptionFa: string;
  descriptionAr: string;
  productCount: number;
  supplierCount: number;
  subcategories: SubCategory[];
  featured?: boolean;
  trending?: boolean;
  image: string;
  gradient: string;
  accent: string;
}

export const categories: Category[] = [
  {
    id: '1',
    nameEn: 'Apparel & Accessories',
    nameFa: 'پوشاک و لوازم جانبی',
    nameAr: 'الملابس والإكسسوارات',
    icon: '👔',
    descriptionEn: 'Global fashion suppliers & manufacturers',
    descriptionFa: 'تأمین‌کنندگان و تولیدکنندگان جهانی مد و پوشاک',
    descriptionAr: 'الموردون والمصنعون العالميون للموضة والملابس',
    productCount: 250000,
    supplierCount: 18000,
    featured: true,
    trending: true,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=90',
    gradient: 'from-amber-900/80 via-amber-800/70 to-amber-700/80',
    accent: 'amber',
    subcategories: [
      { id: '1-1', nameEn: 'Clothing (Men, Women, Kids)', nameFa: 'پوشاک (مردانه، زنانه، بچه‌گانه)', nameAr: 'ملابس (رجالي، نسائي، أطفال)', productCount: 120000, icon: '👕', trending: true },
      { id: '1-2', nameEn: 'Shoes & Footwear', nameFa: 'کفش و پاپوش', nameAr: 'أحذية وأحذية', productCount: 65000, icon: '👟', trending: true },
      { id: '1-3', nameEn: 'Bags & Luggage', nameFa: 'کیف و چمدان', nameAr: 'حقائب وأمتعة', productCount: 35000, icon: '👜' },
      { id: '1-4', nameEn: 'Jewelry & Accessories', nameFa: 'جواهرات و لوازم جانبی', nameAr: 'مجوهرات وإكسسوارات', productCount: 20000, icon: '💍' },
      { id: '1-5', nameEn: 'Eyewear & Watches', nameFa: 'عینک و ساعت', nameAr: 'نظارات وساعات', productCount: 10000, icon: '⌚' },
    ],
  },
  {
    id: '2',
    nameEn: 'Consumer Electronics',
    nameFa: 'الکترونیک مصرفی',
    nameAr: 'الإلكترونيات الاستهلاكية',
    icon: '📱',
    descriptionEn: 'Smart devices & technology products',
    descriptionFa: 'دستگاه‌های هوشمند و محصولات فناوری',
    descriptionAr: 'الأجهزة الذكية ومنتجات التكنولوجيا',
    productCount: 180000,
    supplierCount: 15000,
    featured: true,
    trending: true,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=90',
    gradient: 'from-cyan-900/80 via-cyan-800/70 to-blue-700/80',
    accent: 'cyan',
    subcategories: [
      { id: '2-1', nameEn: 'Mobile Phones & Accessories', nameFa: 'گوشی موبایل و لوازم جانبی', nameAr: 'الهواتف المحمولة والإكسسوارات', productCount: 75000, icon: '📱', trending: true },
      { id: '2-2', nameEn: 'Audio & Video Equipment', nameFa: 'تجهیزات صوتی و تصویری', nameAr: 'معدات الصوت والفيديو', productCount: 45000, icon: '🎧' },
      { id: '2-3', nameEn: 'Wearable Electronics', nameFa: 'الکترونیک پوشیدنی', nameAr: 'الإلكترونيات القابلة للارتداء', productCount: 25000, icon: '⌚', trending: true },
      { id: '2-4', nameEn: 'Smart Devices', nameFa: 'دستگاه‌های هوشمند', nameAr: 'الأجهزة الذكية', productCount: 20000, icon: '🏠' },
      { id: '2-5', nameEn: 'Computer & Networking', nameFa: 'کامپیوتر و شبکه', nameAr: 'أجهزة الكمبيوتر والشبكات', productCount: 15000, icon: '💻' },
    ],
  },
  {
    id: '3',
    nameEn: 'Home & Garden',
    nameFa: 'خانه و باغ',
    nameAr: 'المنزل والحديقة',
    icon: '🏠',
    descriptionEn: 'Furniture, decor & outdoor supplies',
    descriptionFa: 'مبلمان، دکوراسیون و لوازم فضای باز',
    descriptionAr: 'الأثاث والديكور ومستلزمات الهواء الطلق',
    productCount: 165000,
    supplierCount: 12000,
    featured: true,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=90',
    gradient: 'from-orange-900/80 via-amber-800/70 to-orange-700/80',
    accent: 'orange',
    subcategories: [
      { id: '3-1', nameEn: 'Furniture', nameFa: 'مبلمان', nameAr: 'الأثاث', productCount: 55000, icon: '🪑', trending: true },
      { id: '3-2', nameEn: 'Home Decor', nameFa: 'دکوراسیون خانه', nameAr: 'ديكور المنزل', productCount: 45000, icon: '🖼️' },
      { id: '3-3', nameEn: 'Kitchenware', nameFa: 'لوازم آشپزخانه', nameAr: 'أدوات المطبخ', productCount: 35000, icon: '🍳' },
      { id: '3-4', nameEn: 'Lighting', nameFa: 'روشنایی', nameAr: 'الإضاءة', productCount: 20000, icon: '💡' },
      { id: '3-5', nameEn: 'Outdoor & Garden Supplies', nameFa: 'لوازم فضای باز و باغ', nameAr: 'مستلزمات الهواء الطلق والحديقة', productCount: 10000, icon: '🌳' },
    ],
  },
  {
    id: '4',
    nameEn: 'Industrial & Machinery',
    nameFa: 'صنعتی و ماشین‌آلات',
    nameAr: 'الصناعي والآلات',
    icon: '⚙️',
    descriptionEn: 'Heavy equipment & manufacturing machinery',
    descriptionFa: 'تجهیزات سنگین و ماشین‌آلات تولید',
    descriptionAr: 'المعدات الثقيلة وآلات التصنيع',
    productCount: 125000,
    supplierCount: 10000,
    featured: true,
    trending: true,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=90',
    gradient: 'from-slate-900/85 via-slate-800/75 to-slate-700/85',
    accent: 'slate',
    subcategories: [
      { id: '4-1', nameEn: 'Manufacturing Equipment', nameFa: 'تجهیزات تولید', nameAr: 'معدات التصنيع', productCount: 35000, icon: '🏭', trending: true },
      { id: '4-2', nameEn: 'Construction Machinery', nameFa: 'ماشین‌آلات ساختمانی', nameAr: 'آلات البناء', productCount: 40000, icon: '🏗️', trending: true },
      { id: '4-3', nameEn: 'Tools & Hardware', nameFa: 'ابزار و سخت‌افزار', nameAr: 'أدوات ومعدات', productCount: 30000, icon: '🔧' },
      { id: '4-4', nameEn: 'Industrial Parts', nameFa: 'قطعات صنعتی', nameAr: 'قطع صناعية', productCount: 15000, icon: '⚙️' },
      { id: '4-5', nameEn: 'Material Handling', nameFa: 'جابجایی مواد', nameAr: 'معالجة المواد', productCount: 5000, icon: '📦' },
    ],
  },
  {
    id: '5',
    nameEn: 'Automotive & Transportation',
    nameFa: 'خودرو و حمل‌ونقل',
    nameAr: 'السيارات والنقل',
    icon: '🚗',
    descriptionEn: 'Vehicle parts & automotive components',
    descriptionFa: 'قطعات خودرو و اجزای خودرویی',
    descriptionAr: 'قطع السيارات ومكونات السيارات',
    productCount: 98000,
    supplierCount: 8500,
    featured: true,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=90',
    gradient: 'from-red-900/80 via-red-800/70 to-red-700/80',
    accent: 'red',
    subcategories: [
      { id: '5-1', nameEn: 'Vehicle Parts & Accessories', nameFa: 'قطعات و لوازم جانبی خودرو', nameAr: 'قطع وإكسسوارات المركبات', productCount: 50000, icon: '🔩', trending: true },
      { id: '5-2', nameEn: 'Automotive Electronics', nameFa: 'الکترونیک خودرو', nameAr: 'إلكترونيات السيارات', productCount: 25000, icon: '📻' },
      { id: '5-3', nameEn: 'Tires & Wheels', nameFa: 'لاستیک و چرخ', nameAr: 'إطارات وعجلات', productCount: 15000, icon: '⭕' },
      { id: '5-4', nameEn: 'EV Components', nameFa: 'قطعات خودروی برقی', nameAr: 'مكونات المركبات الكهربائية', productCount: 8000, icon: '🔋', trending: true },
    ],
  },
  {
    id: '6',
    nameEn: 'Sports & Entertainment',
    nameFa: 'ورزش و سرگرمی',
    nameAr: 'الرياضة والترفيه',
    icon: '⚽',
    descriptionEn: 'Fitness equipment & recreational products',
    descriptionFa: 'تجهیزات ورزشی و محصولات تفریحی',
    descriptionAr: 'معدات اللياقة البدنية والمنتجات الترفيهية',
    productCount: 75000,
    supplierCount: 6000,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=90',
    gradient: 'from-green-900/80 via-green-800/70 to-green-700/80',
    accent: 'green',
    subcategories: [
      { id: '6-1', nameEn: 'Fitness Equipment', nameFa: 'تجهیزات ورزشی', nameAr: 'معدات اللياقة البدنية', productCount: 30000, icon: '🏋️', trending: true },
      { id: '6-2', nameEn: 'Outdoor Sports Gear', nameFa: 'لوازم ورزشی فضای باز', nameAr: 'معدات الرياضة في الهواء الطلق', productCount: 25000, icon: '🏕️' },
      { id: '6-3', nameEn: 'Toys & Games', nameFa: 'اسباب‌بازی و بازی', nameAr: 'ألعاب وألعاب', productCount: 15000, icon: '🧸' },
      { id: '6-4', nameEn: 'Hobbies & Collectibles', nameFa: 'سرگرمی و کلکسیون', nameAr: 'الهوايات والتحف', productCount: 5000, icon: '🎮' },
    ],
  },
  {
    id: '7',
    nameEn: 'Health, Beauty & Personal Care',
    nameFa: 'سلامت، زیبایی و مراقبت شخصی',
    nameAr: 'الصحة والجمال والعناية الشخصية',
    icon: '💄',
    descriptionEn: 'Cosmetics, skincare & wellness products',
    descriptionFa: 'محصولات آرایشی، مراقبت از پوست و سلامتی',
    descriptionAr: 'منتجات التجميل والعناية بالبشرة والعافية',
    productCount: 145000,
    supplierCount: 11000,
    featured: true,
    trending: true,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=90',
    gradient: 'from-rose-900/80 via-pink-800/70 to-rose-700/80',
    accent: 'rose',
    subcategories: [
      { id: '7-1', nameEn: 'Skincare & Cosmetics', nameFa: 'مراقبت از پوست و لوازم آرایشی', nameAr: 'العناية بالبشرة ومستحضرات التجميل', productCount: 65000, icon: '🧴', trending: true },
      { id: '7-2', nameEn: 'Health Products', nameFa: 'محصولات سلامتی', nameAr: 'منتجات الصحة', productCount: 40000, icon: '💊' },
      { id: '7-3', nameEn: 'Personal Hygiene', nameFa: 'بهداشت شخصی', nameAr: 'النظافة الشخصية', productCount: 25000, icon: '🧼' },
      { id: '7-4', nameEn: 'Beauty Tools', nameFa: 'ابزار زیبایی', nameAr: 'أدوات الجمال', productCount: 15000, icon: '✨' },
    ],
  },
  {
    id: '8',
    nameEn: 'Packaging & Printing',
    nameFa: 'بسته‌بندی و چاپ',
    nameAr: 'التعبئة والطباعة',
    icon: '📦',
    descriptionEn: 'Packaging materials & printing equipment',
    descriptionFa: 'مواد بسته‌بندی و تجهیزات چاپ',
    descriptionAr: 'مواد التعبئة ومعدات الطباعة',
    productCount: 68000,
    supplierCount: 5500,
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=90',
    gradient: 'from-blue-900/80 via-blue-800/70 to-blue-700/80',
    accent: 'blue',
    subcategories: [
      { id: '8-1', nameEn: 'Boxes & Packaging Supplies', nameFa: 'جعبه و لوازم بسته‌بندی', nameAr: 'صناديق ومستلزمات التعبئة', productCount: 35000, icon: '📦', trending: true },
      { id: '8-2', nameEn: 'Labeling & Printing Equipment', nameFa: 'تجهیزات برچسب‌زنی و چاپ', nameAr: 'معدات وضع العلامات والطباعة', productCount: 20000, icon: '🏷️' },
      { id: '8-3', nameEn: 'Packaging Materials', nameFa: 'مواد بسته‌بندی', nameAr: 'مواد التعبئة', productCount: 13000, icon: '📄' },
    ],
  },
  {
    id: '9',
    nameEn: 'Tools & Hardware',
    nameFa: 'ابزار و سخت‌افزار',
    nameAr: 'أدوات ومعدات',
    icon: '🔧',
    descriptionEn: 'Hand tools, power tools & construction supplies',
    descriptionFa: 'ابزار دستی، ابزار برقی و لوازم ساختمانی',
    descriptionAr: 'أدوات يدوية وأدوات كهربائية ومستلزمات البناء',
    productCount: 92000,
    supplierCount: 7500,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&q=90',
    gradient: 'from-gray-900/80 via-gray-800/70 to-gray-700/80',
    accent: 'gray',
    subcategories: [
      { id: '9-1', nameEn: 'Hand Tools', nameFa: 'ابزار دستی', nameAr: 'أدوات يدوية', productCount: 40000, icon: '🔨', trending: true },
      { id: '9-2', nameEn: 'Power Tools', nameFa: 'ابزار برقی', nameAr: 'أدوات كهربائية', productCount: 35000, icon: '⚡' },
      { id: '9-3', nameEn: 'Construction & Repair Tools', nameFa: 'ابزار ساخت و تعمیر', nameAr: 'أدوات البناء والإصلاح', productCount: 17000, icon: '🛠️' },
    ],
  },
  {
    id: '10',
    nameEn: 'Renewable Energy & Electrical Equipment',
    nameFa: 'انرژی تجدیدپذیر و تجهیزات الکتریکی',
    nameAr: 'الطاقة المتجددة والمعدات الكهربائية',
    icon: '☀️',
    descriptionEn: 'Solar panels, electrical supplies & power equipment',
    descriptionFa: 'پنل‌های خورشیدی، لوازم الکتریکی و تجهیزات برق',
    descriptionAr: 'الألواح الشمسية والمستلزمات الكهربائية ومعدات الطاقة',
    productCount: 55000,
    supplierCount: 4500,
    trending: true,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=90',
    gradient: 'from-yellow-900/80 via-yellow-800/70 to-yellow-700/80',
    accent: 'yellow',
    subcategories: [
      { id: '10-1', nameEn: 'Solar Panels & Parts', nameFa: 'پنل‌های خورشیدی و قطعات', nameAr: 'الألواح الشمسية والقطع', productCount: 25000, icon: '☀️', trending: true },
      { id: '10-2', nameEn: 'Electrical Supplies', nameFa: 'لوازم الکتریکی', nameAr: 'المستلزمات الكهربائية', productCount: 20000, icon: '⚡' },
      { id: '10-3', nameEn: 'Power Equipment', nameFa: 'تجهیزات برق', nameAr: 'معدات الطاقة', productCount: 10000, icon: '🔌' },
    ],
  },
  {
    id: '11',
    nameEn: 'Agriculture, Food & Beverage',
    nameFa: 'کشاورزی، غذا و نوشیدنی',
    nameAr: 'الزراعة والطعام والمشروبات',
    icon: '🌾',
    descriptionEn: 'Agricultural machinery, food ingredients & beverages',
    descriptionFa: 'ماشین‌آلات کشاورزی، مواد غذایی و نوشیدنی‌ها',
    descriptionAr: 'الآلات الزراعية ومكونات الطعام والمشروبات',
    productCount: 110000,
    supplierCount: 9000,
    featured: true,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=90',
    gradient: 'from-emerald-900/80 via-green-800/70 to-emerald-700/80',
    accent: 'emerald',
    subcategories: [
      { id: '11-1', nameEn: 'Agricultural Machinery', nameFa: 'ماشین‌آلات کشاورزی', nameAr: 'الآلات الزراعية', productCount: 40000, icon: '🚜', trending: true },
      { id: '11-2', nameEn: 'Food Ingredients', nameFa: 'مواد غذایی', nameAr: 'مكونات الطعام', productCount: 35000, icon: '🌾' },
      { id: '11-3', nameEn: 'Beverages', nameFa: 'نوشیدنی‌ها', nameAr: 'المشروبات', productCount: 25000, icon: '🥤' },
      { id: '11-4', nameEn: 'Agro Supplies', nameFa: 'لوازم کشاورزی', nameAr: 'المستلزمات الزراعية', productCount: 10000, icon: '🌱' },
    ],
  },
  {
    id: '12',
    nameEn: 'Gifts, Crafts & Seasonal',
    nameFa: 'هدایا، صنایع‌دستی و فصلی',
    nameAr: 'الهدايا والحرف والمواسم',
    icon: '🎁',
    descriptionEn: 'Handmade items, promotional gifts & seasonal decorations',
    descriptionFa: 'اقلام دست‌ساز، هدایای تبلیغاتی و تزئینات فصلی',
    descriptionAr: 'العناصر المصنوعة يدوياً والهدايا الترويجية والديكورات الموسمية',
    productCount: 48000,
    supplierCount: 4000,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=90',
    gradient: 'from-purple-900/80 via-purple-800/70 to-purple-700/80',
    accent: 'purple',
    subcategories: [
      { id: '12-1', nameEn: 'Handmade Items', nameFa: 'اقلام دست‌ساز', nameAr: 'العناصر المصنوعة يدوياً', productCount: 20000, icon: '✋' },
      { id: '12-2', nameEn: 'Promotional Gifts', nameFa: 'هدایای تبلیغاتی', nameAr: 'الهدايا الترويجية', productCount: 18000, icon: '🎁' },
      { id: '12-3', nameEn: 'Seasonal Decorations', nameFa: 'تزئینات فصلی', nameAr: 'الديكورات الموسمية', productCount: 10000, icon: '🎄' },
    ],
  },
  {
    id: '13',
    nameEn: 'Office & School Supplies',
    nameFa: 'لوازم اداری و مدرسه',
    nameAr: 'المستلزمات المكتبية والمدرسية',
    icon: '📚',
    descriptionEn: 'Stationery, office equipment & school accessories',
    descriptionFa: 'لوازم التحریر، تجهیزات اداری و لوازم مدرسه',
    descriptionAr: 'القرطاسية ومعدات المكتب والاكسسوارات المدرسية',
    productCount: 62000,
    supplierCount: 5000,
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&q=90',
    gradient: 'from-indigo-900/80 via-indigo-800/70 to-indigo-700/80',
    accent: 'indigo',
    subcategories: [
      { id: '13-1', nameEn: 'Stationery', nameFa: 'لوازم التحریر', nameAr: 'القرطاسية', productCount: 30000, icon: '✏️', trending: true },
      { id: '13-2', nameEn: 'Office Equipment', nameFa: 'تجهیزات اداری', nameAr: 'معدات المكتب', productCount: 22000, icon: '🖨️' },
      { id: '13-3', nameEn: 'School Accessories', nameFa: 'لوازم مدرسه', nameAr: 'الاكسسوارات المدرسية', productCount: 10000, icon: '🎒' },
    ],
  },
  {
    id: '14',
    nameEn: 'Pets & Animals',
    nameFa: 'حیوانات خانگی و حیوانات',
    nameAr: 'الحيوانات الأليفة والحيوانات',
    icon: '🐶',
    descriptionEn: 'Pet food, accessories & veterinary supplies',
    descriptionFa: 'غذای حیوانات خانگی، لوازم جانبی و لوازم دامپزشکی',
    descriptionAr: 'طعام الحيوانات الأليفة والإكسسوارات ومستلزمات الطب البيطري',
    productCount: 38000,
    supplierCount: 3200,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=90',
    gradient: 'from-pink-900/80 via-pink-800/70 to-pink-700/80',
    accent: 'pink',
    subcategories: [
      { id: '14-1', nameEn: 'Pet Food', nameFa: 'غذای حیوانات خانگی', nameAr: 'طعام الحيوانات الأليفة', productCount: 18000, icon: '🍖', trending: true },
      { id: '14-2', nameEn: 'Pet Accessories', nameFa: 'لوازم جانبی حیوانات خانگی', nameAr: 'إكسسوارات الحيوانات الأليفة', productCount: 15000, icon: '🐕' },
      { id: '14-3', nameEn: 'Veterinary Supplies', nameFa: 'لوازم دامپزشکی', nameAr: 'مستلزمات الطب البيطري', productCount: 5000, icon: '🏥' },
    ],
  },
  {
    id: '15',
    nameEn: 'Chemicals & Raw Materials',
    nameFa: 'مواد شیمیایی و مواد اولیه',
    nameAr: 'المواد الكيميائية والمواد الخام',
    icon: '🧪',
    descriptionEn: 'Industrial chemicals, raw materials & polymers',
    descriptionFa: 'مواد شیمیایی صنعتی، مواد اولیه و پلیمرها',
    descriptionAr: 'المواد الكيميائية الصناعية والمواد الخام والبوليمرات',
    productCount: 85000,
    supplierCount: 7000,
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=90',
    gradient: 'from-teal-900/80 via-teal-800/70 to-teal-700/80',
    accent: 'teal',
    subcategories: [
      { id: '15-1', nameEn: 'Industrial Chemicals', nameFa: 'مواد شیمیایی صنعتی', nameAr: 'المواد الكيميائية الصناعية', productCount: 40000, icon: '⚗️', trending: true },
      { id: '15-2', nameEn: 'Raw Materials', nameFa: 'مواد اولیه', nameAr: 'المواد الخام', productCount: 30000, icon: '📦' },
      { id: '15-3', nameEn: 'Lab Chemicals', nameFa: 'مواد شیمیایی آزمایشگاهی', nameAr: 'المواد الكيميائية المختبرية', productCount: 10000, icon: '🔬' },
      { id: '15-4', nameEn: 'Polymers & Resins', nameFa: 'پلیمرها و رزین‌ها', nameAr: 'البوليمرات والراتنجات', productCount: 5000, icon: '🧬' },
    ],
  },
];

// Helper functions
export const getCategoryName = (category: Category, language: string = 'en'): string => {
  if (language === 'fa') return category.nameFa;
  if (language === 'ar') return category.nameAr;
  return category.nameEn;
};

export const getSubCategoryName = (subcat: SubCategory, language: string = 'en'): string => {
  if (language === 'fa') return subcat.nameFa;
  if (language === 'ar') return subcat.nameAr;
  return subcat.nameEn;
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getFeaturedCategories = (): Category[] => {
  return categories.filter(cat => cat.featured);
};

export const getTrendingCategories = (): Category[] => {
  return categories.filter(cat => cat.trending);
};

