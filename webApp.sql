--DROP TABLE IF EXISTS meals, orders, order_items, cart, cart_items, admin_users, payments;

-- SQL commands to create tables for a Food Ordering System

CREATE TABLE meals (
    meal_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(100),
    tag VARCHAR(100),
    nutrition_info JSONB,
    is_active BOOLEAN DEFAULT true
);


CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    order_number VARCHAR(255) UNIQUE NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE order_items (
    item_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(order_id),
    meal_id INTEGER NOT NULL REFERENCES meals(meal_id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);


CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INTEGER,  -- This could link to a user's table if authentication is required for ordering
    session_id VARCHAR(255) UNIQUE,  -- Use session ID if user tracking is session-based
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL REFERENCES cart(cart_id),
    meal_id INTEGER NOT NULL REFERENCES meals(meal_id),
    quantity INTEGER NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE admin_users (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash CHAR(60) NOT NULL,  -- Storing hashed passwords
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);


CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(order_id),
    payment_method VARCHAR(50) NOT NULL,
    payment_details JSONB,  -- Store details like transaction IDs, payment status, etc.
    paid_at TIMESTAMP WITH TIME ZONE,
    payment_status VARCHAR(50)
);


CREATE INDEX idx_meals_active ON meals (is_active);
CREATE INDEX idx_orders_payment_status ON orders (payment_status);
CREATE INDEX idx_order_items_order_id ON order_items (order_id);