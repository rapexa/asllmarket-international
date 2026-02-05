# Global Trade Hub

A comprehensive B2B marketplace platform connecting buyers and suppliers globally. Built with modern technologies for scalability, performance, and excellent user experience.

## Project Structure

```
global-trade-hub/
├── backend/              # Go backend API (Clean Architecture)
│   ├── cmd/api/         # Application entrypoint
│   ├── internal/        # Internal packages
│   │   ├── config/      # Configuration management
│   │   ├── database/    # Database connection
│   │   ├── http/        # HTTP layer (router, middleware)
│   │   └── domain/      # Business domains
│   │       ├── auth/
│   │       ├── product/
│   │       ├── supplier/
│   │       ├── order/
│   │       ├── rfq/
│   │       ├── notification/
│   │       ├── verification/
│   │       ├── subscription/
│   │       ├── message/
│   │       ├── category/
│   │       └── search/
│   ├── migrations/      # SQL schema migrations
│   └── scripts/         # Setup and utility scripts
│
└── src/                 # React frontend (Vite + TypeScript)
    ├── components/      # React components
    ├── contexts/        # React contexts (Language, Theme, Cart, Notification, Auth)
    ├── pages/           # Page components
    ├── services/        # API service layer
    ├── types/           # TypeScript types
    └── lib/             # Utilities and i18n

```

## Tech Stack

### Backend
- **Language**: Go 1.22+
- **Web Framework**: Gin
- **Database**: MySQL 8.0+
- **Configuration**: Viper
- **Authentication**: JWT
- **Architecture**: Clean Architecture (Handler → Service → Repository)

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn-ui
- **Routing**: React Router v6
- **State Management**: React Context API + React Query
- **Internationalization**: i18next (English, Persian, Arabic)
- **Form Validation**: Zod + React Hook Form

## Features

### Core Platform Features
- **Multi-language Support**: English, Persian (Farsi), Arabic with RTL support
- **Multi-role System**: Buyer, Supplier, Market Visitor, Admin
- **Dark/Light Theme**: System-wide theme support
- **Responsive Design**: Mobile-first approach with beautiful UI

### Business Features
- **Product Catalog**: Advanced filtering, sorting, multiple view modes
- **Supplier Profiles**: Verified suppliers with ratings and statistics
- **RFQ System**: Request for Quotation with supplier responses
- **Order Management**: Complete order lifecycle tracking
- **Shopping Cart**: Multi-supplier cart with grouping
- **Notifications**: Real-time notifications with categorization
- **Verification**: KYC/KYB verification for suppliers
- **Subscription Plans**: Tiered plans (Free, Silver, Gold, Diamond)
- **Messaging**: Direct communication between buyers and suppliers
- **Advanced Search**: Text, image, and video search capabilities
- **Admin Dashboard**: Comprehensive admin panel for platform management

## Quick Start

### Prerequisites
- **Backend**: Go 1.22+, MySQL 8.0+, Docker (optional)
- **Frontend**: Node.js 18+, npm/yarn/pnpm

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Run setup script (starts MySQL with Docker and runs migrations):
```bash
./scripts/setup.sh
```

3. Or manual setup:
```bash
# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# Then install dependencies
go mod download

# Start MySQL (with Docker)
docker-compose up -d mysql

# Run migrations
make migrate-up

# Start server
make run
```

The backend API will be available at `http://localhost:8080`

See [backend/README.md](backend/README.md) for detailed documentation.

### Frontend Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Edit `.env` to set the backend API URL (default: `http://localhost:8080/api/v1`)

4. Start development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The frontend will be available at `http://localhost:5173`

## API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/me` - Get current user

### Product Endpoints
- `GET /api/v1/products` - List products
- `GET /api/v1/products/:id` - Get product
- `POST /api/v1/products` - Create product (supplier/admin)
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

### Supplier Endpoints
- `GET /api/v1/suppliers` - List suppliers
- `GET /api/v1/suppliers/:id` - Get supplier
- `GET /api/v1/suppliers/me` - Get my profile
- `POST /api/v1/suppliers` - Create profile
- `PUT /api/v1/suppliers/:id` - Update profile

### Order Endpoints
- `GET /api/v1/orders` - Get my orders
- `POST /api/v1/orders` - Create order
- `PATCH /api/v1/orders/:id/status` - Update status
- `GET /api/v1/admin/orders` - Admin: List all orders

### RFQ Endpoints
- `GET /api/v1/rfqs` - Get my RFQs
- `POST /api/v1/rfqs` - Create RFQ
- `GET /api/v1/rfqs/:rfqId/responses` - List responses
- `POST /api/v1/rfqs/responses` - Create response (supplier)

### Notification Endpoints
- `GET /api/v1/notifications` - Get my notifications
- `PATCH /api/v1/notifications/:id/read` - Mark as read
- `POST /api/v1/notifications/read-all` - Mark all as read

### Verification Endpoints
- `GET /api/v1/verifications/me` - Get my verification
- `POST /api/v1/verifications` - Submit verification
- `GET /api/v1/admin/verifications` - Admin: List verifications
- `PATCH /api/v1/admin/verifications/:id/review` - Admin: Review verification

### Subscription Endpoints
- `GET /api/v1/subscriptions/me` - Get my subscription
- `POST /api/v1/subscriptions` - Create subscription
- `PATCH /api/v1/subscriptions/:id/cancel` - Cancel subscription

### Message Endpoints
- `GET /api/v1/messages/conversations` - List conversations
- `GET /api/v1/messages/conversations/:id` - Get messages
- `POST /api/v1/messages` - Send message
- `PATCH /api/v1/messages/:id/read` - Mark as read

### Search Endpoint
- `GET /api/v1/search?q=query` - Unified search

### Category Endpoints
- `GET /api/v1/categories` - List categories
- `GET /api/v1/categories/:id` - Get category

## Development

### Backend Development
```bash
cd backend

# Run with hot reload (using air - install first: go install github.com/cosmtrek/air@latest)
air

# Run tests
go test ./...

# Build
make build
```

### Frontend Development
```bash
# Run dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Database Schema

The platform uses MySQL with the following main tables:
- `users` - User accounts and authentication
- `suppliers` - Supplier profiles and statistics
- `products` - Product catalog
- `categories` & `subcategories` - Product categorization
- `orders` - Order transactions
- `rfqs` & `rfq_responses` - Quote requests and responses
- `notifications` - User notifications
- `verifications` - KYC/KYB verification records
- `subscriptions` - Supplier subscription plans
- `messages` - User communications
- `reviews` - Product and supplier reviews
- `favorites` - User favorite products

## Architecture

### Backend (Clean Architecture)
Each domain follows a layered architecture:
1. **Model Layer**: Domain entities and DTOs
2. **Repository Layer**: Data access with MySQL
3. **Service Layer**: Business logic
4. **Handler Layer**: HTTP handlers (Gin)

### Frontend
- **Component-based**: Reusable React components
- **Context API**: Global state management (Auth, Cart, Theme, Language, Notifications)
- **Service Layer**: API communication abstraction
- **Type Safety**: Full TypeScript coverage

## Security

- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- CORS protection
- Input validation (frontend: Zod, backend: Gin binding)
- SQL injection prevention (prepared statements)
- Role-based access control (RBAC)

## Deployment

### Backend
- Use Docker for MySQL in production
- Set `APP_ENV=production`
- Use strong JWT secrets
- Enable HTTPS/TLS
- Configure proper CORS origins
- Use environment variables

### Frontend
- Build with `npm run build`
- Deploy `dist/` folder to CDN or static hosting
- Configure API URL via environment variables
- Enable HTTPS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Proprietary - Global Trade Hub

---

**Built with ❤️ for global B2B trade**
