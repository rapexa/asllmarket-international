-- Cleanup script for demo seed data inserted by 009_demo_seed.up.sql
-- This ONLY deletes the deterministic demo rows by their IDs,
-- so it is safe to run on environments where real data exists.

START TRANSACTION;

-- Child tables first (respect foreign keys)
DELETE FROM favorites
WHERE id IN ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1');

DELETE FROM reviews
WHERE id IN ('dddddddd-dddd-dddd-dddd-ddddddddddd1');

DELETE FROM messages
WHERE id IN ('cccccccc-cccc-cccc-cccc-ccccccccccc1');

DELETE FROM subscriptions
WHERE id IN ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1');

DELETE FROM verifications
WHERE id IN ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1');

DELETE FROM notifications
WHERE id IN (
  '99999999-9999-9999-9999-999999999991',
  '99999999-9999-9999-9999-999999999992'
);

DELETE FROM rfq_responses
WHERE id IN ('88888888-8888-8888-8888-888888888881');

DELETE FROM rfqs
WHERE id IN ('77777777-7777-7777-7777-777777777771');

DELETE FROM orders
WHERE id IN ('66666666-6666-6666-6666-666666666661');

DELETE FROM search_history
WHERE id IN ('ffffffff-ffff-ffff-ffff-fffffffffff1');

-- Products and taxonomy
DELETE FROM products
WHERE id IN (
  '55555555-5555-5555-5555-555555555551',
  '55555555-5555-5555-5555-555555555552',
  '55555555-5555-5555-5555-555555555553'
);

DELETE FROM subcategories
WHERE id IN (
  '44444444-4444-4444-4444-444444444441',
  '44444444-4444-4444-4444-444444444442',
  '44444444-4444-4444-4444-444444444443'
);

DELETE FROM categories
WHERE id IN (
  '33333333-3333-3333-3333-333333333331',
  '33333333-3333-3333-3333-333333333332'
);

-- Suppliers
DELETE FROM suppliers
WHERE id IN (
  '22222222-2222-2222-2222-222222222221',
  '22222222-2222-2222-2222-222222222222'
);

-- Users (demo-only; master admin is defined in code, not DB)
DELETE FROM users
WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111112',
  '11111111-1111-1111-1111-111111111113',
  '11111111-1111-1111-1111-111111111114'
);

COMMIT;

