.PHONY: help run build test clean migrate-up migrate-down migrate-create

help: ## Show this help
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'

run: ## Run the application
	go run cmd/api/main.go

build: ## Build the application
	go build -o bin/api cmd/api/main.go

test: ## Run tests
	go test -v ./...

clean: ## Clean build artifacts
	rm -rf bin/

migrate-up: ## Apply database migrations
	@echo "Applying migrations..."
	mysql -u$(DB_USER) -p$(DB_PASS) -h$(DB_HOST) -P$(DB_PORT) $(DB_NAME) < migrations/001_init_schema.up.sql

migrate-down: ## Rollback database migrations
	@echo "Rolling back migrations..."
	mysql -u$(DB_USER) -p$(DB_PASS) -h$(DB_HOST) -P$(DB_PORT) $(DB_NAME) < migrations/001_init_schema.down.sql

migrate-alibaba: ## Apply Alibaba categories (012) - run after seed data
	@echo "Applying Alibaba categories..."
	mysql -u$(DB_USER) -p$(DB_PASS) -h$(DB_HOST) -P$(DB_PORT) $(DB_NAME) < migrations/012_alibaba_categories.up.sql

deps: ## Download dependencies
	go mod download
	go mod tidy
