INSERT INTO users (username, email, password, role) VALUES
    ('jan_kowalski', 'jan@example.com', 'hashedpassword1', 'USER'),
    ('anna_nowak', 'anna@example.com', 'hashedpassword2', 'USER'),
    ('piotr_wozniak', 'piotr@example.com', 'hashedpassword3', 'USER');

INSERT INTO books (title, description, author_first_name, author_last_name, price, stock_quantity, published_date, cover_url) VALUES
    ('Pan Tadeusz', 'Epopeja narodowa', 'Adam', 'Mickiewicz', 29.99, 10, '1834-06-28', '/uploads/okladki/pan-tadeusz.jpg'),
    ('Quo Vadis', 'Powieść historyczna', 'Henryk', 'Sienkiewicz', 35.50, 5, '1896-01-01', '/uploads/okladki/quo-vadis.jpg'),
    ('O krasnoludkach i sierotce Marysi', 'Bajka dla dzieci', 'Maria', 'Konopnicka', 18.75, 20, '1896-01-01', '/uploads/okladki/krasnoludki.jpg');

INSERT INTO orders (user_id, status, total_price, street, building_number, apartment_number, postal_code, city, country) VALUES
    (1, 'PAID', 65.49, 'Kwiatowa', '12', '5', '00-123', 'Warszawa', 'Polska'),
    (2, 'SHIPPED', 35.50, 'Zielona', '8', NULL, '60-321', 'Poznań', 'Polska'),
    (3, 'DELIVERED', 18.75, 'Miodowa', '33', '2A', '30-001', 'Kraków', 'Polska');

INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES
    (1, 1, 1, 29.99),
    (1, 2, 1, 35.50),
    (3, 3, 1, 18.75);
