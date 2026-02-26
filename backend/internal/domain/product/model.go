package product

import "time"

// Product represents a simplified product entity backing the frontend catalogue.
type Product struct {
	ID                     string    `db:"id" json:"id"`
	Name                   string    `db:"name" json:"name"`
	Description            string    `db:"description" json:"description"`
	ImageURL               string    `db:"image_url" json:"imageUrl"`
	Price                  float64   `db:"price" json:"price"`
	MOQ                    int       `db:"moq" json:"moq"`
	Currency               string    `db:"currency" json:"currency"`
	SupplierID             string    `db:"supplier_id" json:"supplierId"`
	DiscountPercent        int       `db:"discount_percent" json:"discountPercent"`
	FreeShipping           bool      `db:"free_shipping" json:"freeShipping"`
	FirstOrderFreeShipping bool      `db:"first_order_free_shipping" json:"firstOrderFreeShipping"`
	Guaranteed             bool      `db:"guaranteed" json:"guaranteed"`
	FastCustomization      bool      `db:"fast_customization" json:"fastCustomization"`
	SellingPointTags       string    `db:"selling_point_tags" json:"sellingPointTags,omitempty"` // JSON array; empty if NULL
	CreatedAt              time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt              time.Time `db:"updated_at" json:"updatedAt"`
}

type CreateInput struct {
	Name                   string  `json:"name" binding:"required"`
	Description            string  `json:"description" binding:"required"`
	ImageURL               string  `json:"imageUrl" binding:"omitempty,url"`
	Price                  float64 `json:"price" binding:"required,gt=0"`
	MOQ                    int     `json:"moq" binding:"required,gt=0"`
	Currency               string  `json:"currency" binding:"required,len=3"`
	DiscountPercent        int     `json:"discountPercent"`
	FreeShipping           bool    `json:"freeShipping"`
	FirstOrderFreeShipping bool    `json:"firstOrderFreeShipping"`
	Guaranteed             bool    `json:"guaranteed"`
	FastCustomization      bool    `json:"fastCustomization"`
	SellingPointTags       string  `json:"sellingPointTags"` // JSON array string
}

type UpdateInput struct {
	Name                   *string  `json:"name,omitempty"`
	Description            *string  `json:"description,omitempty"`
	ImageURL               *string  `json:"imageUrl,omitempty"`
	Price                  *float64 `json:"price,omitempty"`
	MOQ                    *int     `json:"moq,omitempty"`
	Currency               *string  `json:"currency,omitempty"`
	DiscountPercent        *int     `json:"discountPercent,omitempty"`
	FreeShipping           *bool    `json:"freeShipping,omitempty"`
	FirstOrderFreeShipping *bool    `json:"firstOrderFreeShipping,omitempty"`
	Guaranteed             *bool    `json:"guaranteed,omitempty"`
	FastCustomization      *bool    `json:"fastCustomization,omitempty"`
	SellingPointTags       *string  `json:"sellingPointTags,omitempty"`
}

