package review

import (
	"context"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/example/global-trade-hub/backend/internal/http/middleware"
)

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

// ListByProduct returns reviews for a product (public).
func (h *Handler) ListByProduct(c *gin.Context) {
	productID := c.Param("productId")
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	list, err := h.svc.ListByProductID(ctx, productID, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if list == nil {
		list = []*Review{}
	}
	c.JSON(http.StatusOK, gin.H{"items": list})
}

// ListBySupplier returns reviews for a supplier (public).
func (h *Handler) ListBySupplier(c *gin.Context) {
	supplierID := c.Param("supplierId")
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	list, err := h.svc.ListBySupplierID(ctx, supplierID, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if list == nil {
		list = []*Review{}
	}
	c.JSON(http.StatusOK, gin.H{"items": list})
}

// CreateInput for creating a review.
type CreateInput struct {
	ProductID        string `json:"productId"`
	SupplierID       string `json:"supplierId"`
	Rating           int    `json:"rating" binding:"required,min=1,max=5"`
	Title            string `json:"title"`
	Comment          string `json:"comment" binding:"required"`
	VerifiedPurchase bool   `json:"verifiedPurchase"`
}

// Create creates a review (protected).
func (h *Handler) Create(c *gin.Context) {
	raw, ok := c.Get("claims")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing claims"})
		return
	}
	claims := raw.(*middleware.Claims)

	var in CreateInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if in.ProductID == "" && in.SupplierID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "productId or supplierId required"})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	rev, err := h.svc.Create(ctx, claims.UserID, in.ProductID, in.SupplierID, in.Rating, in.Title, in.Comment, in.VerifiedPurchase)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, rev)
}
