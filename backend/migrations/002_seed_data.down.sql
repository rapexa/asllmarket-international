-- Remove seed data
DELETE FROM notifications WHERE id LIKE 'notif-%';
DELETE FROM products WHERE id LIKE 'prod-%';
DELETE FROM suppliers WHERE id LIKE 'sup-%';
DELETE FROM subcategories WHERE id LIKE '%-%%';
DELETE FROM categories WHERE id IN ('1', '2', '3', '4', '5');
DELETE FROM users WHERE id IN ('admin-001', 'buyer-001', 'supplier-001', 'supplier-002');
