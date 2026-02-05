# Global Trade Hub API Documentation

Base URL: `http://localhost:8080/api/v1`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Register
**POST** `/auth/register`

Request:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "role": "buyer"
}
```

Response:
```json
{
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "phone": "+1234567890",
    "role": "buyer",
    "createdAt": "2026-02-05T10:00:00Z"
  }
}
```

### Login
**POST** `/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

Response: Same as Register

### Refresh Token
**POST** `/auth/refresh`

Request:
```json
{
  "refreshToken": "eyJhbGc..."
}
```

Response: Same as Register

### Get Current User
**GET** `/me` (Protected)

Response:
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "role": "buyer",
  "createdAt": "2026-02-05T10:00:00Z"
}
```

## Products

### List Products
**GET** `/products`

Query Parameters:
- `limit` (int, default: 20, max: 100)
- `offset` (int, default: 0)
- `categoryId` (string, optional)
- `supplierId` (string, optional)

Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "supplierId": "uuid",
      "categoryId": "uuid",
      "subcategoryId": "uuid",
      "name": "Product Name",
      "description": "Product description",
      "specifications": "Detailed specs",
      "images": ["url1", "url2"],
      "price": 99.99,
      "currency": "USD",
      "moq": 100,
      "stockQuantity": 1000,
      "unit": "piece",
      "leadTime": 7,
      "rating": 4.5,
      "reviewCount": 42,
      "featured": true,
      "status": "active",
      "createdAt": "2026-02-05T10:00:00Z",
      "updatedAt": "2026-02-05T10:00:00Z"
    }
  ]
}
```

### Get Product by ID
**GET** `/products/:id`

Response: Single product object

### Create Product
**POST** `/products` (Protected - Supplier/Admin only)

Request:
```json
{
  "categoryId": "uuid",
  "subcategoryId": "uuid",
  "name": "Product Name",
  "description": "Product description",
  "specifications": "Detailed specs",
  "images": ["url1", "url2"],
  "price": 99.99,
  "currency": "USD",
  "moq": 100,
  "stockQuantity": 1000,
  "unit": "piece",
  "leadTime": 7
}
```

Response: Created product object

### Update Product
**PUT** `/products/:id` (Protected - Supplier/Admin only)

Request: (all fields optional)
```json
{
  "name": "Updated Name",
  "price": 89.99,
  "status": "active"
}
```

Response: Updated product object

### Delete Product
**DELETE** `/products/:id` (Protected - Supplier/Admin only)

Response: 204 No Content

## Suppliers

### List Suppliers
**GET** `/suppliers`

Query Parameters:
- `limit` (int, default: 20, max: 100)
- `offset` (int, default: 0)

Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "userId": "uuid",
      "companyName": "ABC Corp",
      "contactName": "Jane Smith",
      "email": "contact@abc.com",
      "phone": "+1234567890",
      "country": "USA",
      "city": "New York",
      "address": "123 Main St",
      "logo": "https://...",
      "description": "Leading supplier of...",
      "verified": true,
      "status": "active",
      "subscription": "gold",
      "rating": 4.8,
      "totalProducts": 150,
      "totalOrders": 500,
      "totalRevenue": 250000.00,
      "responseRate": 95.5,
      "responseTime": 120,
      "established": 2015,
      "employees": "50-100",
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-02-05T10:00:00Z"
    }
  ]
}
```

### Get Supplier by ID
**GET** `/suppliers/:id`

Response: Single supplier object

### Get My Supplier Profile
**GET** `/suppliers/me` (Protected - Supplier only)

Response: Current user's supplier profile

### Create Supplier Profile
**POST** `/suppliers` (Protected)

Request:
```json
{
  "companyName": "ABC Corp",
  "contactName": "Jane Smith",
  "email": "contact@abc.com",
  "phone": "+1234567890",
  "country": "USA",
  "city": "New York",
  "address": "123 Main St",
  "description": "Leading supplier of...",
  "established": 2015,
  "employees": "50-100"
}
```

Response: Created supplier object

### Update Supplier Profile
**PUT** `/suppliers/:id` (Protected)

Request: (all fields optional)
```json
{
  "companyName": "ABC Corporation",
  "description": "Updated description",
  "logo": "https://..."
}
```

Response: Updated supplier object

## Orders

### Get My Orders
**GET** `/orders` (Protected - Buyer)

Query Parameters:
- `limit` (int, default: 20)
- `offset` (int, default: 0)

Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "orderNumber": "ORD-2026-123456",
      "buyerId": "uuid",
      "supplierId": "uuid",
      "productId": "uuid",
      "quantity": 100,
      "unitPrice": 99.99,
      "totalAmount": 9999.00,
      "currency": "USD",
      "status": "confirmed",
      "paymentStatus": "paid",
      "paymentMethod": "Escrow",
      "shippingAddress": "456 Delivery St, City, Country",
      "shippingMethod": "Air Freight",
      "trackingNumber": "TRACK123456",
      "estimatedDelivery": "2026-02-20T00:00:00Z",
      "deliveredAt": null,
      "createdAt": "2026-02-05T10:00:00Z",
      "updatedAt": "2026-02-05T10:00:00Z"
    }
  ]
}
```

### Get Order by ID
**GET** `/orders/:id` (Protected)

Response: Single order object

### Create Order
**POST** `/orders` (Protected - Buyer)

Request:
```json
{
  "productId": "uuid",
  "supplierId": "uuid",
  "quantity": 100,
  "unitPrice": 99.99,
  "currency": "USD",
  "paymentMethod": "Escrow",
  "shippingAddress": "456 Delivery St, City, Country",
  "shippingMethod": "Air Freight"
}
```

Response: Created order object

### Update Order Status
**PATCH** `/orders/:id/status` (Protected)

Request:
```json
{
  "status": "shipped",
  "trackingNumber": "TRACK123456",
  "deliveredAt": "2026-02-20T00:00:00Z"
}
```

Response: Updated order object

### Get Supplier Orders
**GET** `/orders/supplier/:supplierId` (Protected - Supplier/Admin)

Query Parameters: Same as Get My Orders

Response: List of orders for supplier

### Admin: List All Orders
**GET** `/admin/orders` (Protected - Admin only)

Response: List of all orders

### Admin: Delete Order
**DELETE** `/admin/orders/:id` (Protected - Admin only)

Response: 204 No Content

## RFQ (Request for Quotation)

### Get My RFQs
**GET** `/rfqs` (Protected - Buyer)

Query Parameters:
- `limit` (int, default: 20)
- `offset` (int, default: 0)

Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "buyerId": "uuid",
      "productId": "uuid",
      "productName": "Product Name",
      "productImage": "https://...",
      "supplierId": "uuid",
      "quantity": 500,
      "unit": "piece",
      "specifications": "Custom specs...",
      "requirements": "Quality requirements...",
      "deliveryLocation": "New York, USA",
      "preferredDeliveryDate": "2026-03-01T00:00:00Z",
      "budget": 50000.00,
      "currency": "USD",
      "status": "active",
      "submittedAt": "2026-02-05T10:00:00Z",
      "expiresAt": "2026-03-05T10:00:00Z",
      "createdAt": "2026-02-05T10:00:00Z",
      "updatedAt": "2026-02-05T10:00:00Z"
    }
  ]
}
```

### Get RFQ by ID
**GET** `/rfqs/:id` (Protected)

Response: Single RFQ object

### Create RFQ
**POST** `/rfqs` (Protected - Buyer)

Request:
```json
{
  "productId": "uuid",
  "productName": "Product Name",
  "productImage": "https://...",
  "supplierId": "uuid",
  "quantity": 500,
  "unit": "piece",
  "specifications": "Custom specs...",
  "requirements": "Quality requirements...",
  "deliveryLocation": "New York, USA",
  "preferredDeliveryDate": "2026-03-01T00:00:00Z",
  "budget": 50000.00,
  "currency": "USD"
}
```

Response: Created RFQ object

### List RFQ Responses
**GET** `/rfqs/:rfqId/responses` (Protected)

Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "rfqId": "uuid",
      "supplierId": "uuid",
      "unitPrice": 95.00,
      "totalPrice": 47500.00,
      "currency": "USD",
      "moq": 500,
      "estimatedDelivery": 14,
      "paymentTerms": "30% advance, 70% on delivery",
      "specifications": "Meeting all requirements...",
      "message": "We can fulfill this order...",
      "status": "pending",
      "submittedAt": "2026-02-06T10:00:00Z",
      "expiresAt": "2026-02-20T10:00:00Z",
      "createdAt": "2026-02-06T10:00:00Z",
      "updatedAt": "2026-02-06T10:00:00Z"
    }
  ]
}
```

### Create RFQ Response
**POST** `/rfqs/responses` (Protected - Supplier)

Request:
```json
{
  "rfqId": "uuid",
  "unitPrice": 95.00,
  "currency": "USD",
  "moq": 500,
  "estimatedDelivery": 14,
  "paymentTerms": "30% advance, 70% on delivery",
  "specifications": "Meeting all requirements...",
  "message": "We can fulfill this order..."
}
```

Response: Created response object

### Admin: List All RFQs
**GET** `/admin/rfqs` (Protected - Admin only)

Response: List of all RFQs

## Notifications

### Get My Notifications
**GET** `/notifications` (Protected)

Query Parameters:
- `limit` (int, default: 50)
- `offset` (int, default: 0)

Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "userId": "uuid",
      "type": "business",
      "priority": "high",
      "title": "New Order",
      "description": "You have a new order #ORD-123",
      "icon": "ShoppingCart",
      "actionUrl": "/orders/uuid",
      "actionLabel": "View Order",
      "read": false,
      "metadata": "{}",
      "createdAt": "2026-02-05T10:00:00Z",
      "readAt": null
    }
  ]
}
```

### Mark as Read
**PATCH** `/notifications/:id/read` (Protected)

Response: 204 No Content

### Mark All as Read
**POST** `/notifications/read-all` (Protected)

Response: 204 No Content

### Delete Notification
**DELETE** `/notifications/:id` (Protected)

Response: 204 No Content

## Verifications

### Get My Verification
**GET** `/verifications/me` (Protected - Supplier)

Response:
```json
{
  "id": "uuid",
  "supplierId": "uuid",
  "status": "pending",
  "fullName": "John Doe",
  "nationality": "USA",
  "idType": "passport",
  "idNumber": "P1234567",
  "identityFrontUrl": "https://...",
  "identityBackUrl": "https://...",
  "legalName": "ABC Corporation Inc.",
  "registrationNumber": "REG123456",
  "countryOfRegistration": "USA",
  "companyAddress": "123 Business Ave",
  "businessType": "LLC",
  "businessLicenseUrl": "https://...",
  "certificateUrl": "https://...",
  "emailVerified": true,
  "phoneVerified": true,
  "emailVerifiedAt": "2026-02-01T10:00:00Z",
  "phoneVerifiedAt": "2026-02-01T10:00:00Z",
  "submittedAt": "2026-02-05T10:00:00Z",
  "reviewedAt": null,
  "reviewedBy": null,
  "rejectionReason": null,
  "adminNotes": null,
  "createdAt": "2026-02-05T10:00:00Z",
  "updatedAt": "2026-02-05T10:00:00Z"
}
```

### Submit Verification
**POST** `/verifications` (Protected - Supplier)

Request:
```json
{
  "fullName": "John Doe",
  "nationality": "USA",
  "idType": "passport",
  "idNumber": "P1234567",
  "identityFrontUrl": "https://...",
  "identityBackUrl": "https://...",
  "legalName": "ABC Corporation Inc.",
  "registrationNumber": "REG123456",
  "countryOfRegistration": "USA",
  "companyAddress": "123 Business Ave",
  "businessType": "LLC",
  "businessLicenseUrl": "https://...",
  "certificateUrl": "https://..."
}
```

Response: Created verification object

### Admin: List Verifications
**GET** `/admin/verifications` (Protected - Admin only)

Query Parameters:
- `limit` (int, default: 20)
- `offset` (int, default: 0)

Response: List of verification objects

### Admin: Get Verification by ID
**GET** `/admin/verifications/:id` (Protected - Admin only)

Response: Single verification object

### Admin: Review Verification
**PATCH** `/admin/verifications/:id/review` (Protected - Admin only)

Request:
```json
{
  "status": "verified",
  "rejectionReason": "",
  "adminNotes": "All documents verified"
}
```

Response: Updated verification object

## Subscriptions

### Get My Subscription
**GET** `/subscriptions/me` (Protected - Supplier)

Response:
```json
{
  "id": "uuid",
  "supplierId": "uuid",
  "plan": "gold",
  "status": "active",
  "startedAt": "2026-01-01T00:00:00Z",
  "expiresAt": "2026-12-31T23:59:59Z",
  "cancelledAt": null,
  "amount": 299.99,
  "currency": "USD",
  "paymentMethod": "Credit Card",
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-01-01T00:00:00Z"
}
```

### Create Subscription
**POST** `/subscriptions` (Protected - Supplier)

Request:
```json
{
  "plan": "gold",
  "amount": 299.99,
  "currency": "USD",
  "paymentMethod": "Credit Card",
  "durationDays": 365
}
```

Response: Created subscription object

### Cancel Subscription
**PATCH** `/subscriptions/:id/cancel` (Protected - Supplier)

Response: Updated subscription object with `status: "cancelled"`

### Admin: List Subscriptions
**GET** `/admin/subscriptions` (Protected - Admin only)

Response: List of subscription objects

### Admin: Delete Subscription
**DELETE** `/admin/subscriptions/:id` (Protected - Admin only)

Response: 204 No Content

## Messages

### List Conversations
**GET** `/messages/conversations` (Protected)

Response:
```json
{
  "items": [
    {
      "conversationId": "uuid1_uuid2",
      "otherUserId": "uuid",
      "otherUserName": "Jane Supplier",
      "lastMessage": "Thank you for your inquiry...",
      "lastMessageAt": "2026-02-05T10:00:00Z",
      "unreadCount": 2
    }
  ]
}
```

### List Messages in Conversation
**GET** `/messages/conversations/:conversationId` (Protected)

Query Parameters:
- `limit` (int, default: 50)
- `offset` (int, default: 0)

Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "conversationId": "uuid1_uuid2",
      "senderId": "uuid",
      "receiverId": "uuid",
      "subject": "Product Inquiry",
      "body": "I'm interested in your product...",
      "attachments": "[\"url1\", \"url2\"]",
      "read": true,
      "readAt": "2026-02-05T11:00:00Z",
      "createdAt": "2026-02-05T10:00:00Z"
    }
  ]
}
```

### Get Message by ID
**GET** `/messages/:id` (Protected)

Response: Single message object

### Send Message
**POST** `/messages` (Protected)

Request:
```json
{
  "receiverId": "uuid",
  "subject": "Product Inquiry",
  "body": "I'm interested in your product...",
  "attachments": "[\"url1\", \"url2\"]"
}
```

Response: Created message object

### Mark Message as Read
**PATCH** `/messages/:id/read` (Protected)

Response: 204 No Content

### Delete Message
**DELETE** `/messages/:id` (Protected)

Response: 204 No Content

## Search

### Unified Search
**GET** `/search`

Query Parameters:
- `q` (string, required) - Search query
- `type` (string, default: "text") - "text", "image", or "video"
- `categoryId` (string, optional)
- `minPrice` (float, optional)
- `maxPrice` (float, optional)
- `country` (string, optional)
- `verified` (boolean, optional)
- `limit` (int, default: 20)
- `offset` (int, default: 0)

Response:
```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Product Name",
      "description": "Description",
      "price": 99.99,
      "currency": "USD",
      "images": "[\"url1\"]",
      "supplierId": "uuid",
      "supplierName": "ABC Corp",
      "rating": 4.5,
      "moq": 100
    }
  ],
  "suppliers": [
    {
      "id": "uuid",
      "companyName": "ABC Corp",
      "country": "USA",
      "logo": "https://...",
      "verified": true,
      "rating": 4.8,
      "description": "Leading supplier..."
    }
  ],
  "total": 15
}
```

## Categories

### List Categories
**GET** `/categories`

Response:
```json
{
  "items": [
    {
      "id": "1",
      "nameEn": "Apparel & Accessories",
      "nameFa": "پوشاک و لوازم جانبی",
      "nameAr": "الملابس والإكسسوارات",
      "icon": "👔",
      "descriptionEn": "Global fashion suppliers",
      "descriptionFa": "تأمین‌کنندگان مد جهانی",
      "descriptionAr": "الموردون العالميون",
      "productCount": 250000,
      "supplierCount": 18000,
      "featured": true,
      "trending": true,
      "image": "https://...",
      "gradient": "from-amber-900/80...",
      "accent": "amber",
      "subcategories": []
    }
  ]
}
```

### Get Category by ID
**GET** `/categories/:id`

Response: Single category object

## Admin Management Endpoints

All admin endpoints require authentication with admin role.

### Dashboard Statistics

#### Get Dashboard Stats
**GET** `/admin/dashboard/stats`

Authorization: Bearer token (admin role required)

Response:
```json
{
  "totalUsers": 1234,
  "totalProducts": 5678,
  "totalOrders": 432,
  "totalRevenue": 123456.78,
  "newUsers": 45,
  "newProducts": 89,
  "pendingOrders": 12,
  "revenueChange": 12.5,
  "activeSuppliers": 234,
  "pendingVerifications": 5
}
```

#### Get Sales Data
**GET** `/admin/dashboard/sales?days=30`

Query Parameters:
- `days` (optional): Number of days to get data for (default: 30)

Response:
```json
{
  "items": [
    {
      "date": "2024-02-01",
      "sales": 12345.67,
      "orders": 23
    }
  ]
}
```

#### Get Category Statistics
**GET** `/admin/dashboard/categories`

Response:
```json
{
  "items": [
    {
      "categoryId": "uuid",
      "categoryName": "Electronics",
      "productCount": 1234,
      "revenue": 456789.12,
      "percentage": 35.5
    }
  ]
}
```

#### Get Top Products
**GET** `/admin/dashboard/top-products?limit=10`

Query Parameters:
- `limit` (optional): Number of products to return (default: 10, max: 100)

Response:
```json
{
  "items": [
    {
      "productId": "uuid",
      "productName": "Smartphone Pro",
      "salesCount": 234,
      "revenue": 123456.78,
      "change": 12.5
    }
  ]
}
```

#### Get User Statistics
**GET** `/admin/dashboard/user-stats?days=30`

Query Parameters:
- `days` (optional): Number of days (default: 30)

Response:
```json
{
  "items": [
    {
      "date": "2024-02-01",
      "newUsers": 23,
      "activeUsers": 0,
      "buyers": 15,
      "suppliers": 8
    }
  ]
}
```

#### Get Recent Activities
**GET** `/admin/dashboard/activities?limit=20`

Query Parameters:
- `limit` (optional): Number of activities (default: 20, max: 100)

Response:
```json
{
  "items": [
    {
      "id": "activity-id",
      "type": "order",
      "message": "New order ORD-123 received",
      "status": "success",
      "createdAt": "2024-02-01T12:00:00Z"
    }
  ]
}
```

### User Management

#### List Buyers
**GET** `/admin/buyers?limit=20&offset=0`

Query Parameters:
- `limit` (optional): Items per page (default: 20, max: 100)
- `offset` (optional): Items to skip (default: 0)

Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "email": "buyer@example.com",
      "fullName": "John Doe",
      "phone": "+1234567890",
      "country": "USA",
      "totalOrders": 12,
      "totalSpent": 12345.67,
      "status": "active",
      "createdAt": "2024-01-01T00:00:00Z",
      "lastActive": "2024-02-01T12:00:00Z"
    }
  ]
}
```

#### Update User Status
**PATCH** `/admin/users/:userId/status`

Request:
```json
{
  "status": "active|inactive|suspended",
  "reason": "Optional reason for status change"
}
```

Response:
```json
{
  "message": "User status updated"
}
```

### Product Management

#### List Products
**GET** `/admin/products?limit=20&offset=0&status=all&category=all`

Query Parameters:
- `limit` (optional): Items per page (default: 20, max: 100)
- `offset` (optional): Items to skip (default: 0)
- `status` (optional): Filter by status (active, inactive, pending, rejected, all)
- `category` (optional): Filter by category ID or "all"

Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Product Name",
      "description": "Product description",
      "categoryId": "uuid",
      "categoryName": "Electronics",
      "supplierId": "uuid",
      "supplierName": "Supplier Co.",
      "price": 99.99,
      "currency": "USD",
      "minOrderQty": 10,
      "stock": 100,
      "status": "active",
      "views": 1234,
      "orders": 45,
      "rating": 4.5,
      "reviewCount": 23,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-02-01T00:00:00Z"
    }
  ]
}
```

#### Update Product Status
**PATCH** `/admin/products/:productId/status`

Request:
```json
{
  "status": "active|inactive|pending|rejected",
  "reason": "Optional reason"
}
```

Response:
```json
{
  "message": "Product status updated successfully"
}
```

#### Delete Product
**DELETE** `/admin/products/:productId`

Response:
```json
{
  "message": "Product deleted successfully"
}
```

### Order Management

#### List Orders
**GET** `/admin/orders?limit=20&offset=0&status=all&paymentStatus=all`

Query Parameters:
- `limit`, `offset`: Pagination
- `status` (optional): pending, confirmed, processing, shipped, delivered, cancelled, refunded, all
- `paymentStatus` (optional): pending, paid, failed, refunded, all

Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "orderNumber": "ORD-2024-001",
      "buyerId": "uuid",
      "buyerName": "John Doe",
      "buyerCountry": "USA",
      "supplierId": "uuid",
      "supplierName": "Supplier Co.",
      "productId": "uuid",
      "productName": "Product Name",
      "quantity": 100,
      "unitPrice": 99.99,
      "totalAmount": 9999.00,
      "currency": "USD",
      "status": "pending",
      "paymentStatus": "pending",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-02-01T00:00:00Z"
    }
  ]
}
```

#### Update Order Status
**PATCH** `/admin/orders/:orderId/status`

Request:
```json
{
  "status": "pending|confirmed|processing|shipped|delivered|cancelled|refunded",
  "reason": "Optional reason"
}
```

Response:
```json
{
  "message": "Order status updated successfully"
}
```

### Supplier Management

#### List Suppliers
**GET** `/admin/suppliers?limit=20&offset=0&status=all&subscription=all`

Query Parameters:
- `limit`, `offset`: Pagination
- `status` (optional): active, inactive, suspended, pending, all
- `subscription` (optional): free, silver, gold, diamond, all

Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "companyName": "Supplier Co.",
      "contactName": "John Smith",
      "email": "john@supplier.com",
      "phone": "+1234567890",
      "country": "China",
      "city": "Shanghai",
      "verified": true,
      "status": "active",
      "subscription": "gold",
      "totalProducts": 150,
      "totalOrders": 456,
      "totalRevenue": 123456.78,
      "rating": 4.8,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Update Supplier Status
**PATCH** `/admin/suppliers/:supplierId/status`

Request:
```json
{
  "status": "active|inactive|suspended|pending",
  "reason": "Optional reason"
}
```

Response:
```json
{
  "message": "Supplier status updated successfully"
}
```

### Verification Management

#### List Verifications
**GET** `/admin/verifications?limit=20&offset=0&status=all`

Query Parameters:
- `limit`, `offset`: Pagination
- `status` (optional): pending, approved, rejected, all

Response:
```json
{
  "items": [
    {
      "id": "uuid",
      "userId": "uuid",
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "userRole": "supplier",
      "documentType": "business_license",
      "documentUrl": "https://...",
      "status": "pending",
      "submittedAt": "2024-01-01T00:00:00Z",
      "reviewedAt": null,
      "reviewedBy": null,
      "reviewMessage": null
    }
  ]
}
```

#### Review Verification
**POST** `/admin/verifications/:verificationId/review`

Request:
```json
{
  "status": "approved|rejected",
  "message": "Optional review message or reason for rejection"
}
```

Response:
```json
{
  "message": "Verification reviewed successfully"
}
```

Note: When a verification is approved, the user's `verified` status is automatically set to `true`.

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200 OK` - Success
- `201 Created` - Resource created
- `204 No Content` - Success with no response body
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions (e.g., non-admin accessing admin endpoints)
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

Not currently implemented. Consider adding rate limiting for production deployments.

## Pagination

All list endpoints support pagination with `limit` and `offset` query parameters:
- `limit`: Number of items to return (default: 20, max: 100)
- `offset`: Number of items to skip (default: 0)

## CORS

CORS is configured to allow requests from configured origins (default: `http://localhost:5173`, `http://localhost:3000`).

For production, update `CORS_ALLOWED_ORIGINS` in the `.env` file.
