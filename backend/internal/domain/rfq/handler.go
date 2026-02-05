package rfq

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

// ListRFQs returns all RFQs (admin endpoint).
func (h *Handler) ListRFQs(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	rfqs, err := h.svc.ListRFQs(ctx, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": rfqs})
}

// GetMyRFQs returns RFQs for the authenticated buyer.
func (h *Handler) GetMyRFQs(c *gin.Context) {
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

	rfqs, err := h.svc.ListMyRFQs(ctx, claims.UserID, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": rfqs})
}

// GetByID returns a single RFQ.
func (h *Handler) GetByID(c *gin.Context) {
	id := c.Param("id")

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	rfq, err := h.svc.GetRFQByID(ctx, id)
	if err != nil {
		if err == ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "rfq not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, rfq)
}

// Create creates a new RFQ.
func (h *Handler) Create(c *gin.Context) {
	var in CreateRFQInput
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

	rfq, err := h.svc.CreateRFQ(ctx, claims.UserID, in)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, rfq)
}

// ListResponses returns all responses for an RFQ.
func (h *Handler) ListResponses(c *gin.Context) {
	rfqID := c.Param("rfqId")

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	responses, err := h.svc.ListResponsesByRFQID(ctx, rfqID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": responses})
}

// CreateResponse creates a supplier's response to an RFQ.
func (h *Handler) CreateResponse(c *gin.Context) {
	var in CreateRFQResponseInput
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

	resp, err := h.svc.CreateResponse(ctx, claims.UserID, in)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, resp)
}
