package auth

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/google/uuid"
)

var (
	// ErrUserNotFound is returned when user cannot be located.
	ErrUserNotFound = errors.New("user not found")
	// ErrEmailAlreadyUsed is returned on unique email constraint violation.
	ErrEmailAlreadyUsed = errors.New("email already in use")
)

// UserRepository defines persistence operations for users.
type UserRepository interface {
	GetByEmail(ctx context.Context, email string) (*User, error)
	GetByID(ctx context.Context, id string) (*User, error)
	Create(ctx context.Context, u *User) error
}

type mySQLUserRepository struct {
	db *sql.DB
}

// NewMySQLUserRepository returns a MySQL-backed implementation.
func NewMySQLUserRepository(db *sql.DB) UserRepository {
	return &mySQLUserRepository{db: db}
}

func (r *mySQLUserRepository) GetByEmail(ctx context.Context, email string) (*User, error) {
	const query = `
SELECT id, email, password, role, full_name, created_at, updated_at
FROM users
WHERE email = ? LIMIT 1`

	var u User
	if err := r.db.QueryRowContext(ctx, query, email).Scan(
		&u.ID,
		&u.Email,
		&u.Password,
		&u.Role,
		&u.FullName,
		&u.CreatedAt,
		&u.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}
	return &u, nil
}

func (r *mySQLUserRepository) GetByID(ctx context.Context, id string) (*User, error) {
	const query = `
SELECT id, email, password, role, full_name, created_at, updated_at
FROM users
WHERE id = ? LIMIT 1`

	var u User
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&u.ID,
		&u.Email,
		&u.Password,
		&u.Role,
		&u.FullName,
		&u.CreatedAt,
		&u.UpdatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}
	return &u, nil
}

func (r *mySQLUserRepository) Create(ctx context.Context, u *User) error {
	if u.ID == "" {
		u.ID = uuid.NewString()
	}
	now := time.Now().UTC()
	u.CreatedAt = now
	u.UpdatedAt = now

	const query = `
INSERT INTO users (id, email, password, role, full_name, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?)`

	_, err := r.db.ExecContext(ctx, query,
		u.ID,
		u.Email,
		u.Password,
		u.Role,
		u.FullName,
		u.CreatedAt,
		u.UpdatedAt,
	)
	// NOTE: for a production system you should inspect MySQL error codes to
	// detect duplicate email (e.g. using driver-specific error types).
	return err
}

