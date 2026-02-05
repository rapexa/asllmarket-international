package database

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"

	"github.com/example/global-trade-hub/backend/internal/config"
)

// OpenMySQL opens a MySQL connection using the low-level database/sql driver.
// For a large system, you could wrap this with sqlx or GORM; here we keep it
// thin and build repositories on top of *sql.DB for clarity and performance.
func OpenMySQL(cfg *config.Config) (*sql.DB, error) {
	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?%s",
		cfg.MySQLUser,
		cfg.MySQLPassword,
		cfg.MySQLHost,
		cfg.MySQLPort,
		cfg.MySQLDB,
		cfg.MySQLParams,
	)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	// Reasonable defaults; tune per workload
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(25)
	db.SetConnMaxIdleTime(5 * 60) // seconds

	if err := db.Ping(); err != nil {
		_ = db.Close()
		return nil, err
	}

	return db, nil
}

