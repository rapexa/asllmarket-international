package order

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

// List returns all orders (admin only).
func (h *Handler) List(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	orders, err := h.svc.List(ctx, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": orders})
}

// GetMyOrders returns orders for the authenticated buyer.
func (h *Handler) GetMyOrders(c *gin.Context) {
	raw, ok := c.Get("claims")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing claims"})
		return
	}
	claims := raw.(*middleware.Claims)

	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	orders, err := h.svc.ListByBuyerID(ctx, claims.UserID, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": orders})
}

// GetSupplierOrders returns orders for a supplier.
func (h *Handler) GetSupplierOrders(c *gin.Context) {
	raw, ok := c.Get("claims")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing claims"})
		return
	}
	claims := raw.(*middleware.Claims)

	// Ensure user is supplier or admin
	if claims.Role != string(auth.RoleSupplier) && claims.Role != string(auth.RoleAdmin) {
		c.JSON(http.StatusForbidden, gin.H{"error": "access denied"})
		return
	}

	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	supplierID := c.Param("supplierId")

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	orders, err := h.svc.ListBySupplierID(ctx, supplierID, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": orders})
}

// GetByID returns a single order.
func (h *Handler) GetByID(c *gin.Context) {
	id := c.Param("id")

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	order, err := h.svc.GetByID(ctx, id)
	if err != nil {
		if err == ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "order not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, order)
}

// Create creates a new order.
func (h *Handler) Create(c *gin.Context) {
	var in CreateOrderInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	raw, ok := c.Get("claims")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing claims"})
		return
	}
	claims := raw.(*middleware.Claims)

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	order, err := h.svc.Create(ctx, claims.UserID, in)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, order)
}

// UpdateStatus updates the order status.
func (h *Handler) UpdateStatus(c *gin.Context) {
	var in UpdateOrderStatusInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	id := c.Param("id")

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	order, err := h.svc.UpdateStatus(ctx, id, in)
	if err != nil {
		if err == ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "order not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, order)
}

// Delete deletes an order (admin only).
func (h *Handler) Delete(c *gin.Context) {
	id := c.Param("id")

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	if err := h.svc.Delete(ctx, id); err != nil {
		if err == ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "order not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}
