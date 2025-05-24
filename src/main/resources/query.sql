-- 1. Pobierz wszystkie zamówienia z nazwą użytkownika, ich statusem oraz łączną ceną
SELECT
    o.id AS order_id,
    u.username,
    o.status,
    o.total_price
FROM orders o
         JOIN users u ON o.user_id = u.id;

-- 2. Pobierz szczegóły pozycji w zamówieniach: tytuł książki, ilość, cena jednostkowa i kto zamówił
SELECT
    u.username,
    b.title,
    oi.quantity,
    oi.unit_price
FROM order_items oi
         JOIN orders o ON oi.order_id = o.id
         JOIN users u ON o.user_id = u.id
         JOIN books b ON oi.book_id = b.id;

-- 3. Pobierz listę książek wraz z imieniem i nazwiskiem autora
SELECT
    b.title,
    a.first_name,
    a.last_name,
    b.price
FROM books b
         JOIN authors a ON b.author_id = a.id;
