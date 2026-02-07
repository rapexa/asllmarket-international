package review

import "time"

// Review represents a product or supplier review.
type Review struct {
	ID              string    `gorm:"column:id;type:varchar(36);primaryKey" json:"id"`
	ProductID       string    `gorm:"column:product_id;type:varchar(36)" json:"productId"`
	SupplierID      string    `gorm:"column:supplier_id;type:varchar(36)" json:"supplierId"`
	ReviewerID      string    `gorm:"column:reviewer_id;type:varchar(36);not null" json:"reviewerId"`
	Rating          int       `gorm:"column:rating;type:int;check:rating >= 1 AND rating <= 5" json:"rating"`
	Title           string    `gorm:"column:title;type:varchar(255)" json:"title"`
	Comment         string    `gorm:"column:comment;type:text" json:"comment"`
	VerifiedPurchase bool     `gorm:"column:verified_purchase;type:boolean;default:false" json:"verifiedPurchase"`
	HelpfulCount    int       `gorm:"column:helpful_count;type:int;default:0" json:"helpfulCount"`
	CreatedAt       time.Time `gorm:"column:created_at;type:timestamp;default:CURRENT_TIMESTAMP" json:"createdAt"`
	UpdatedAt       time.Time `gorm:"column:updated_at;type:timestamp;default:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" json:"updatedAt"`
}

func (Review) TableName() string { return "reviews" }
