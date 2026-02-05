package auth

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/example/global-trade-hub/backend/internal/http/middleware"
)

// Handler exposes HTTP endpoints for auth / user operations.
type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

// Register godoc
// @Summary Register a new user
// @Tags auth
// @Accept json
// @Produce json
// @Param body body RegisterInput true "Registration payload"
// @Success 201 {object} gin.H
// @Failure 400,500 {object} gin.H
// @Router /api/v1/auth/register [post]
func (h *Handler) Register(c *gin.Context) {
	var in RegisterInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	user, tokens, err := h.svc.Register(ctx, in)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"user":   user,
		"tokens": tokens,
	})
}

// Login authenticates by email + password and returns a token pair.
func (h *Handler) Login(c *gin.Context) {
	var in LoginInput
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	user, tokens, err := h.svc.Login(ctx, in)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user":   user,
		"tokens": tokens,
	})
}

// RefreshToken parses a refresh token and issues a new access token.
// For simplicity this demo expects refresh token in Authorization: Bearer header.
func (h *Handler) RefreshToken(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"error": "not implemented yet"})
}

// Me returns the current authenticated user info based on JWT claims.
func (h *Handler) Me(c *gin.Context) {
	raw, ok := c.Get("claims")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing claims"})
		return
	}
	claims, ok := raw.(*middleware.Claims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid claims"})
		return
	}

	// In a full implementation we'd hit the repository; for now we only return
	// the identity contained in the token.
	c.JSON(http.StatusOK, gin.H{
		"userId": claims.UserID,
		"role":   claims.Role,
	})
}

