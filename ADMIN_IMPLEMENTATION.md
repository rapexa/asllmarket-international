# Admin Management Implementation - Complete

این مستند شامل پیاده‌سازی کامل بخش‌های مدیریتی Admin برای پروژه Global Trade Hub است.

## نمای کلی

تمامی صفحات مدیریتی Admin به Backend متصل شده‌اند و از داده‌های واقعی استفاده می‌کنند.

## Backend Implementation

### 1. Domain: Admin (`backend/internal/domain/admin/`)

#### Models (`model.go`)
تعریف شده‌اند:
- `DashboardStats` - آمار کلی پلتفرم
- `SalesData` - داده‌های فروش در طول زمان
- `CategoryStats` - توزیع محصولات بر اساس دسته‌بندی
- `TopProduct` - محصولات پرفروش
- `RecentActivity` - فعالیت‌های اخیر پلتفرم
- `UserStats` - آمار رشد کاربران
- `BuyerListItem` - لیست خریداران
- `AdminProduct` - اطلاعات محصولات برای ادمین
- `AdminOrder` - اطلاعات سفارشات برای ادمین
- `AdminSupplier` - اطلاعات تامین‌کنندگان برای ادمین
- `AdminVerification` - درخواست‌های تایید هویت
- Input structs برای به‌روزرسانی وضعیت‌ها

#### Services (`service.go`)
پیاده‌سازی شده‌اند:
- `GetDashboardStats()` - دریافت آمار Dashboard
- `GetSalesData(days)` - دریافت داده‌های فروش
- `GetCategoryStats()` - دریافت آمار دسته‌بندی‌ها
- `GetTopProducts(limit)` - دریافت محصولات برتر
- `GetUserStats(days)` - دریافت آمار کاربران
- `GetRecentActivities(limit)` - دریافت فعالیت‌های اخیر
- `ListBuyers(limit, offset)` - لیست خریداران
- `UpdateUserStatus(userID, status)` - به‌روزرسانی وضعیت کاربر
- `ListProducts(limit, offset, status, category)` - لیست محصولات
- `UpdateProductStatus(productID, input)` - به‌روزرسانی وضعیت محصول
- `DeleteProduct(productID)` - حذف محصول (soft delete)
- `ListOrders(limit, offset, status, paymentStatus)` - لیست سفارشات
- `UpdateOrderStatus(orderID, input)` - به‌روزرسانی وضعیت سفارش
- `ListSuppliers(limit, offset, status, subscription)` - لیست تامین‌کنندگان
- `UpdateSupplierStatus(supplierID, input)` - به‌روزرسانی وضعیت تامین‌کننده
- `ListVerifications(limit, offset, status)` - لیست درخواست‌های تایید
- `ReviewVerification(verificationID, adminID, input)` - بررسی و تایید/رد درخواست

#### Handlers (`handler.go`)
REST API endpoints برای تمام عملیات بالا با محافظت نقش Admin

### 2. Router Integration (`backend/internal/http/router.go`)

تمام endpoint های Admin در مسیر `/api/v1/admin/` ثبت شده‌اند:

**Dashboard Endpoints:**
- `GET /admin/dashboard/stats`
- `GET /admin/dashboard/sales`
- `GET /admin/dashboard/categories`
- `GET /admin/dashboard/top-products`
- `GET /admin/dashboard/user-stats`
- `GET /admin/dashboard/activities`

**User Management:**
- `GET /admin/buyers`
- `PATCH /admin/users/:userId/status`

**Product Management:**
- `GET /admin/products`
- `PATCH /admin/products/:productId/status`
- `DELETE /admin/products/:productId`

**Order Management:**
- `GET /admin/orders`
- `PATCH /admin/orders/:orderId/status`

**Supplier Management:**
- `GET /admin/suppliers`
- `PATCH /admin/suppliers/:supplierId/status`

**Verification Management:**
- `GET /admin/verifications`
- `POST /admin/verifications/:verificationId/review`

### 3. Database Migrations

#### Migration 003: Add Status Columns
- اضافه کردن ستون `status` به جدول `users`
- اضافه کردن ستون `status` به جدول `products`
- ایجاد Index برای فیلتر کردن سریع‌تر

## Frontend Implementation

### 1. Admin Service Layer (`src/services/admin.service.ts`)

تمام interface ها و متدهای API برای ارتباط با Backend:

**Interfaces:**
- `DashboardStats`
- `SalesData`, `CategoryStats`, `TopProduct`, `UserStats`, `RecentActivity`
- `BuyerListItem`, `UpdateUserStatusRequest`
- `AdminProduct`, `UpdateProductStatusRequest`
- `AdminOrder`, `UpdateOrderStatusRequest`
- `AdminSupplier`, `UpdateSupplierStatusRequest`
- `AdminVerification`, `ReviewVerificationRequest`

**Methods:**
- Dashboard: `getDashboardStats`, `getSalesData`, `getCategoryStats`, `getTopProducts`, `getUserStats`, `getRecentActivities`
- Users: `listBuyers`, `updateUserStatus`
- Products: `listProducts`, `updateProductStatus`, `deleteProduct`
- Orders: `listOrders`, `updateOrderStatus`
- Suppliers: `listSuppliers`, `updateSupplierStatus`
- Verifications: `listVerifications`, `reviewVerification`

### 2. Admin Pages (Frontend Integration)

#### ✅ Dashboard (`src/pages/admin/Dashboard.tsx`)
- اتصال کامل به Backend
- دریافت آمار کلی، فروش، دسته‌بندی‌ها، محصولات برتر و فعالیت‌های اخیر
- Loading state و Error handling
- نمایش نمودارها با داده‌های واقعی

#### ✅ Buyers (`src/pages/admin/Buyers.tsx`)
- اتصال کامل به Backend
- لیست خریداران با فیلتر و مرتب‌سازی
- به‌روزرسانی وضعیت کاربر (Active/Inactive/Suspended)
- Loading state و Error handling

#### ✅ Products (`src/pages/admin/Products.tsx`)
- اتصال کامل به Backend
- لیست محصولات با فیلتر بر اساس وضعیت و دسته‌بندی
- به‌روزرسانی وضعیت محصول
- حذف محصول
- Loading state و Error handling

#### ✅ Orders (`src/pages/admin/Orders.tsx`)
- اتصال کامل به Backend
- لیست سفارشات با فیلتر بر اساس وضعیت و وضعیت پرداخت
- به‌روزرسانی وضعیت سفارش (Pending → Confirmed → Processing → Shipped → Delivered)
- امکان لغو سفارش
- Loading state و Error handling

#### ✅ Suppliers (`src/pages/admin/Suppliers.tsx`)
- اتصال کامل به Backend
- لیست تامین‌کنندگان با فیلتر بر اساس وضعیت و اشتراک
- به‌روزرسانی وضعیت تامین‌کننده (Active/Inactive/Suspended/Pending)
- نمایش آمار هر تامین‌کننده (محصولات، سفارشات، درآمد، امتیاز)
- Loading state و Error handling

#### ✅ Verifications (`src/pages/admin/Verifications.tsx`)
- اتصال کامل به Backend
- لیست درخواست‌های تایید هویت
- تایید یا رد درخواست‌ها
- ثبت پیام برای درخواست‌های رد شده
- Loading state و Error handling

#### ✅ RFQ (`src/pages/admin/RFQ.tsx`)
- اتصال به Backend (از طریق `rfqService.listAll`)
- لیست تمام درخواست‌های RFQ
- فیلتر بر اساس وضعیت
- Loading state و Error handling

#### ✅ Notifications (`src/pages/admin/Notifications.tsx`)
- اتصال به Backend (از طریق `notificationService`)
- لیست اعلان‌ها
- علامت‌گذاری به عنوان خوانده شده
- حذف اعلان‌ها
- Loading state و Error handling

#### ✅ Reports (`src/pages/admin/Reports.tsx`)
- اتصال به Backend
- دریافت داده‌های فروش، کاربران، دسته‌بندی‌ها و محصولات برتر
- نمایش نمودارها و گزارش‌های مختلف
- Loading state و Error handling

#### 📋 Categories (`src/pages/admin/Categories.tsx`)
- استفاده از داده‌های Static (از `@/data/categories`)
- مدیریت دسته‌بندی‌ها

#### 📋 Settings (`src/pages/admin/Settings.tsx`)
- تنظیمات پلتفرم (فرم محلی)

#### 📋 AddProduct (`src/pages/admin/AddProduct.tsx`)
- فرم افزودن محصول جدید

## Features Implemented

### ✅ Role-Based Access Control (RBAC)
- تمام endpoint های Admin محافظت شده با `requireAdmin` middleware
- فقط کاربران با نقش `admin` می‌توانند به این endpoint ها دسترسی داشته باشند

### ✅ Data Aggregation & Statistics
- آمارگیری از چندین جدول (users, products, orders, suppliers, verifications)
- محاسبه درصد تغییرات
- گروه‌بندی داده‌ها بر اساس زمان

### ✅ Filtering & Pagination
- تمام لیست‌ها دارای Pagination (limit/offset)
- فیلتر بر اساس وضعیت، دسته‌بندی، اشتراک و ...
- جستجو در تمام فیلدهای مهم

### ✅ Status Management
- مدیریت وضعیت کاربران (Active, Inactive, Suspended)
- مدیریت وضعیت محصولات (Active, Inactive, Pending, Rejected)
- مدیریت وضعیت سفارشات (7 وضعیت مختلف)
- مدیریت وضعیت تامین‌کنندگان (4 وضعیت مختلف)

### ✅ Verification System
- سیستم تایید هویت کامل
- بررسی اسناد توسط Admin
- ثبت پیام برای رد یا تایید
- به‌روزرسانی خودکار وضعیت verified کاربر پس از تایید

### ✅ Real-time Data Integration
- تمام صفحات Admin از داده‌های واقعی استفاده می‌کنند
- به‌روزرسانی خودکار پس از تغییرات
- نمایش Loading state در هنگام بارگذاری
- Error handling مناسب

## Database Schema Updates

### Users Table
```sql
ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active';
CREATE INDEX idx_users_status ON users(status);
```

### Products Table
```sql
ALTER TABLE products MODIFY COLUMN status VARCHAR(20) DEFAULT 'active';
CREATE INDEX idx_products_status ON products(status);
```

## API Endpoints Summary

| Category | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| Dashboard | GET | `/admin/dashboard/stats` | آمار کلی پلتفرم |
| Dashboard | GET | `/admin/dashboard/sales` | داده‌های فروش |
| Dashboard | GET | `/admin/dashboard/categories` | آمار دسته‌بندی‌ها |
| Dashboard | GET | `/admin/dashboard/top-products` | محصولات برتر |
| Dashboard | GET | `/admin/dashboard/user-stats` | آمار کاربران |
| Dashboard | GET | `/admin/dashboard/activities` | فعالیت‌های اخیر |
| Users | GET | `/admin/buyers` | لیست خریداران |
| Users | PATCH | `/admin/users/:userId/status` | تغییر وضعیت کاربر |
| Products | GET | `/admin/products` | لیست محصولات |
| Products | PATCH | `/admin/products/:productId/status` | تغییر وضعیت محصول |
| Products | DELETE | `/admin/products/:productId` | حذف محصول |
| Orders | GET | `/admin/orders` | لیست سفارشات |
| Orders | PATCH | `/admin/orders/:orderId/status` | تغییر وضعیت سفارش |
| Suppliers | GET | `/admin/suppliers` | لیست تامین‌کنندگان |
| Suppliers | PATCH | `/admin/suppliers/:supplierId/status` | تغییر وضعیت تامین‌کننده |
| Verifications | GET | `/admin/verifications` | لیست درخواست‌های تایید |
| Verifications | POST | `/admin/verifications/:verificationId/review` | تایید/رد درخواست |

## Frontend Pages Implementation Status

| Page | Status | Description |
|------|--------|-------------|
| Dashboard | ✅ Complete | نمایش آمار کلی، نمودارها، فعالیت‌های اخیر |
| Buyers | ✅ Complete | مدیریت خریداران، تغییر وضعیت |
| Products | ✅ Complete | مدیریت محصولات، تغییر وضعیت، حذف |
| Orders | ✅ Complete | مدیریت سفارشات، تغییر وضعیت |
| Suppliers | ✅ Complete | مدیریت تامین‌کنندگان، تغییر وضعیت |
| Verifications | ✅ Complete | بررسی و تایید/رد درخواست‌ها |
| RFQ | ✅ Complete | مشاهده تمام درخواست‌های RFQ |
| Notifications | ✅ Complete | مدیریت اعلان‌ها |
| Reports | ✅ Complete | گزارش‌ها و نمودارهای تحلیلی |
| Categories | ✅ Static Data | مدیریت دسته‌بندی‌ها (static) |
| Settings | ✅ Local Form | تنظیمات پلتفرم |
| AddProduct | ✅ Local Form | فرم افزودن محصول |

## Technical Features

### Security
- ✅ JWT Authentication
- ✅ Role-Based Access Control (Admin only)
- ✅ Request validation با Gin binding
- ✅ Context timeout برای جلوگیری از long-running queries

### Performance
- ✅ Database indexing برای فیلدهای پرجستجو
- ✅ Efficient SQL queries با proper JOINs
- ✅ Pagination برای تمام لیست‌ها
- ✅ Parallel data loading در Frontend

### User Experience
- ✅ Loading states برای تمام صفحات
- ✅ Error handling و fallback 
- ✅ Real-time updates پس از اعمال تغییرات
- ✅ Responsive design
- ✅ Intuitive UI با shadcn/ui components

## How to Run

### Backend
```bash
cd backend

# Run migrations
make migrate-up

# Start server
make run
# یا
go run cmd/api/main.go
```

### Frontend
```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Docker
```bash
# Start MySQL and backend
cd backend
docker-compose up -d
```

## Testing Admin Features

### 1. Create Admin User
ابتدا باید یک کاربر با نقش `admin` ایجاد کنید:

```sql
INSERT INTO users (id, email, password_hash, full_name, role, verified, created_at, updated_at)
VALUES (
  UUID(),
  'admin@aslmarket.com',
  '$2a$10$...', -- bcrypt hash of password
  'Admin User',
  'admin',
  1,
  NOW(),
  NOW()
);
```

### 2. Login as Admin
```bash
POST /api/v1/auth/login
{
  "email": "admin@aslmarket.com",
  "password": "your-password"
}
```

### 3. Access Admin Dashboard
با Token دریافتی، به صفحه `/admin/dashboard` بروید.

## Next Steps (Optional Enhancements)

1. **Export Functionality**: پیاده‌سازی export به PDF, Excel, CSV
2. **Bulk Operations**: عملیات گروهی برای محصولات و کاربران
3. **Activity Logging**: ثبت تمام اعمال Admin در جدول audit log
4. **Advanced Analytics**: نمودارها و گزارش‌های پیشرفته‌تر
5. **Email Notifications**: ارسال ایمیل به کاربران پس از تغییر وضعیت
6. **Real-time Updates**: استفاده از WebSocket برای به‌روزرسانی‌های لحظه‌ای

## Completed ✅

تمامی بخش‌های مدیریتی Admin با موفقیت پیاده‌سازی شده و به Backend متصل شده‌اند!
