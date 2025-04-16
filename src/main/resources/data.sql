-- INSERT (DUMMY DATA)

INSERT INTO users (username, email, password, role) VALUES
    ('janek', 'janek@example.com', 'hashedpass123', 'USER'),
    ('admin', 'admin@example.com', 'adminpass456', 'ADMIN');

INSERT INTO authors (first_name, last_name) VALUES
    ('Adam', 'Mickiewicz'),
    ('Henryk', 'Sienkiewicz');

INSERT INTO categories (name) VALUES
    ('Powieść'),
    ('Fantasy'),
    ('Historia');

INSERT INTO books (title, description, price, stock_quantity, category_id, author_id, published_date, cover_url) VALUES
    ('Pan Tadeusz', 'Epopeja narodowa', 39.99, 20, 1, 1, '1834-01-01', 'https://example.com/tadeusz.jpg'),
    ('Krzyżacy', 'Powieść historyczna', 49.50, 15, 3, 2, '1900-06-01', 'https://example.com/krzyzacy.jpg');

INSERT INTO orders (user_id, total_price, status) VALUES
    (1, 89.49, 'PAID');

INSERT INTO order_items (order_id, book_id, quantity, price) VALUES
    (1, 1, 1, 39.99),
    (1, 2, 1, 49.50);

INSERT INTO reviews (user_id, book_id, rating, comment) VALUES
    (1, 1, 5, 'Świetna książka!'),
    (1, 2, 4, 'Dobra, ale przydługa');
