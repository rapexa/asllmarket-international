package auth

import (
	"context"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"

	"github.com/example/global-trade-hub/backend/internal/http/middleware"
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

