--DROP TABLE IF EXISTS payments, order_item_toppings, cart_item_toppings, order_items, cart_items, orders, cart, meals, menu_categories, toppings, admin_users, tables;

CREATE DATABASE webApp;
USE webApp;

-- Table for Menu Categories
CREATE TABLE menu_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Table for Meals
CREATE TABLE meals (
    meal_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category_id INTEGER REFERENCES menu_categories(category_id),
    tag VARCHAR(100),
    nutrition_info JSONB,
    is_active BOOLEAN DEFAULT true
);

-- Table for Add-ons/Toppings
CREATE TABLE toppings (
    topping_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Table for Orders
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    order_number VARCHAR(255) UNIQUE NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    tip DECIMAL(10, 2) DEFAULT 0.00,
    table_number INTEGER,
    payment_status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for Order Items
CREATE TABLE order_items (
    item_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(order_id),
    meal_id INTEGER NOT NULL REFERENCES meals(meal_id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    comments TEXT
);

-- Many-to-many relationship between Order Items and Toppings
CREATE TABLE order_item_toppings (
    item_id INTEGER NOT NULL REFERENCES order_items(item_id),
    topping_id INTEGER NOT NULL REFERENCES toppings(topping_id),
    PRIMARY KEY (item_id, topping_id)
);

-- Table for Cart
CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    session_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for Cart Items
CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL REFERENCES cart(cart_id),
    meal_id INTEGER NOT NULL REFERENCES meals(meal_id),
    quantity INTEGER NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    comments TEXT
);

-- Many-to-many relationship between Cart Items and Toppings
CREATE TABLE cart_item_toppings (
    cart_item_id INTEGER NOT NULL REFERENCES cart_items(cart_item_id),
    topping_id INTEGER NOT NULL REFERENCES toppings(topping_id),
    PRIMARY KEY (cart_item_id, topping_id)
);

-- Table for Admin Users
CREATE TABLE admin_users (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash CHAR(60) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Table for Payments
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(order_id),
    payment_method VARCHAR(50) NOT NULL,
    payment_details JSONB,
    paid_at TIMESTAMP WITH TIME ZONE,
    payment_status VARCHAR(50)
);

-- Table for Managing Tables/QR Codes in the Restaurant
CREATE TABLE tables (
    table_id SERIAL PRIMARY KEY,
    table_number INTEGER UNIQUE NOT NULL,
    qr_code_url VARCHAR(255)
);

-- Creating Indexes for better query performance
CREATE INDEX idx_meals_active ON meals (is_active);
CREATE INDEX idx_orders_payment_status ON orders (payment_status);
CREATE INDEX idx_order_items_order_id ON order_items (order_id);