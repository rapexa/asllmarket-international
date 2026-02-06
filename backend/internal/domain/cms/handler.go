package cms

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// Handler exposes HTTP handlers for CMS-related endpoints.
type Handler struct {
	svc *Service
}

// NewHandler creates a new CMS HTTP handler.
func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

// SubmitContact handles public contact form submissions.
func (h *Handler) SubmitContact(c *gin.Context) {
	var in CreateContactMessageInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	msg, err := h.svc.CreateContactMessage(ctx, in)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, msg)
}

// ListBlogPosts returns public blog posts.
func (h *Handler) ListBlogPosts(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	posts, err := h.svc.ListBlogPosts(ctx, 100, 0)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": posts})
}

// GetBlogPost returns a single blog post by ID.
func (h *Handler) GetBlogPost(c *gin.Context) {
	id := c.Param("id")

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	post, err := h.svc.GetBlogPostByID(ctx, id)
	if err != nil {
		if err == ErrNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "blog post not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, post)
}

// ListFAQs returns public FAQs.
func (h *Handler) ListFAQs(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	faqs, err := h.svc.ListFAQs(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": faqs})
}

// ListJobs returns public job listings.
func (h *Handler) ListJobs(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	jobs, err := h.svc.ListJobs(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": jobs})
}

// ListPressReleases returns public press releases.
func (h *Handler) ListPressReleases(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	releases, err := h.svc.ListPressReleases(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"items": releases})
}



