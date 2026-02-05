-- Remove index
DROP INDEX IF EXISTS idx_products_status ON products;
DROP INDEX IF EXISTS idx_users_status ON users;

-- Remove status column from users table
ALTER TABLE users DROP COLUMN IF EXISTS status;
