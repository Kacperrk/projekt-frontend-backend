-- DROP TABLES (od najpierw zależnych)

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS users;


-- CREATE TABLES

-- Użytkownicy (klienci + administratorzy)
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	role VARCHAR(20) NOT NULL DEFAULT 'USER', -- USER, ADMIN
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Autorzy książek
CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL
);

-- Kategorie książek
CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE
);

-- Książki
CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	title VARCHAR(200) NOT NULL,
	description TEXT,
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INT NOT NULL DEFAULT 0,
	category_id INT REFERENCES categories(id),
	author_id INT REFERENCES authors(id),
	published_date DATE,
	cover_url TEXT -- /uploads/okladki/pan-tadeusz.jpg - http://localhost:8080/img/pan-tadeusz.jpg
);

-- Zamówienia
CREATE TABLE orders (
	 id SERIAL PRIMARY KEY,
	 user_id INT REFERENCES users(id),
	 order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	 total_price DECIMAL(10, 2) NOT NULL,
	 status VARCHAR(20) NOT NULL DEFAULT 'PENDING' -- PENDING, PAID, SHIPPED, CANCELLED
);

-- Pozycje w zamówieniu (wiele książek w jednym zamówieniu)
CREATE TABLE order_items (
	id SERIAL PRIMARY KEY,
	order_id INT REFERENCES orders(id) ON DELETE CASCADE,
	book_id INT REFERENCES books(id),
	quantity INT NOT NULL,
	price DECIMAL(10, 2) NOT NULL -- cena jednostkowa w momencie zamówienia
);

-- Opinie użytkowników
CREATE TABLE reviews (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(id),
	book_id INT REFERENCES books(id),
	rating INT CHECK (rating >= 1 AND rating <= 5),
	comment TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(user_id, book_id) -- jedna opinia na książkę od jednego użytkownika
);
