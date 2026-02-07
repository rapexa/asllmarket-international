package search

import "time"

type SearchType string

const (
	SearchTypeText  SearchType = "text"
	SearchTypeImage SearchType = "image"
	SearchTypeVideo SearchType = "video"
)

// SearchRequest represents a search query.
type SearchRequest struct {
	Query      string     `json:"query"`
	Type       SearchType `json:"type"`
	CategoryID string     `json:"categoryId,omitempty"`
	MinPrice   float64    `json:"minPrice,omitempty"`
	MaxPrice   float64    `json:"maxPrice,omitempty"`
	Country    string     `json:"country,omitempty"`
	Verified   bool       `json:"verified,omitempty"`
	Limit      int        `json:"limit,omitempty"`
	Offset     int        `json:"offset,omitempty"`
}

// SearchResponse contains search results across different entity types.
type SearchResponse struct {
	Products  []ProductResult  `json:"products"`
	Suppliers []SupplierResult `json:"suppliers"`
	Total     int              `json:"total"`
}

type ProductResult struct {
	ID           string  `json:"id"`
	Name         string  `json:"name"`
	Description  string  `json:"description"`
	Price        float64 `json:"price"`
	Currency     string  `json:"currency"`
	Images       string  `json:"images"`
	SupplierID   string  `json:"supplierId"`
	SupplierName string  `json:"supplierName"`
	Rating       float64 `json:"rating"`
	MOQ          int     `json:"moq"`
}

type SupplierResult struct {
	ID          string  `json:"id"`
	CompanyName string  `json:"companyName"`
	Country     string  `json:"country"`
	Logo        string  `json:"logo"`
	Verified    bool    `json:"verified"`
	Rating      float64 `json:"rating"`
	Description string  `json:"description"`
}

// SearchHistory represents a search history entry.
type SearchHistory struct {
	ID          string     `gorm:"column:id;type:varchar(36);primaryKey" json:"id"`
	UserID      string     `gorm:"column:user_id;type:varchar(36)" json:"userId"`
	Query       string     `gorm:"column:query;type:text;not null" json:"query"`
	SearchType  SearchType `gorm:"column:search_type;type:enum('text','image','video');default:'text'" json:"searchType"`
	Filters     string     `gorm:"column:filters;type:text" json:"filters"`
	ResultCount int        `gorm:"column:result_count;type:int;default:0" json:"resultCount"`
	CreatedAt   time.Time  `gorm:"column:created_at;type:timestamp;default:CURRENT_TIMESTAMP" json:"createdAt"`
}

func (SearchHistory) TableName() string { return "search_history" }
