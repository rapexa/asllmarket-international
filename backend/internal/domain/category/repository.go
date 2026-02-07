package category

import (
	"context"
	"database/sql"
)

type Repository interface {
	ListCategories(ctx context.Context) ([]*DBCategory, error)
	GetCategoryByID(ctx context.Context, id string) (*DBCategory, error)
	ListSubcategoriesByCategoryID(ctx context.Context, categoryID string) ([]*DBSubcategory, error)
}

type mySQLCategoryRepository struct {
	db *sql.DB
}

func NewMySQLCategoryRepository(db *sql.DB) Repository {
	return &mySQLCategoryRepository{db: db}
}

func (r *mySQLCategoryRepository) ListCategories(ctx context.Context) ([]*DBCategory, error) {
	const query = `
SELECT id, name_en, name_fa, name_ar, description_en, description_fa, description_ar,
       icon, image, gradient, accent, product_count, supplier_count, featured, trending,
       created_at, updated_at
FROM categories
ORDER BY featured DESC, name_en ASC`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []*DBCategory
	for rows.Next() {
		var c DBCategory
		if err := rows.Scan(
			&c.ID, &c.NameEn, &c.NameFa, &c.NameAr, &c.DescriptionEn, &c.DescriptionFa, &c.DescriptionAr,
			&c.Icon, &c.Image, &c.Gradient, &c.Accent, &c.ProductCount, &c.SupplierCount, &c.Featured, &c.Trending,
			&c.CreatedAt, &c.UpdatedAt,
		); err != nil {
			return nil, err
		}
		list = append(list, &c)
	}
	return list, rows.Err()
}

func (r *mySQLCategoryRepository) GetCategoryByID(ctx context.Context, id string) (*DBCategory, error) {
	const query = `
SELECT id, name_en, name_fa, name_ar, description_en, description_fa, description_ar,
       icon, image, gradient, accent, product_count, supplier_count, featured, trending,
       created_at, updated_at
FROM categories
WHERE id = ? LIMIT 1`

	var c DBCategory
	if err := r.db.QueryRowContext(ctx, query, id).Scan(
		&c.ID, &c.NameEn, &c.NameFa, &c.NameAr, &c.DescriptionEn, &c.DescriptionFa, &c.DescriptionAr,
		&c.Icon, &c.Image, &c.Gradient, &c.Accent, &c.ProductCount, &c.SupplierCount, &c.Featured, &c.Trending,
		&c.CreatedAt, &c.UpdatedAt,
	); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &c, nil
}

func (r *mySQLCategoryRepository) ListSubcategoriesByCategoryID(ctx context.Context, categoryID string) ([]*DBSubcategory, error) {
	const query = `
SELECT id, category_id, name_en, name_fa, name_ar, icon, product_count, trending, created_at, updated_at
FROM subcategories
WHERE category_id = ?
ORDER BY name_en ASC`

	rows, err := r.db.QueryContext(ctx, query, categoryID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []*DBSubcategory
	for rows.Next() {
		var s DBSubcategory
		if err := rows.Scan(
			&s.ID, &s.CategoryID, &s.NameEn, &s.NameFa, &s.NameAr, &s.Icon, &s.ProductCount, &s.Trending,
			&s.CreatedAt, &s.UpdatedAt,
		); err != nil {
			return nil, err
		}
		list = append(list, &s)
	}
	return list, rows.Err()
}
