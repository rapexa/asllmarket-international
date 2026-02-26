# خلاصه چت و قابلیت‌های اضافه‌شده (سامری)

## خلاصه کلی چت
- **صفحه اصلی**: کپی عمیق (deep copy) از Alibaba.com با حفظ رنگ سازمانی (نارنجی و بنفش): Hero با AI Mode و تب‌های Products/Manufacturers/Worldwide، جستجو با Image Search، Welcome با ۳ دکمه (RFQ, Top Ranking, Fast customization)، سایدبار دسته‌بندی، Frequently Searched، بنر Quality product selections، بخش Recommended با ۳ بنر (EU local stock، ASL Guaranteed، Fast customization)، Top Deals، Top Ranking، New Arrivals، Tailored Selections، Special Offers (€10 off every €100)، و بخش First order FREE shipping (Savings Booster).
- **صفحه محصول**: کپی از صفحه محصول Alibaba با گالری تصویر، تب Wholesale/Customization، بنر FREE shipping، جدول قیمت با تخفیف، Variations، Shipping، دکمه‌های Start order / Add to cart / Chat now، و ASL.com order protection.
- **صفحه تامین‌کننده**: شبیه Alibaba با Company Capabilities، Certificates، Products Grid و Stats؛ بک‌اند capabilities و certificates برای supplier اضافه شد.
- **رفع باگ‌ها**: تصحیح Cart (addItem با Omit<CartItem,'id'> و فیلدهای کامل)، تصحیح ArrowRight در SupplierDetailAlibaba، تصحیح api.client به api در supplier-capability.service، و تصحیح repository برای GetCapabilities/GetCertificates.

---

## قابلیت‌های جدید: تگ‌ها و ارسال/ضمانت (همه‌جا)

### بک‌اند
- **مایگریشن `011_product_selling_points`**  
  ستون‌های جدید جدول `products`:
  - `discount_percent` (INT, default 0)
  - `free_shipping` (BOOLEAN, default FALSE)
  - `first_order_free_shipping` (BOOLEAN, default FALSE)
  - `guaranteed` (BOOLEAN, default FALSE)
  - `fast_customization` (BOOLEAN, default FALSE)
  - `selling_point_tags` (TEXT, NULL) — آرایه JSON رشته‌ها، مثلاً `["Lower priced than similar","FREE shipping"]`
- **مدل و API محصول**  
  در `internal/domain/product`: فیلدهای بالا به مدل `Product` و به `CreateInput` / `UpdateInput` اضافه شده‌اند. در repository برای List، GetByID، Create و Update خوانده/نوشته می‌شوند.
- **GORM**  
  در `internal/database/models.go` مدل مایگریشن محصول با همین ستون‌ها به‌روز شده تا AutoMigrate جدول را درست بسازد/به‌روز کند.

### فرانت‌اند
- **نوع `Product` و درخواست‌ها**  
  در `src/services/product.service.ts`:  
  `discountPercent`, `freeShipping`, `firstOrderFreeShipping`, `guaranteed`, `fastCustomization`, `sellingPointTags` به `Product` و به `CreateProductRequest` / `UpdateProductRequest` اضافه شده‌اند.
- **فرم ساخت محصول (ادمین)**  
  در `src/pages/admin/AddProduct.tsx`:  
  کارت **«Selling points & Shipping»** با:
  - درصد تخفیف (عدد ۰–۱۰۰)
  - چک‌باکس: Free shipping، First order FREE shipping، Guaranteed (ASL)، Fast customization
  - فیلد متنی تگ‌ها (comma-separated) که هنگام ارسال به JSON array تبدیل می‌شود.
- **صفحه جزئیات محصول**  
  در `src/pages/ProductDetailAlibaba.tsx`:
  - بنر «FREE shipping» / «First order, FREE shipping» فقط در صورت `product.freeShipping` یا `product.firstOrderFreeShipping` نمایش داده می‌شود.
  - درصد تخفیف و قیمت اصلی از `product.discountPercent` و `price` محاسبه می‌شوند.
  - تگ‌های فروش از `product.sellingPointTags` (JSON یا comma-separated) خوانده و در باکس قیمت و بج تصویر نمایش داده می‌شوند.

### جایی که این فیلدها استفاده می‌شوند
- **ساخت/ویرایش محصول**: فرم Add Product (ادمین) با کارت Selling points & Shipping.
- **نمایش محصول**: صفحه ProductDetailAlibaba (بنر ارسال رایگان، تخفیف، تگ‌ها).
- **لیست‌ها و کارت‌ها**: در سرویس و نوع `Product` موجودند؛ هر بخشی که از API محصول استفاده کند (مثلاً Top Deals، Recommended، Deals) می‌تواند از `discountPercent`, `freeShipping`, `firstOrderFreeShipping`, `guaranteed`, `fastCustomization`, `sellingPointTags` برای فیلتر یا نمایش بج/متن استفاده کند.

### نحوه اجرای مایگریشن
اگر از goose یا اسکریپت مایگریشن استفاده می‌کنید، فایل `backend/migrations/011_product_selling_points.up.sql` را اجرا کنید. در غیر این صورت دستی:
```sql
ALTER TABLE products
  ADD COLUMN discount_percent INT NOT NULL DEFAULT 0,
  ADD COLUMN free_shipping BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN first_order_free_shipping BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN guaranteed BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN fast_customization BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN selling_point_tags TEXT NULL;
```
