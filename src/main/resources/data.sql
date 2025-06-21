INSERT INTO users (username, email, password, role) VALUES
-- password a
    ('jan_kowalski', 'a@a', '$2a$10$yU4Gv1cSmOzQJVBXQzaKausIy7OgzEDsHK/Wp1SSS0srT8uiBQtXC', 'USER'),
-- password b
    ('anna_nowak', 'anna@example.com', '$2a$10$/OxshTeyvcdJZWm1tfwPte6re2EcctwFuxRbipQuFEzc64N/NuNAG', 'USER'),
-- password c
    ('piotr_wozniak', 'piotr@example.com', '$2a$10$tnZIrSguIdoLPN63tIu6TOvR2y3JZC49ljUbzfoSn9O/wkKcgYFFS', 'USER');

INSERT INTO books (title, description, author_first_name, author_last_name, price, stock_quantity, published_date, cover_url) VALUES
    ('Pan Tadeusz', 'Epopeja narodowa', 'Adam', 'Mickiewicz', 29.99, 10, '1834-06-28', '/covers/pan_tadeusz.jpg'),
    ('Quo Vadis', 'Powieść historyczna', 'Henryk', 'Sienkiewicz', 35.50, 5, '1896-01-01', '/covers/pan_tadeusz.jpg'),
    ('O krasnoludkach i sierotce Marysi', 'Bajka dla dzieci', 'Maria', 'Konopnicka', 18.75, 20, '1896-01-01', '/covers/pan_tadeusz.jpg');

INSERT INTO orders (user_id, status, total_price, street, building_number, apartment_number, postal_code, city, country) VALUES
    (1, 'PAID', 65.49, 'Kwiatowa', '12', '5', '00-123', 'Warszawa', 'Polska'),
    (2, 'SHIPPED', 35.50, 'Zielona', '8', NULL, '60-321', 'Poznań', 'Polska'),
    (3, 'DELIVERED', 18.75, 'Miodowa', '33', '2A', '30-001', 'Kraków', 'Polska');

INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES
    (1, 1, 1, 29.99),
    (1, 2, 1, 35.50),
    (3, 3, 1, 18.75);
