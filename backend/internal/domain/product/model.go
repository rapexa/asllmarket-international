package product

import "time"

// Product represents a simplified product entity backing the frontend catalogue.
type Product struct {
	ID          string    `db:"id" json:"id"`
	Name        string    `db:"name" json:"name"`
	Description string    `db:"description" json:"description"`
	ImageURL    string    `db:"image_url" json:"imageUrl"`
	Price       float64   `db:"price" json:"price"`
	MOQ         int       `db:"moq" json:"moq"`
	Currency    string    `db:"currency" json:"currency"`
	SupplierID  string    `db:"supplier_id" json:"supplierId"`
	CreatedAt   time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt   time.Time `db:"updated_at" json:"updatedAt"`
}

type CreateInput struct {
	Name        string  `json:"name" binding:"required"`
	Description string  `json:"description" binding:"required"`
	ImageURL    string  `json:"imageUrl" binding:"omitempty,url"`
	Price       float64 `json:"price" binding:"required,gt=0"`
	MOQ         int     `json:"moq" binding:"required,gt=0"`
	Currency    string  `json:"currency" binding:"required,len=3"`
}

type UpdateInput struct {
	Name        *string  `json:"name,omitempty"`
	Description *string  `json:"description,omitempty"`
	ImageURL    *string  `json:"imageUrl,omitempty"`
	Price       *float64 `json:"price,omitempty"`
	MOQ         *int     `json:"moq,omitempty"`
	Currency    *string  `json:"currency,omitempty"`
}

