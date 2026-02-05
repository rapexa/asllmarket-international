# Global Trade Hub - Backend API

Complete backend API for Global Trade Hub B2B marketplace built with Go, Gin, MySQL, and Clean Architecture.

## Tech Stack

- **Language**: Go 1.22+
- **Web Framework**: Gin
- **Database**: MySQL 8.0+
- **Configuration**: Viper
- **Authentication**: JWT (golang-jwt/jwt/v5)
- **CORS**: gin-contrib/cors
- **Password Hashing**: bcrypt

## Project Structure

```
backend/
├── cmd/api/              # Application entrypoint
│   └── main.go
├── internal/
│   ├── config/           # Configuration management (Viper)
│   ├── database/         # Database connection
│   ├── http/             # HTTP layer (router, middleware)
│   │   └── middleware/   # JWT auth, logging, etc.
│   └── domain/           # Business domains (Clean Architecture)
│       ├── auth/         # Authentication & user management
│       ├── product/      # Product catalog
│       ├── supplier/     # Supplier profiles
│       ├── order/        # Order management
│       ├── rfq/          # Request for Quotation
│       ├── notification/ # User notifications
│       ├── verification/ # KYC/KYB verification
│       └── category/     # Product categories
└── migrations/           # SQL schema migrations

Each domain follows Clean Architecture:
- model.go: Domain entities and DTOs
- repository.go: Data access layer (MySQL)
- service.go: Business logic
- handler.go: HTTP handlers (Gin)
```

## Features

### Authentication & Authorization
- User registration with role selection (buyer, supplier, market_visitor, admin)
- JWT-based authentication with access & refresh tokens
- Role-based access control (RBAC)
- Password hashing with bcrypt

### Product Management
- Full CRUD operations
- Public product catalog with pagination
- Supplier-only product creation
- Category and subcategory support
- Multi-currency pricing
- Stock management and MOQ

### Supplier Management
- Supplier profile creation and management
- Subscription plans (Free, Silver, Gold, Diamond)
- Verification status tracking
- Performance metrics (rating, response rate, response time)
- Revenue and order statistics

### Order Management
- Order creation with automatic order number generation
- Order status tracking (pending → confirmed → processing → shipped → delivered)
- Payment status management
- Shipping and tracking information
- Buyer and supplier order views
- Admin order management

### RFQ System
- Buyers can submit quote requests
- Suppliers can submit responses with pricing
- Multi-step negotiation support
- Expiration management
- Response status tracking

### Notifications
- Multi-type notifications (system, business, interaction, promotional)
- Priority levels (low, medium, high, critical)
- Read/unread status
- Action URLs for navigation
- Bulk mark-as-read

### Verification (KYC/KYB)
- Personal identity verification (passport, national ID)
- Business verification (registration, licenses)
- Email and phone verification
- Admin review workflow
- Document upload support

## Setup

### Prerequisites
- Go 1.22 or higher
- MySQL 8.0 or higher
- Make (optional, for Makefile commands)

### Installation

1. Clone the repository and navigate to backend:
```bash
cd backend
```

2. Install dependencies:
```bash
go mod download
```

3. Copy environment configuration:
```bash
cp .env.example .env
```

4. Edit `.env` with your database credentials and JWT secret.

5. Create MySQL database:
```bash
mysql -u root -p
CREATE DATABASE global_trade_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

6. Run migrations:
```bash
make migrate-up
# or manually:
mysql -u root -p global_trade_hub < migrations/001_init_schema.up.sql
```

### Running the Server

```bash
# Using Make
make run

# Or directly
go run cmd/api/main.go
```

The API will start on `http://localhost:8080` by default.

### Configuration

Configuration is managed via environment variables or `.env` file:

- `APP_ENV`: Application environment (development, production)
- `HTTP_HOST`: Server host (default: 0.0.0.0)
- `HTTP_PORT`: Server port (default: 8080)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`: MySQL connection details
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_ISSUER`: JWT issuer claim
- `CORS_*`: CORS configuration

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/me` - Get current user profile (protected)

### Products
- `GET /api/v1/products` - List products (public)
- `GET /api/v1/products/:id` - Get product details (public)
- `POST /api/v1/products` - Create product (supplier/admin only)
- `PUT /api/v1/products/:id` - Update product (supplier/admin only)
- `DELETE /api/v1/products/:id` - Delete product (supplier/admin only)

### Suppliers
- `GET /api/v1/suppliers` - List suppliers (public)
- `GET /api/v1/suppliers/:id` - Get supplier details (public)
- `GET /api/v1/suppliers/me` - Get my supplier profile (protected)
- `POST /api/v1/suppliers` - Create supplier profile (protected)
- `PUT /api/v1/suppliers/:id` - Update supplier profile (protected)
- `DELETE /api/v1/suppliers/:id` - Delete supplier profile (protected)

### Orders
- `GET /api/v1/orders` - Get my orders (buyer, protected)
- `GET /api/v1/orders/:id` - Get order details (protected)
- `POST /api/v1/orders` - Create order (buyer, protected)
- `PATCH /api/v1/orders/:id/status` - Update order status (protected)
- `GET /api/v1/orders/supplier/:supplierId` - Get supplier orders (supplier, protected)
- `GET /api/v1/admin/orders` - List all orders (admin only)
- `DELETE /api/v1/admin/orders/:id` - Delete order (admin only)

### RFQ (Request for Quotation)
- `GET /api/v1/rfqs` - Get my RFQs (buyer, protected)
- `GET /api/v1/rfqs/:id` - Get RFQ details (protected)
- `POST /api/v1/rfqs` - Create RFQ (buyer, protected)
- `GET /api/v1/rfqs/:rfqId/responses` - List RFQ responses (protected)
- `POST /api/v1/rfqs/responses` - Create RFQ response (supplier, protected)
- `GET /api/v1/admin/rfqs` - List all RFQs (admin only)

### Notifications
- `GET /api/v1/notifications` - Get my notifications (protected)
- `PATCH /api/v1/notifications/:id/read` - Mark as read (protected)
- `POST /api/v1/notifications/read-all` - Mark all as read (protected)
- `DELETE /api/v1/notifications/:id` - Delete notification (protected)

### Verifications
- `GET /api/v1/verifications/me` - Get my verification status (supplier, protected)
- `POST /api/v1/verifications` - Submit verification (supplier, protected)
- `GET /api/v1/admin/verifications` - List all verifications (admin only)
- `GET /api/v1/admin/verifications/:id` - Get verification details (admin only)
- `PATCH /api/v1/admin/verifications/:id/review` - Review verification (admin only)

### Categories
- `GET /api/v1/categories` - List all categories (public)
- `GET /api/v1/categories/:id` - Get category details (public)

### Health Check
- `GET /healthz` - Health check endpoint

## Development

### Building
```bash
make build
# Output: bin/api
```

### Testing
```bash
make test
```

### Database Migrations
```bash
# Apply migrations
make migrate-up

# Rollback migrations
make migrate-down
```

## Architecture

The project follows Clean Architecture principles:

1. **Domain Layer** (`internal/domain/*`): Core business logic, entities, and interfaces
2. **Repository Layer**: Data access abstraction (MySQL implementation)
3. **Service Layer**: Business logic orchestration
4. **Handler Layer**: HTTP request/response handling (Gin)
5. **Infrastructure Layer**: Database, configuration, middleware

### Design Patterns
- Dependency Injection
- Repository Pattern
- Service Pattern
- Middleware Pattern
- Clean Architecture / Hexagonal Architecture

## Security

- Passwords hashed with bcrypt (cost factor: 12)
- JWT tokens with configurable expiration
- CORS protection
- Request logging
- Input validation on all endpoints
- SQL injection prevention (prepared statements)

## Production Deployment

1. Set `APP_ENV=production` in environment
2. Use strong `JWT_SECRET`
3. Configure proper CORS origins
4. Use connection pooling for MySQL
5. Enable HTTPS/TLS
6. Set up monitoring and logging
7. Configure graceful shutdown timeout
8. Use environment variables (not .env file)

## License

Proprietary - Global Trade Hub
