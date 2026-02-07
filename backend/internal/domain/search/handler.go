package search

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

// Search performs a unified search across products and suppliers.
func (h *Handler) Search(c *gin.Context) {
	var req SearchRequest

	// Parse query parameters
	req.Query = c.Query("q")
	req.Type = SearchType(c.DefaultQuery("type", "text"))
	req.CategoryID = c.Query("categoryId")
	req.Country = c.Query("country")

	if minPrice := c.Query("minPrice"); minPrice != "" {
		if val, err := strconv.ParseFloat(minPrice, 64); err == nil {
			req.MinPrice = val
		}
	}

	if maxPrice := c.Query("maxPrice"); maxPrice != "" {
		if val, err := strconv.ParseFloat(maxPrice, 64); err == nil {
			req.MaxPrice = val
		}
	}

	if verified := c.Query("verified"); verified == "true" {
		req.Verified = true
	}

	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	req.Limit = limit
	req.Offset = offset

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	results, err := h.svc.Search(ctx, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, results)
}

// ListHistory returns the current user's search history (protected).
func (h *Handler) ListHistory(c *gin.Context) {
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

	list, err := h.svc.ListSearchHistory(ctx, claims.UserID, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if list == nil {
		list = []*SearchHistory{}
	}
	c.JSON(http.StatusOK, gin.H{"items": list})
}

// RecordHistoryInput for recording a search.
type RecordHistoryInput struct {
	Query       string     `json:"query" binding:"required"`
	SearchType  SearchType `json:"searchType"`
	Filters     string     `json:"filters"`
	ResultCount int        `json:"resultCount"`
}

// RecordHistory saves a search to history (protected).
func (h *Handler) RecordHistory(c *gin.Context) {
	raw, ok := c.Get("claims")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing claims"})
		return
	}
	claims := raw.(*middleware.Claims)

	var in RecordHistoryInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	if err := h.svc.SaveSearchHistory(ctx, claims.UserID, in.Query, in.SearchType, in.Filters, in.ResultCount); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}
