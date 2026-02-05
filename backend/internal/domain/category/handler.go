package category

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct{}

func NewHandler() *Handler {
	return &Handler{}
}

// List returns all categories (from static data).
func (h *Handler) List(c *gin.Context) {
	categories := GetCategories()
	c.JSON(http.StatusOK, gin.H{"items": categories})
}

// GetByID returns a single category by ID.
func (h *Handler) GetByID(c *gin.Context) {
	id := c.Param("id")
	categories := GetCategories()

	for _, cat := range categories {
		if cat.ID == id {
			c.JSON(http.StatusOK, cat)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "category not found"})
}
