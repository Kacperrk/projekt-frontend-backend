-- DROP TABLES od najpierw zależnych

-- tabele nie zostaly usuniete lokalnie u nas

DROP INDEX IF EXISTS idx_books_author_id;
DROP INDEX IF EXISTS idx_books_category_id;
DROP INDEX IF EXISTS idx_orders_user_id;
DROP INDEX IF EXISTS idx_order_items_order_id;
DROP INDEX IF EXISTS idx_order_items_book_id;
DROP INDEX IF EXISTS idx_reviews_user_id;
DROP INDEX IF EXISTS idx_reviews_book_id;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS users;

DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS order_status;


CREATE TYPE user_role AS ENUM (
    'USER',
    'ADMIN'
);

CREATE TYPE order_status AS ENUM (
    'PENDING',
    'PAID',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED'
);


-- nie używać delete jesli w tabeli jest kolumna Archived

CREATE TABLE users (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
    -- hashowac hasła zamiast plaintext
	password VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'USER',
--  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    -- updated_at ?
    -- deleted_at ???
    archived BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE authors (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
    UNIQUE (first_name, last_name),
    archived BOOLEAN NOT NULL DEFAULT FALSE
);

-- CREATE TABLE categories (
-- id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
-- name VARCHAR(100) NOT NULL UNIQUE,
-- archived BOOLEAN NOT NULL DEFAULT FALSE
-- );

CREATE TABLE books (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title VARCHAR(200) NOT NULL,
    description TEXT,
	price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
	stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
	published_date DATE,
	cover_url TEXT, -- /uploads/okladki/pan-tadeusz.jpg - http://localhost:8080/img/pan-tadeusz.jpg
    author_id BIGINT NOT NULL REFERENCES authors(id) ON DELETE RESTRICT,
    UNIQUE (title, author_id),
--  category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    archived BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status order_status NOT NULL DEFAULT 'PENDING',
    total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
    street VARCHAR(100) NOT NULL,
    building_number VARCHAR(10) NOT NULL,
    apartment_number VARCHAR(10),
    postal_code VARCHAR(10) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    archived BOOLEAN NOT NULL DEFAULT FALSE
);

-- Pozycje w zamówieniu (wiele książek w jednym zamówieniu)
CREATE TABLE order_items (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
	book_id BIGINT NOT NULL REFERENCES books(id) ON DELETE RESTRICT,
	quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    archived BOOLEAN NOT NULL DEFAULT FALSE
);

-- CREATE TABLE reviews (
-- id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
-- user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
-- book_id BIGINT NOT NULL REFERENCES books(id) ON DELETE RESTRICT,
-- UNIQUE(user_id, book_id), -- jedna opinia na książkę od jednego użytkownika
-- rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
-- comment TEXT,
-- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
-- archived BOOLEAN NOT NULL DEFAULT FALSE
-- );


CREATE INDEX idx_books_author_id ON books(author_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_book_id ON order_items(book_id);
-- CREATE INDEX idx_books_category_id ON books(category_id);
-- CREATE INDEX idx_reviews_user_id ON reviews(user_id);
-- CREATE INDEX idx_reviews_book_id ON reviews(book_id);
