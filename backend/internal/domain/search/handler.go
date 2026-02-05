package search

import (
	"context"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
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
