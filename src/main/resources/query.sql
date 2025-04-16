-- SELECT z JOIN

-- 1. Lista książek z kategorią i autorem
SELECT b.title, b.price, c.name AS category, CONCAT(a.first_name, ' ', a.last_name) AS author
FROM books b
    JOIN categories c ON b.category_id = c.id
    JOIN authors a ON b.author_id = a.id;

-- 2. Szczegóły zamówienia użytkownika
SELECT o.id AS order_id, u.username, b.title, oi.quantity, oi.price, o.total_price
FROM orders o
    JOIN users u ON o.user_id = u.id
    JOIN order_items oi ON o.id = oi.order_id
    JOIN books b ON oi.book_id = b.id;

-- 3. Opinie o książkach
SELECT u.username, b.title, r.rating, r.comment
FROM reviews r
    JOIN users u ON r.user_id = u.id
    JOIN books b ON r.book_id = b.id;
