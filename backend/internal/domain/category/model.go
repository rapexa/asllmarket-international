package category

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
