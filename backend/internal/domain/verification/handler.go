package verification

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

// List returns all verifications (admin only).
func (h *Handler) List(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	verifications, err := h.svc.List(ctx, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": verifications})
}

// GetByID returns a single verification.
func (h *Handler) GetByID(c *gin.Context) {
	id := c.Param("id")

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	verification, err := h.svc.GetByID(ctx, id)
	if err != nil {
		if err == ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "verification not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, verification)
}

// GetMyVerification returns the verification for the authenticated supplier.
func (h *Handler) GetMyVerification(c *gin.Context) {
	raw, ok := c.Get("claims")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing claims"})
		return
	}
	claims := raw.(*middleware.Claims)

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	verification, err := h.svc.GetBySupplierID(ctx, claims.UserID)
	if err != nil {
		if err == ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "verification not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, verification)
}

// Submit creates a new verification request.
func (h *Handler) Submit(c *gin.Context) {
	var in SubmitVerificationInput
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

	// Only suppliers can submit verification
	if claims.Role != string(auth.RoleSupplier) {
		c.JSON(http.StatusForbidden, gin.H{"error": "only suppliers can submit verification"})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	verification, err := h.svc.Submit(ctx, claims.UserID, in)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, verification)
}

// Review allows admin to review a verification request.
func (h *Handler) Review(c *gin.Context) {
	var in ReviewVerificationInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	id := c.Param("id")

	raw, ok := c.Get("claims")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing claims"})
		return
	}
	claims := raw.(*middleware.Claims)

	// Only admin can review
	if claims.Role != string(auth.RoleAdmin) {
		c.JSON(http.StatusForbidden, gin.H{"error": "only admins can review verifications"})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	verification, err := h.svc.Review(ctx, id, claims.UserID, in)
	if err != nil {
		if err == ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "verification not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, verification)
}
