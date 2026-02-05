# Getting Started with Global Trade Hub

This guide will help you set up and run the Global Trade Hub platform locally for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Go**: Version 1.22 or higher ([Download](https://go.dev/dl/))
- **Node.js**: Version 18 or higher ([Download](https://nodejs.org/))
- **MySQL**: Version 8.0 or higher ([Download](https://dev.mysql.com/downloads/))
- **Docker** (optional, for easier MySQL setup): ([Download](https://www.docker.com/))
- **Git**: For version control

## Step-by-Step Setup

### 1. Clone the Repository

```bash
cd ~/Desktop
git clone <repository-url> global-trade-hub
cd global-trade-hub
```

### 2. Backend Setup

#### Option A: Using Docker (Recommended for Quick Start)

```bash
cd backend

# Copy environment file
cp .env.example .env

# Run the automated setup script
./scripts/setup.sh

# The script will:
# - Install Go dependencies
# - Start MySQL in Docker
# - Run database migrations
# - Create sample data
```

#### Option B: Manual Setup

```bash
cd backend

# 1. Copy environment file
cp .env.example .env

# 2. Edit .env with your MySQL credentials
nano .env  # or use your preferred editor

# 3. Install Go dependencies
go mod download

# 4. Create MySQL database
mysql -u root -p
# In MySQL shell:
CREATE DATABASE global_trade_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'gthuser'@'localhost' IDENTIFIED BY 'gthpassword';
GRANT ALL PRIVILEGES ON global_trade_hub.* TO 'gthuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 5. Update .env with the credentials
DB_USER=gthuser
DB_PASS=gthpassword

# 6. Run migrations
mysql -u gthuser -p global_trade_hub < migrations/001_init_schema.up.sql
mysql -u gthuser -p global_trade_hub < migrations/002_seed_data.up.sql

# 7. Start the backend server
go run cmd/api/main.go
```

The backend should now be running at `http://localhost:8080`

#### Verify Backend is Running

```bash
curl http://localhost:8080/healthz
# Expected: {"status":"ok"}
```

### 3. Frontend Setup

Open a new terminal window:

```bash
cd global-trade-hub  # (root directory)

# 1. Install dependencies
npm install
# or if you prefer:
# yarn install
# pnpm install

# 2. Environment is already configured (.env created)
# If not, copy it:
cp .env.example .env

# 3. Start development server
npm run dev
```

The frontend should now be running at `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api/v1
- **Health Check**: http://localhost:8080/healthz

## Test Accounts

The seed data includes these test accounts (password for all: `Admin123!`):

| Email | Role | Description |
|-------|------|-------------|
| admin@globaltradehub.com | Admin | Full admin access |
| buyer@example.com | Buyer | Test buyer account |
| supplier1@example.com | Supplier | Verified supplier (Gold plan) |
| supplier2@example.com | Supplier | Verified supplier (Diamond plan) |

## Next Steps

### Explore the Platform

1. **Register a new account**: http://localhost:5173/register
2. **Browse products**: http://localhost:5173/products
3. **View suppliers**: http://localhost:5173/suppliers
4. **Admin dashboard**: http://localhost:5173/admin (use admin account)

### Development Workflow

#### Backend Development

```bash
cd backend

# Run with auto-reload (install air first)
go install github.com/cosmtrek/air@latest
air

# Run tests
go test ./...

# Build binary
make build

# View logs
# Logs are output to stdout
```

#### Frontend Development

```bash
# Development server (auto-reload enabled)
npm run dev

# Type checking
npm run type-check  # if configured

# Linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### API Testing

#### Using cURL

```bash
# Login to get token
TOKEN=$(curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"buyer@example.com","password":"Admin123!"}' \
  | jq -r '.token')

# Use token for authenticated requests
curl http://localhost:8080/api/v1/me \
  -H "Authorization: Bearer $TOKEN"
```

#### Using Postman

Import the collection:
```bash
# Open Postman and import:
backend/postman_collection.json
```

### Database Management

```bash
cd backend

# View current data
mysql -u gthuser -p global_trade_hub

# Run migrations
make migrate-up

# Rollback migrations
make migrate-down

# Backup database
mysqldump -u gthuser -p global_trade_hub > backup.sql

# Restore database
mysql -u gthuser -p global_trade_hub < backup.sql
```

## Common Issues & Solutions

### Issue: Port 8080 already in use

**Solution**: Kill the process using port 8080 or change the port in `.env`:
```bash
# Find process
lsof -i :8080

# Kill it
kill -9 <PID>

# Or change port in backend/.env
HTTP_PORT=8081
```

### Issue: MySQL connection refused

**Solution**: Ensure MySQL is running:
```bash
# Check MySQL status
sudo systemctl status mysql  # Linux
brew services list  # macOS with Homebrew

# Start MySQL
sudo systemctl start mysql  # Linux
brew services start mysql  # macOS
```

### Issue: Cannot connect to backend from frontend

**Solution**: Check CORS settings in `backend/.env`:
```bash
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Issue: Database migration fails

**Solution**: Ensure database exists and user has proper permissions:
```sql
SHOW DATABASES;
SHOW GRANTS FOR 'gthuser'@'localhost';
```

## IDE Setup

### VS Code (Recommended)

Install these extensions:
- Go (golang.go)
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens

### Recommended Settings

Create `.vscode/settings.json`:
```json
{
  "go.useLanguageServer": true,
  "go.lintTool": "golangci-lint",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

## Development Tips

1. **Hot Reload**: Both frontend (Vite) and backend (with air) support hot reload
2. **API Documentation**: See `backend/API.md` for complete API reference
3. **Database Schema**: See `backend/migrations/001_init_schema.up.sql`
4. **Code Structure**: Backend follows Clean Architecture (handler → service → repository)

## Additional Resources

- [Backend README](backend/README.md) - Detailed backend documentation
- [API Documentation](backend/API.md) - Complete API reference
- [Deployment Guide](DEPLOYMENT.md) - Production deployment instructions

## Getting Help

If you encounter any issues:

1. Check this guide and the main README
2. Search existing issues on GitHub
3. Check application logs (backend stdout, browser console)
4. Review the API documentation

## What's Next?

- Explore the codebase structure
- Try creating products, orders, and RFQs
- Test the admin panel features
- Customize the platform for your needs
- Read the deployment guide when ready for production

---

Happy coding! 🚀
