package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/example/global-trade-hub/backend/internal/config"
	"github.com/example/global-trade-hub/backend/internal/domain/cms"
)

// AutoMigrate opens a temporary GORM connection and runs automatic migrations
// using migration models that match backend/migrations/001_init_schema.up.sql
// (and CMS migrations 004–008). Tables are created/updated on startup.
func AutoMigrate(cfg *config.Config) error {
	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?%s",
		cfg.MySQLUser,
		cfg.MySQLPassword,
		cfg.MySQLHost,
		cfg.MySQLPort,
		cfg.MySQLDB,
		cfg.MySQLParams,
	)

	gdb, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	// 001_init_schema tables (see internal/database/models.go)
	if err := gdb.AutoMigrate(
		&MigrationUser{},
		&MigrationSupplier{},
		&MigrationCategory{},
		&MigrationSubcategory{},
		&MigrationProduct{},
		&MigrationOrder{},
		&MigrationRFQ{},
		&MigrationRFQResponse{},
		&MigrationNotification{},
		&MigrationVerification{},
		&MigrationSubscription{},
		&MigrationMessage{},
		&MigrationReview{},
		&MigrationFavorite{},
		&MigrationSearchHistory{},
		// CMS (004–008)
		&cms.ContactMessage{},
		&cms.BlogPost{},
		&cms.FAQ{},
		&cms.Job{},
		&cms.PressRelease{},
	); err != nil {
		return err
	}

	return nil
}
