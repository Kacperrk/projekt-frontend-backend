DROP INDEX IF EXISTS idx_orders_user_id;
DROP INDEX IF EXISTS idx_order_items_order_id;
DROP INDEX IF EXISTS idx_order_items_book_id;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER', -- enum: 'USER', 'ADMIN'
    archived BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE books (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title VARCHAR(200) NOT NULL,
    description TEXT,
    author_first_name VARCHAR(50) NOT NULL,
    author_last_name VARCHAR(50) NOT NULL,
	price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
	stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
	published_date DATE,
	cover_url TEXT, -- /covers/pan_tadeusz.jpg
    archived BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- enum: 'PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'
    total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
    street VARCHAR(100) NOT NULL,
    building_number VARCHAR(10) NOT NULL,
    apartment_number VARCHAR(10),
    postal_code VARCHAR(10) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    archived BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE order_items (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
	book_id BIGINT NOT NULL REFERENCES books(id) ON DELETE RESTRICT,
	quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    archived BOOLEAN NOT NULL DEFAULT FALSE
);


CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_book_id ON order_items(book_id);
