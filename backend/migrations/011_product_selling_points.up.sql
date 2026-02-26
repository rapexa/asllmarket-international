-- Add selling point and shipping columns to products (First order FREE shipping, Guaranteed, Fast customization, tags)
ALTER TABLE products
  ADD COLUMN discount_percent INT NOT NULL DEFAULT 0,
  ADD COLUMN free_shipping BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN first_order_free_shipping BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN guaranteed BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN fast_customization BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN selling_point_tags TEXT NULL COMMENT 'JSON array e.g. ["Lower priced than similar","FREE shipping"]';
