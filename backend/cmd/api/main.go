package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/example/global-trade-hub/backend/internal/config"
	"github.com/example/global-trade-hub/backend/internal/database"
	"github.com/example/global-trade-hub/backend/internal/domain/admin"
	"github.com/example/global-trade-hub/backend/internal/domain/auth"
	"github.com/example/global-trade-hub/backend/internal/domain/message"
	"github.com/example/global-trade-hub/backend/internal/domain/notification"
	"github.com/example/global-trade-hub/backend/internal/domain/order"
	"github.com/example/global-trade-hub/backend/internal/domain/product"
	"github.com/example/global-trade-hub/backend/internal/domain/rfq"
	"github.com/example/global-trade-hub/backend/internal/domain/search"
	"github.com/example/global-trade-hub/backend/internal/domain/subscription"
	"github.com/example/global-trade-hub/backend/internal/domain/supplier"
	"github.com/example/global-trade-hub/backend/internal/domain/verification"
	httpi "github.com/example/global-trade-hub/backend/internal/http"
)

func main() {
	// Load configuration (from env / config file)
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	// Initialize base logger
	logger := log.New(os.Stdout, "[api] ", log.LstdFlags|log.Lshortfile)

	// Run automatic database migrations (ensures core tables like users exist)
	if err := database.AutoMigrate(cfg); err != nil {
		logger.Fatalf("failed to run database migrations: %v", err)
	}

	// Initialize database connection
	db, err := database.OpenMySQL(cfg)
	if err != nil {
		logger.Fatalf("failed to connect to database: %v", err)
	}
	defer db.Close()

	// Initialize repositories & services (domain layer)
	authRepo := auth.NewMySQLUserRepository(db)
	authService := auth.NewService(authRepo, cfg.JWTSecret, cfg.JWTIssuer)

	productRepo := product.NewMySQLProductRepository(db)
	productService := product.NewService(productRepo)

	supplierRepo := supplier.NewMySQLSupplierRepository(db)
	supplierService := supplier.NewService(supplierRepo)

	orderRepo := order.NewMySQLOrderRepository(db)
	orderService := order.NewService(orderRepo)

	rfqRepo := rfq.NewMySQLRFQRepository(db)
	rfqService := rfq.NewService(rfqRepo)

	notificationRepo := notification.NewMySQLNotificationRepository(db)
	notificationService := notification.NewService(notificationRepo)

	verificationRepo := verification.NewMySQLVerificationRepository(db)
	verificationService := verification.NewService(verificationRepo)

	subscriptionRepo := subscription.NewMySQLSubscriptionRepository(db)
	subscriptionService := subscription.NewService(subscriptionRepo)

	messageRepo := message.NewMySQLMessageRepository(db)
	messageService := message.NewService(messageRepo)

	searchService := search.NewService(db)

	adminService := admin.NewService(db)

	// Build HTTP server (Gin, routes, middlewares)
	router := httpi.NewRouter(cfg, logger, authService, productService, supplierService, orderService, rfqService, notificationService, verificationService, subscriptionService, messageService, searchService, adminService)

	srv := &http.Server{
		Addr:         cfg.HTTPAddress(),
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in background
	go func() {
		logger.Printf("starting HTTP server on %s", cfg.HTTPAddress())
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatalf("server error: %v", err)
		}
	}()

	// Graceful shutdown
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	<-stop

	logger.Println("shutting down server...")
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Printf("graceful shutdown failed: %v", err)
	} else {
		logger.Println("server stopped gracefully")
	}
}
