package http

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/example/global-trade-hub/backend/internal/config"
	"github.com/example/global-trade-hub/backend/internal/domain/admin"
	"github.com/example/global-trade-hub/backend/internal/domain/auth"
	"github.com/example/global-trade-hub/backend/internal/domain/category"
	"github.com/example/global-trade-hub/backend/internal/domain/cms"
	"github.com/example/global-trade-hub/backend/internal/domain/message"
	"github.com/example/global-trade-hub/backend/internal/domain/notification"
	"github.com/example/global-trade-hub/backend/internal/domain/order"
	"github.com/example/global-trade-hub/backend/internal/domain/product"
	"github.com/example/global-trade-hub/backend/internal/domain/rfq"
	"github.com/example/global-trade-hub/backend/internal/domain/search"
	"github.com/example/global-trade-hub/backend/internal/domain/subscription"
	"github.com/example/global-trade-hub/backend/internal/domain/supplier"
	"github.com/example/global-trade-hub/backend/internal/domain/verification"
	mw "github.com/example/global-trade-hub/backend/internal/http/middleware"
)

// NewRouter constructs the Gin engine, configures middlewares (CORS, recovery,
// logging, JWT auth) and wires all HTTP handlers for the domain modules.
func NewRouter(
	cfg *config.Config,
	logger *log.Logger,
	authService *auth.Service,
	productService *product.Service,
	supplierService *supplier.Service,
	orderService *order.Service,
	rfqService *rfq.Service,
	notificationService *notification.Service,
	verificationService *verification.Service,
	subscriptionService *subscription.Service,
	messageService *message.Service,
	searchService *search.Service,
	adminService *admin.Service,
	cmsService *cms.Service,
) *gin.Engine {
	if cfg.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.New()

	// Global middlewares
	router.Use(gin.Recovery())
	router.Use(mw.RequestLogger(logger))

	// CORS
	corsCfg := cors.Config{
		AllowOrigins:     cfg.CORSAllowedOrigins,
		AllowMethods:     cfg.CORSAllowedMethods,
		AllowHeaders:     cfg.CORSAllowedHeaders,
		AllowCredentials: cfg.CORSAllowCredentials,
	}
	corsCfg.AllowWildcard = true
	router.Use(cors.New(corsCfg))

	// Health check
	router.GET("/healthz", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// Domain handlers
	authHandler := auth.NewHandler(authService)
	productHandler := product.NewHandler(productService)
	supplierHandler := supplier.NewHandler(supplierService)
	orderHandler := order.NewHandler(orderService)
	rfqHandler := rfq.NewHandler(rfqService)
	notificationHandler := notification.NewHandler(notificationService)
	verificationHandler := verification.NewHandler(verificationService)
	subscriptionHandler := subscription.NewHandler(subscriptionService)
	messageHandler := message.NewHandler(messageService)
	searchHandler := search.NewHandler(searchService)
	categoryHandler := category.NewHandler()
	adminHandler := admin.NewHandler(adminService)
	cmsHandler := cms.NewHandler(cmsService)

	api := router.Group("/api/v1")

	// Public CMS endpoints (no auth)
	api.POST("/contact", cmsHandler.SubmitContact)
	api.GET("/blog-posts", cmsHandler.ListBlogPosts)
	api.GET("/blog-posts/:id", cmsHandler.GetBlogPost)
	api.GET("/faqs", cmsHandler.ListFAQs)
	api.GET("/jobs", cmsHandler.ListJobs)
	api.GET("/press-releases", cmsHandler.ListPressReleases)

	// Auth
	authGroup := api.Group("/auth")
	{
		authGroup.POST("/register", authHandler.Register)
		authGroup.POST("/login", authHandler.Login)
		authGroup.POST("/refresh", authHandler.RefreshToken)
	}

	// Protected routes (JWT)
	protected := api.Group("/")
	protected.Use(mw.JWTAuth(cfg.JWTSecret))

	{
		protected.GET("/me", authHandler.Me)
	}

	// Products (public read, protected write)
	api.GET("/products", productHandler.List)
	api.GET("/products/:id", productHandler.GetByID)

	protectedProducts := protected.Group("/products")
	{
		// Only supplier or admin should be allowed to create/update products.
		// Role-based check is done in handler using claims.
		protectedProducts.POST("", productHandler.Create)
		protectedProducts.PUT("/:id", productHandler.Update)
		protectedProducts.DELETE("/:id", productHandler.Delete)
	}

	// Suppliers (public read, protected write)
	api.GET("/suppliers", supplierHandler.List)
	api.GET("/suppliers/:id", supplierHandler.GetByID)

	protectedSuppliers := protected.Group("/suppliers")
	{
		protectedSuppliers.GET("/me", supplierHandler.GetMyProfile)
		protectedSuppliers.POST("", supplierHandler.Create)
		protectedSuppliers.PUT("/:id", supplierHandler.Update)
		protectedSuppliers.DELETE("/:id", supplierHandler.Delete)
	}

	// Orders (protected)
	protectedOrders := protected.Group("/orders")
	{
		protectedOrders.GET("", orderHandler.GetMyOrders)
		protectedOrders.GET("/:id", orderHandler.GetByID)
		protectedOrders.POST("", orderHandler.Create)
		protectedOrders.PATCH("/:id/status", orderHandler.UpdateStatus)
		protectedOrders.GET("/supplier/:supplierId", orderHandler.GetSupplierOrders)
	}

	// RFQs (protected)
	protectedRFQs := protected.Group("/rfqs")
	{
		protectedRFQs.GET("", rfqHandler.GetMyRFQs)
		protectedRFQs.POST("", rfqHandler.Create)
		// Specific routes must come before generic :id route
		protectedRFQs.GET("/:id/responses", rfqHandler.ListResponses)
		protectedRFQs.POST("/responses", rfqHandler.CreateResponse)
		// Generic :id route must be last
		protectedRFQs.GET("/:id", rfqHandler.GetByID)
	}

	// Admin RFQs endpoint
	adminRFQs := protected.Group("/admin/rfqs")
	{
		adminRFQs.GET("", rfqHandler.ListRFQs)
	}

	// Notifications (protected)
	protectedNotifications := protected.Group("/notifications")
	{
		protectedNotifications.GET("", notificationHandler.GetMyNotifications)
		protectedNotifications.PATCH("/:id/read", notificationHandler.MarkAsRead)
		protectedNotifications.POST("/read-all", notificationHandler.MarkAllAsRead)
		protectedNotifications.DELETE("/:id", notificationHandler.Delete)
	}

	// Verifications (protected)
	protectedVerifications := protected.Group("/verifications")
	{
		protectedVerifications.GET("/me", verificationHandler.GetMyVerification)
		protectedVerifications.POST("", verificationHandler.Submit)
	}

	// Categories (public read-only, static data)
	api.GET("/categories", categoryHandler.List)
	api.GET("/categories/:id", categoryHandler.GetByID)

	// Search (public)
	api.GET("/search", searchHandler.Search)

	// Subscriptions (protected)
	protectedSubscriptions := protected.Group("/subscriptions")
	{
		protectedSubscriptions.GET("/me", subscriptionHandler.GetMySubscription)
		protectedSubscriptions.POST("", subscriptionHandler.Create)
		protectedSubscriptions.PATCH("/:id/cancel", subscriptionHandler.Cancel)
	}

	// Admin subscriptions
	adminSubscriptions := protected.Group("/admin/subscriptions")
	{
		adminSubscriptions.GET("", subscriptionHandler.List)
		adminSubscriptions.GET("/:id", subscriptionHandler.GetByID)
		adminSubscriptions.DELETE("/:id", subscriptionHandler.Delete)
	}

	// Messages (protected)
	protectedMessages := protected.Group("/messages")
	{
		protectedMessages.GET("/conversations", messageHandler.ListConversations)
		protectedMessages.GET("/conversations/:conversationId", messageHandler.ListMessages)
		protectedMessages.GET("/:id", messageHandler.GetByID)
		protectedMessages.POST("", messageHandler.Create)
		protectedMessages.PATCH("/:id/read", messageHandler.MarkAsRead)
		protectedMessages.DELETE("/:id", messageHandler.Delete)
	}

	// Admin dashboard and analytics
	adminDashboard := protected.Group("/admin")
	{
		// Dashboard endpoints
		adminDashboard.GET("/dashboard/stats", adminHandler.GetDashboardStats)
		adminDashboard.GET("/dashboard/sales", adminHandler.GetSalesData)
		adminDashboard.GET("/dashboard/categories", adminHandler.GetCategoryStats)
		adminDashboard.GET("/dashboard/top-products", adminHandler.GetTopProducts)
		adminDashboard.GET("/dashboard/user-stats", adminHandler.GetUserStats)
		adminDashboard.GET("/dashboard/activities", adminHandler.GetRecentActivities)

		// User management endpoints
		adminDashboard.GET("/buyers", adminHandler.ListBuyers)
		adminDashboard.PATCH("/users/:userId/status", adminHandler.UpdateUserStatus)

		// Product management endpoints
		adminDashboard.GET("/products", adminHandler.ListProducts)
		adminDashboard.PATCH("/products/:productId/status", adminHandler.UpdateProductStatus)
		adminDashboard.DELETE("/products/:productId", adminHandler.DeleteProduct)

		// Order management endpoints
		adminDashboard.GET("/orders", adminHandler.ListOrders)
		adminDashboard.PATCH("/orders/:orderId/status", adminHandler.UpdateOrderStatus)
		adminDashboard.DELETE("/orders/:id", orderHandler.Delete)

		// Supplier management endpoints
		adminDashboard.GET("/suppliers", adminHandler.ListSuppliers)
		adminDashboard.PATCH("/suppliers/:supplierId/status", adminHandler.UpdateSupplierStatus)

		// Verification management endpoints
		adminDashboard.GET("/verifications", adminHandler.ListVerifications)
		adminDashboard.GET("/verifications/:id", verificationHandler.GetByID)
		adminDashboard.POST("/verifications/:verificationId/review", adminHandler.ReviewVerification)
		adminDashboard.PATCH("/verifications/:id/review", verificationHandler.Review)
	}

	return router
}
