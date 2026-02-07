package category

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

// List returns all categories from DB.
func (h *Handler) List(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	categories, err := h.svc.List(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if categories == nil {
		categories = []*DBCategory{}
	}
	c.JSON(http.StatusOK, gin.H{"items": categories})
}

// GetByID returns a category by ID with its subcategories.
func (h *Handler) GetByID(c *gin.Context) {
	id := c.Param("id")

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	cat, subcategories, err := h.svc.GetByID(ctx, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if cat == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "category not found"})
		return
	}
	if subcategories == nil {
		subcategories = []*DBSubcategory{}
	}
	c.JSON(http.StatusOK, gin.H{"category": cat, "subcategories": subcategories})
}
