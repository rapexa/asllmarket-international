package category

import "time"

// Category represents product categories (mirrors frontend data/categories.ts).
// For simplicity, we can seed this data from JSON or store it statically in Go.
// Alternatively, manage it as a DB table.
type Category struct {
	ID             string        `json:"id"`
	NameEn         string        `json:"nameEn"`
	NameFa         string        `json:"nameFa"`
	NameAr         string        `json:"nameAr"`
	Icon           string        `json:"icon"`
	DescriptionEn  string        `json:"descriptionEn"`
	DescriptionFa  string        `json:"descriptionFa"`
	DescriptionAr  string        `json:"descriptionAr"`
	ProductCount   int           `json:"productCount"`
	SupplierCount  int           `json:"supplierCount"`
	Featured       bool          `json:"featured"`
	Trending       bool          `json:"trending"`
	Image          string        `json:"image"`
	Gradient       string        `json:"gradient"`
	Accent         string        `json:"accent"`
	Subcategories  []SubCategory `json:"subcategories"`
}

type SubCategory struct {
	ID           string `json:"id"`
	NameEn       string `json:"nameEn"`
	NameFa       string `json:"nameFa"`
	NameAr       string `json:"nameAr"`
	ProductCount int    `json:"productCount"`
	Icon         string `json:"icon"`
	Trending     bool   `json:"trending"`
}

// DBCategory represents the database schema for categories table.
type DBCategory struct {
	ID            string    `gorm:"column:id;type:varchar(36);primaryKey" json:"id"`
	NameEn        string    `gorm:"column:name_en;type:varchar(255);not null" json:"nameEn"`
	NameFa        string    `gorm:"column:name_fa;type:varchar(255);not null" json:"nameFa"`
	NameAr        string    `gorm:"column:name_ar;type:varchar(255);not null" json:"nameAr"`
	DescriptionEn string    `gorm:"column:description_en;type:text" json:"descriptionEn"`
	DescriptionFa string    `gorm:"column:description_fa;type:text" json:"descriptionFa"`
	DescriptionAr string    `gorm:"column:description_ar;type:text" json:"descriptionAr"`
	Icon          string    `gorm:"column:icon;type:varchar(50)" json:"icon"`
	Image         string    `gorm:"column:image;type:text" json:"image"`
	Gradient      string    `gorm:"column:gradient;type:varchar(255)" json:"gradient"`
	Accent        string    `gorm:"column:accent;type:varchar(50)" json:"accent"`
	ProductCount  int       `gorm:"column:product_count;type:int;default:0" json:"productCount"`
	SupplierCount int       `gorm:"column:supplier_count;type:int;default:0" json:"supplierCount"`
	Featured      bool      `gorm:"column:featured;type:boolean;default:false" json:"featured"`
	Trending      bool      `gorm:"column:trending;type:boolean;default:false" json:"trending"`
	CreatedAt     time.Time `gorm:"column:created_at;type:timestamp;default:CURRENT_TIMESTAMP" json:"createdAt"`
	UpdatedAt     time.Time `gorm:"column:updated_at;type:timestamp;default:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" json:"updatedAt"`
}

func (DBCategory) TableName() string { return "categories" }

// DBSubcategory represents the database schema for subcategories table.
type DBSubcategory struct {
	ID           string    `gorm:"column:id;type:varchar(36);primaryKey" json:"id"`
	CategoryID   string    `gorm:"column:category_id;type:varchar(36);not null" json:"categoryId"`
	NameEn       string    `gorm:"column:name_en;type:varchar(255);not null" json:"nameEn"`
	NameFa       string    `gorm:"column:name_fa;type:varchar(255);not null" json:"nameFa"`
	NameAr       string    `gorm:"column:name_ar;type:varchar(255);not null" json:"nameAr"`
	Icon         string    `gorm:"column:icon;type:varchar(50)" json:"icon"`
	ProductCount int       `gorm:"column:product_count;type:int;default:0" json:"productCount"`
	Trending     bool      `gorm:"column:trending;type:boolean;default:false" json:"trending"`
	CreatedAt    time.Time `gorm:"column:created_at;type:timestamp;default:CURRENT_TIMESTAMP" json:"createdAt"`
	UpdatedAt    time.Time `gorm:"column:updated_at;type:timestamp;default:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" json:"updatedAt"`
}

func (DBSubcategory) TableName() string { return "subcategories" }

// GetCategories returns all categories (from static data or DB).
func GetCategories() []Category {
	// This can be loaded from JSON file or DB.
	// For demo, return a subset; in production, match frontend data/categories.ts
	return []Category{
		{
			ID:             "1",
			NameEn:         "Apparel & Accessories",
			NameFa:         "پوشاک و لوازم جانبی",
			NameAr:         "الملابس والإكسسوارات",
			Icon:           "👔",
			DescriptionEn:  "Global fashion suppliers & manufacturers",
			DescriptionFa:  "تأمین‌کنندگان و تولیدکنندگان جهانی مد و پوشاک",
			DescriptionAr:  "الموردون والمصنعون العالميون للموضة والملابس",
			ProductCount:   250000,
			SupplierCount:  18000,
			Featured:       true,
			Trending:       true,
			Image:          "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=90",
			Gradient:       "from-amber-900/80 via-amber-800/70 to-amber-700/80",
			Accent:         "amber",
			Subcategories:  []SubCategory{},
		},
		// ... Add more categories as needed
	}
}
