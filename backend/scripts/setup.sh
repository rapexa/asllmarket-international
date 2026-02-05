#!/bin/bash

set -e

echo "🚀 Setting up Global Trade Hub Backend..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env with your configuration before running the app"
fi

# Install dependencies
echo "📦 Installing Go dependencies..."
go mod download
go mod tidy

# Start MySQL with Docker Compose
echo "🐳 Starting MySQL database..."
docker-compose up -d mysql

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL to be ready..."
sleep 10

# Run migrations
echo "🗄️  Running database migrations..."
make migrate-up || echo "⚠️  Migrations may have already been applied"

echo "✅ Setup complete!"
echo ""
echo "To start the server, run:"
echo "  make run"
echo ""
echo "Or:"
echo "  go run cmd/api/main.go"
