package auth

import "time"

// UserRole matches DB enum (users.role).
// Platform roles: only "buyer" and "supplier" are exposed in the UI for registration and dashboards.
// Other roles are reserved for future use so LLMs and developers don't get confused.
// پلتفرم فعلاً فقط buyer و supplier در UI فعال است؛ بقیه در آینده شاید استفاده بشوند.
type UserRole string

const (
	RoleBuyer    UserRole = "buyer"
	RoleSupplier UserRole = "supplier"
	// Reserved for future use. شاید در آینده استفاده بشه. Do not expose in registration UI.
	RoleMarket  UserRole = "market"
	RoleVisitor UserRole = "visitor"
	// Admin: internal panel only. پنل ادمین؛ در ثبت‌نام عمومی نمایش داده نشود.
	RoleAdmin UserRole = "admin"
)

// User represents an application user persisted in MySQL.
type User struct {
	ID        string    `db:"id" json:"id"`
	Email     string    `db:"email" json:"email"`
	Password  string    `db:"password_hash" json:"-"` // bcrypt hash; column in DB is password_hash (001_init_schema)
	Role      UserRole  `db:"role" json:"role"`
	FullName  string    `db:"full_name" json:"fullName"`
	CreatedAt time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt time.Time `db:"updated_at" json:"updatedAt"`
}

// RegisterInput is the payload for registration.
// Only buyer and supplier are accepted; other roles are reserved for future use (شاید در آینده).
type RegisterInput struct {
	Email    string   `json:"email" binding:"required,email"`
	Password string   `json:"password" binding:"required,min=8"`
	FullName string   `json:"fullName" binding:"required"`
	Role     UserRole `json:"role" binding:"required,oneof=buyer supplier"`
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

