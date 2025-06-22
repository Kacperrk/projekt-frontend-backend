INSERT INTO users (username, email, password, role) VALUES
-- password a
    ('jan_kowalski', 'a@a', '$2a$10$yU4Gv1cSmOzQJVBXQzaKausIy7OgzEDsHK/Wp1SSS0srT8uiBQtXC', 'USER'),
-- password b
    ('anna_nowak', 'anna@example.com', '$2a$10$/OxshTeyvcdJZWm1tfwPte6re2EcctwFuxRbipQuFEzc64N/NuNAG', 'USER'),
-- password c
    ('piotr_wozniak', 'piotr@example.com', '$2a$10$tnZIrSguIdoLPN63tIu6TOvR2y3JZC49ljUbzfoSn9O/wkKcgYFFS', 'USER');

INSERT INTO books (title, description, author_first_name, author_last_name, price, stock_quantity, published_date, cover_url) VALUES
    ('Pan Tadeusz', 'Epopeja narodowa', 'Adam', 'Mickiewicz', 29.99, 10, '1834-06-28', '/covers/pan_tadeusz.webp'),
    ('Quo Vadis', 'Powieść historyczna', 'Henryk', 'Sienkiewicz', 35.99, 5, '1896-01-01', '/covers/quo_vadis.webp'),
    ('Balladyna', 'Dramat romantyczny', 'Juliusz', 'Slowacki', 27.99, 8, '1839-07-20', '/covers/balladyna.webp'),
    ('Lalka', 'Powieść realistyczna', 'Boleslaw', 'Prus', 38.99, 6, '1890-01-01', '/covers/lalka.webp'),
    ('Zemsta', 'Komedia', 'Aleksander', 'Fredro', 26.99, 9, '1834-01-01', '/covers/zemsta.webp'),
    ('Latarnik', 'Nowela', 'Henryk', 'Sienkiewicz', 24.50, 7, '1851-11-01', '/covers/latarnik.webp'),
    ('Krzyzacy', 'Powieść historyczna', 'Henryk', 'Sienkiewicz', 31.20, 4, '1900-07-18', '/covers/krzyzacy.webp'),
    ('Potop', 'Powieść historyczna', 'Henryk', 'Sienkiewicz', 34.90, 6, '1886-05-22', '/covers/potop.webp'),
    ('Wesele', 'Dramat ludowy', 'Stanisław', 'Wyspianski', 29.99, 9, '1901-04-16', '/covers/wesele.webp'),
    ('Chlopi', 'Powieść realistyczna', 'Stanislaw', 'Reymond', 35.99, 6, '1904-07-23', '/covers/chlopi.webp'),
    ('Ferdydurke', 'Powieść modernistyczna', 'Witold', 'Gombrowicz', 37.50, 7, '1937-02-17', '/covers/ferdydurke.webp'),
    ('Granica', 'Powieść psychologiczna', 'Zofia', 'Nalkowska', 32.20, 5, '1935-11-30', '/covers/granica.webp'),
    ('Przedwiosnie', 'Powieść modernistyczna', 'Stefan', 'Zeromski', 36.75, 6, '1924-03-05', '/covers/przedwiosnie.webp'),
    ('Medaliony', 'Opowiadania wojenne', 'Zofia', 'Nalkowska', 29.80, 9, '1946-05-05', '/covers/medaliony.webp'),
    ('Katarynka', 'Nowela', 'Boleslaw', 'Prus', 27.50, 8, '1880-04-12', '/covers/katarynka.webp'),
    ('Antek', 'Nowela', 'Boleslaw', 'Prus', 26.99, 7, '1880-11-01', '/covers/antek.webp'),
    ('Dziady', 'Dramat romantyczny', 'Adam', 'Mickiewicz', 34.99, 7, '1832-09-28', '/covers/dziady.webp'),
    ('Konrad Wallenrod', 'Dramat romantyczny', 'Adam', 'Mickiewicz', 32.50, 5, '1834-12-25', '/covers/konrad.webp'),
    ('Hamlet', 'Tragedia', 'Juliusz', 'Slowacki', 36.20, 4, '1832-12-01', '/covers/hamlet.webp'),
    ('Antygona', 'Dramat klasyczny', 'Sofokles', ' ', 34.15, 6, '1845-09-30', '/covers/antygona.webp'),
    ('Makbet', 'Tragedia klasyczna', 'William', 'Shakespaere', 38.75, 3, '1590-03-15', '/covers/makbet.webp'),
    ('Romeo i Julia', 'Tragedia romantyczna', 'William', 'Shakespeare', 35.20, 5, '1838-02-10', '/covers/romeo.webp'),
    ('Przygoda Arystoklesa', 'Powieść przygodowa', 'Henryk', 'Sienkiewicz', 31.50, 5, '1894-06-20', '/covers/przygoda.webp');


INSERT INTO orders (user_id, status, total_price, street, building_number, apartment_number, postal_code, city, country) VALUES
    (1, 'PAID', 65.49, 'Kwiatowa', '12', '5', '00-123', 'Warszawa', 'Polska'),
    (2, 'SHIPPED', 35.50, 'Zielona', '8', NULL, '60-321', 'Poznań', 'Polska'),
    (3, 'DELIVERED', 18.75, 'Miodowa', '33', '2A', '30-001', 'Kraków', 'Polska');

INSERT INTO order_items (order_id, book_id, quantity, unit_price) VALUES
    (1, 1, 1, 29.99),
    (1, 2, 1, 35.50),
    (3, 3, 1, 18.75);
