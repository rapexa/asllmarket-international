package auth

import "time"

// UserRole matches frontend roles: buyer, supplier, market, visitor, admin.
type UserRole string

const (
	RoleBuyer    UserRole = "buyer"
	RoleSupplier UserRole = "supplier"
	RoleMarket   UserRole = "market"
	RoleVisitor  UserRole = "visitor"
	RoleAdmin    UserRole = "admin"
)

// User represents an application user persisted in MySQL.
type User struct {
	ID        string    `db:"id" json:"id"`
	Email     string    `db:"email" json:"email"`
	Password  string    `db:"password" json:"-"` // bcrypt hash
	Role      UserRole  `db:"role" json:"role"`
	FullName  string    `db:"full_name" json:"fullName"`
	CreatedAt time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt time.Time `db:"updated_at" json:"updatedAt"`
}

// RegisterInput is the payload for registration.
type RegisterInput struct {
	Email    string   `json:"email" binding:"required,email"`
	Password string   `json:"password" binding:"required,min=8"`
	FullName string   `json:"fullName" binding:"required"`
	Role     UserRole `json:"role" binding:"required,oneof=buyer supplier market visitor admin"`
}

// LoginInput is the payload for password-based login.
type LoginInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// TokenPair contains access and refresh tokens.
type TokenPair struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

