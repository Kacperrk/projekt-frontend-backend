INSERT INTO users (username, email, password, role) VALUES
    ('jan_kowalski', 'jan@example.com', 'hashedpassword1', 'USER'),
    ('anna_nowak', 'anna@example.com', 'hashedpassword2', 'ADMIN'),
    ('piotr_wozniak', 'piotr@example.com', 'hashedpassword3', 'USER');

INSERT INTO authors (first_name, last_name) VALUES
    ('Adam', 'Mickiewicz'),
    ('Henryk', 'Sienkiewicz'),
    ('Maria', 'Konopnicka');

INSERT INTO books (title, description, price, stock_quantity, published_date, cover_url, author_id) VALUES
    ('Pan Tadeusz', 'Epopeja narodowa', 29.99, 10, '1834-06-28', '/uploads/okladki/pan-tadeusz.jpg', 1),
    ('Quo Vadis', 'Powieść historyczna', 35.50, 5, '1896-01-01', '/uploads/okladki/quo-vadis.jpg', 2),
    ('O krasnoludkach i sierotce Marysi', 'Bajka dla dzieci', 18.75, 20, '1896-01-01', '/uploads/okladki/krasnoludki.jpg', 3);

INSERT INTO orders (user_id, status, total_price, street, building_number, apartment_number, postal_code, city, country) VALUES
    (1, 'PAID', 65.49, 'Kwiatowa', '12', '5', '00-123', 'Warszawa', 'Polska'),
    (2, 'SHIPPED', 35.50, 'Zielona', '8', NULL, '60-321', 'Poznań', 'Polska'),
    (3, 'DELIVERED', 18.75, 'Miodowa', '33', '2A', '30-001', 'Kraków', 'Polska');

INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES
    (1, 1, 1, 29.99),
    (1, 2, 1, 35.50),
    (3, 3, 1, 18.75);
