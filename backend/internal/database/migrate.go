package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/example/global-trade-hub/backend/internal/config"
	"github.com/example/global-trade-hub/backend/internal/domain/auth"
	"github.com/example/global-trade-hub/backend/internal/domain/message"
	"github.com/example/global-trade-hub/backend/internal/domain/notification"
	"github.com/example/global-trade-hub/backend/internal/domain/order"
	"github.com/example/global-trade-hub/backend/internal/domain/product"
	"github.com/example/global-trade-hub/backend/internal/domain/rfq"
	"github.com/example/global-trade-hub/backend/internal/domain/subscription"
	"github.com/example/global-trade-hub/backend/internal/domain/supplier"
	"github.com/example/global-trade-hub/backend/internal/domain/verification"
)

// AutoMigrate opens a temporary GORM connection and runs automatic migrations
// for core models. This is called on startup so that required tables (like users)
// are created if they don't exist.
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

	// IMPORTANT:
	// - These structs currently use `db:\"column\"` struct tags for database/sql.
	// - GORM by default uses field names and `gorm:\"column:...\"` tags.
	// - AutoMigrate will therefore create tables using GORM's naming strategy
	//   (e.g., table `users`, `products`, etc.) based on struct names.
	// - Our repositories already expect those table names (users, products, ...),
	//   so this is safe as long as existing schema matches.

	if err := gdb.AutoMigrate(
		&auth.User{},
		&product.Product{},
		&supplier.Supplier{},
		&rfq.RFQ{},
		&order.Order{},
		&message.Message{},
		&notification.Notification{},
		&subscription.Subscription{},
		&verification.Verification{},
	); err != nil {
		return err
	}

	return nil
}
