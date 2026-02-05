package middleware

import (
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// RequestLogger is a lightweight structured logger for all incoming requests.
func RequestLogger(logger *log.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		method := c.Request.Method

		c.Next()

		latency := time.Since(start)
		status := c.Writer.Status()

		logger.Printf("%s %s -> %d (%s)", method, path, status, latency)
	}
}

// Claims represents the JWT claims we expect in access tokens.
type Claims struct {
	UserID string `json:"uid"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// JWTAuth validates Bearer tokens, attaches claims to the context and rejects
// unauthorized requests.
func JWTAuth(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing Authorization header"})
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid Authorization header"})
			return
		}

		tokenStr := parts[1]
		claims := &Claims{}
		token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		})
		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid or expired token"})
			return
		}

		// Attach claims to context for downstream handlers
		c.Set("claims", claims)
		c.Next()
	}
}

// RequireRole ensures the authenticated user has one of the allowed roles.
func RequireRole(allowedRoles ...string) gin.HandlerFunc {
	roleSet := make(map[string]struct{}, len(allowedRoles))
	for _, r := range allowedRoles {
		roleSet[r] = struct{}{}
	}

	return func(c *gin.Context) {
		raw, exists := c.Get("claims")
		if !exists {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "missing auth claims"})
			return
		}

		claims, ok := raw.(*Claims)
		if !ok {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "invalid auth claims"})
			return
		}

		if _, ok := roleSet[claims.Role]; !ok {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "insufficient permissions"})
			return
		}

		c.Next()
	}
}

