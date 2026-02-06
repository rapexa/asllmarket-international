package auth

import (
	"context"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"

	"github.com/example/global-trade-hub/backend/internal/http/middleware"
)

// Hard-coded master admin (full panel access, independent from DB).
const (
	masterAdminID       = "master-admin"
	masterAdminEmail    = "alireza@asllmarket.com"
	masterAdminPassword = "Qwertyuiop123!"
	masterAdminName     = "Master Administrator"
)

// Service contains business logic for authentication and user management.
type Service struct {
	repo       UserRepository
	jwtSecret  string
	jwtIssuer  string
	accessTTL  time.Duration
	refreshTTL time.Duration
}

func NewService(repo UserRepository, secret, issuer string) *Service {
	return &Service{
		repo:       repo,
		jwtSecret:  secret,
		jwtIssuer:  issuer,
		accessTTL:  15 * time.Minute,
		refreshTTL: 30 * 24 * time.Hour,
	}
}

// WithTokenTTL allows overriding token TTLs (primarily for tests/wiring from config).
func (s *Service) WithTokenTTL(access, refresh time.Duration) {
	s.accessTTL = access
	s.refreshTTL = refresh
}

func (s *Service) Register(ctx context.Context, in RegisterInput) (*User, *TokenPair, error) {
	// Hash password
	hash, err := bcrypt.GenerateFromPassword([]byte(in.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, nil, err
	}

	u := &User{
		Email:    in.Email,
		Password: string(hash),
		Role:     in.Role,
		FullName: in.FullName,
	}
	if err := s.repo.Create(ctx, u); err != nil {
		return nil, nil, err
	}

	tokens, err := s.issueTokens(u)
	if err != nil {
		return nil, nil, err
	}
	return u, tokens, nil
}

func (s *Service) Login(ctx context.Context, in LoginInput) (*User, *TokenPair, error) {
	// 1) Check hard-coded master admin (not stored in DB)
	if in.Email == masterAdminEmail && in.Password == masterAdminPassword {
		now := time.Now()
		master := &User{
			ID:        masterAdminID,
			Email:     masterAdminEmail,
			Password:  "", // not used / not stored
			Role:      RoleAdmin,
			FullName:  masterAdminName,
			CreatedAt: now,
			UpdatedAt: now,
		}

		tokens, err := s.issueTokens(master)
		if err != nil {
			return nil, nil, err
		}
		return master, tokens, nil
	}

	// 2) Fallback to normal DB-backed login
	u, err := s.repo.GetByEmail(ctx, in.Email)
	if err != nil {
		return nil, nil, err
	}
	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(in.Password)); err != nil {
		return nil, nil, err
	}
	tokens, err := s.issueTokens(u)
	if err != nil {
		return nil, nil, err
	}
	return u, tokens, nil
}

func (s *Service) GetUserByID(ctx context.Context, id string) (*User, error) {
	// If the token belongs to the master admin, return a synthetic in-memory user
	// so that /auth/me and other "current user" flows work without a DB row.
	if id == masterAdminID {
		now := time.Now()
		return &User{
			ID:        masterAdminID,
			Email:     masterAdminEmail,
			Password:  "",
			Role:      RoleAdmin,
			FullName:  masterAdminName,
			CreatedAt: now,
			UpdatedAt: now,
		}, nil
	}

	return s.repo.GetByID(ctx, id)
}

func (s *Service) RefreshToken(ctx context.Context, refreshToken string) (*User, *TokenPair, error) {
	// Parse and validate the refresh token
	token, err := jwt.ParseWithClaims(refreshToken, &middleware.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(s.jwtSecret), nil
	})
	if err != nil {
		return nil, nil, err
	}

	claims, ok := token.Claims.(*middleware.Claims)
	if !ok || !token.Valid {
		return nil, nil, jwt.ErrSignatureInvalid
	}

	// Get user from database
	u, err := s.repo.GetByID(ctx, claims.UserID)
	if err != nil {
		return nil, nil, err
	}

	// Issue new tokens
	tokens, err := s.issueTokens(u)
	if err != nil {
		return nil, nil, err
	}

	return u, tokens, nil
}

func (s *Service) issueTokens(u *User) (*TokenPair, error) {
	now := time.Now()

	accessClaims := &middleware.Claims{
		UserID: u.ID,
		Role:   string(u.Role),
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    s.jwtIssuer,
			Subject:   u.ID,
			ExpiresAt: jwt.NewNumericDate(now.Add(s.accessTTL)),
			IssuedAt:  jwt.NewNumericDate(now),
		},
	}

	refreshClaims := &middleware.Claims{
		UserID: u.ID,
		Role:   string(u.Role),
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    s.jwtIssuer,
			Subject:   u.ID,
			ExpiresAt: jwt.NewNumericDate(now.Add(s.refreshTTL)),
			IssuedAt:  jwt.NewNumericDate(now),
		},
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)

	at, err := accessToken.SignedString([]byte(s.jwtSecret))
	if err != nil {
		return nil, err
	}
	rt, err := refreshToken.SignedString([]byte(s.jwtSecret))
	if err != nil {
		return nil, err
	}

	return &TokenPair{
		AccessToken:  at,
		RefreshToken: rt,
	}, nil
}
