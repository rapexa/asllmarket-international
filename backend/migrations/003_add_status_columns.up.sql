-- Add status column to users table
ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active' AFTER verified;

-- Add status column to products table if not exists
ALTER TABLE products MODIFY COLUMN status VARCHAR(20) DEFAULT 'active';

-- Add index for status filtering
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_products_status ON products(status);
