package admin

import (
	"context"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/example/global-trade-hub/backend/internal/domain/auth"
	"github.com/example/global-trade-hub/backend/internal/http/middleware"
)

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

// requireAdmin is a helper to check admin role
func requireAdmin(c *gin.Context) (*middleware.Claims, bool) {
	raw, ok := c.Get("claims")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing claims"})
		return nil, false
	}
	claims := raw.(*middleware.Claims)

	if claims.Role != string(auth.RoleAdmin) {
		c.JSON(http.StatusForbidden, gin.H{"error": "admin access required"})
		return nil, false
	}

	return claims, true
}

// GetDashboardStats returns dashboard statistics
func (h *Handler) GetDashboardStats(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	stats, err := h.svc.GetDashboardStats(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, stats)
}

// GetSalesData returns sales metrics over time
func (h *Handler) GetSalesData(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	days, _ := strconv.Atoi(c.DefaultQuery("days", "30"))
	if days <= 0 || days > 365 {
		days = 30
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	data, err := h.svc.GetSalesData(ctx, days)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": data})
}

// GetCategoryStats returns category distribution statistics
func (h *Handler) GetCategoryStats(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	stats, err := h.svc.GetCategoryStats(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": stats})
}

// GetTopProducts returns best-selling products
func (h *Handler) GetTopProducts(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	if limit <= 0 || limit > 100 {
		limit = 10
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	products, err := h.svc.GetTopProducts(ctx, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": products})
}

// GetUserStats returns user growth metrics
func (h *Handler) GetUserStats(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	days, _ := strconv.Atoi(c.DefaultQuery("days", "30"))
	if days <= 0 || days > 365 {
		days = 30
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	stats, err := h.svc.GetUserStats(ctx, days)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": stats})
}

// GetRecentActivities returns recent platform activities
func (h *Handler) GetRecentActivities(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	if limit <= 0 || limit > 100 {
		limit = 20
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	activities, err := h.svc.GetRecentActivities(ctx, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": activities})
}

// ListBuyers returns all buyers with their statistics
func (h *Handler) ListBuyers(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	buyers, err := h.svc.ListBuyers(ctx, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": buyers})
}

// UpdateUserStatus updates a user's status (active, inactive, suspended)
func (h *Handler) UpdateUserStatus(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	userID := c.Param("userId")

	var input UpdateUserStatusInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	if err := h.svc.UpdateUserStatus(ctx, userID, input.Status); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User status updated"})
}

// ListProducts returns all products for admin
func (h *Handler) ListProducts(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	status := c.DefaultQuery("status", "all")
	category := c.DefaultQuery("category", "all")

	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	products, err := h.svc.ListProducts(ctx, limit, offset, status, category)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": products})
}

// UpdateProductStatus updates a product's status
func (h *Handler) UpdateProductStatus(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	productID := c.Param("productId")

	var input UpdateProductStatusInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	if err := h.svc.UpdateProductStatus(ctx, productID, &input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Product status updated successfully"})
}

// DeleteProduct soft deletes a product
func (h *Handler) DeleteProduct(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	productID := c.Param("productId")

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	if err := h.svc.DeleteProduct(ctx, productID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Product deleted successfully"})
}

// ListOrders returns all orders for admin
func (h *Handler) ListOrders(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	status := c.DefaultQuery("status", "all")
	paymentStatus := c.DefaultQuery("paymentStatus", "all")

	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	orders, err := h.svc.ListOrders(ctx, limit, offset, status, paymentStatus)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": orders})
}

// UpdateOrderStatus updates an order's status
func (h *Handler) UpdateOrderStatus(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	orderID := c.Param("orderId")

	var input UpdateOrderStatusInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	if err := h.svc.UpdateOrderStatus(ctx, orderID, &input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order status updated successfully"})
}

// ListSuppliers returns all suppliers for admin
func (h *Handler) ListSuppliers(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	status := c.DefaultQuery("status", "all")
	subscription := c.DefaultQuery("subscription", "all")

	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	suppliers, err := h.svc.ListSuppliers(ctx, limit, offset, status, subscription)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": suppliers})
}

// UpdateSupplierStatus updates a supplier's status
func (h *Handler) UpdateSupplierStatus(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	supplierID := c.Param("supplierId")

	var input UpdateSupplierStatusInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	if err := h.svc.UpdateSupplierStatus(ctx, supplierID, &input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Supplier status updated successfully"})
}

// ListVerifications returns all verification requests
func (h *Handler) ListVerifications(c *gin.Context) {
	if _, ok := requireAdmin(c); !ok {
		return
	}

	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	status := c.DefaultQuery("status", "all")

	if limit <= 0 || limit > 100 {
		limit = 20
	}
	if offset < 0 {
		offset = 0
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	verifications, err := h.svc.ListVerifications(ctx, limit, offset, status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": verifications})
}

// ReviewVerification approves or rejects a verification request
func (h *Handler) ReviewVerification(c *gin.Context) {
	adminUser, ok := requireAdmin(c)
	if !ok {
		return
	}

	verificationID := c.Param("verificationId")

	var input ReviewVerificationInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	if err := h.svc.ReviewVerification(ctx, verificationID, adminUser.ID, &input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Verification reviewed successfully"})
}
