package favorite

import "time"

// Favorite represents a user's favorite product.
type Favorite struct {
	ID        string    `gorm:"column:id;type:varchar(36);primaryKey" json:"id"`
	UserID    string    `gorm:"column:user_id;type:varchar(36);not null;uniqueIndex:unique_user_product" json:"userId"`
	ProductID string    `gorm:"column:product_id;type:varchar(36);not null;uniqueIndex:unique_user_product" json:"productId"`
	CreatedAt time.Time `gorm:"column:created_at;type:timestamp;default:CURRENT_TIMESTAMP" json:"createdAt"`
}

func (Favorite) TableName() string { return "favorites" }
