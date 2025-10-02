CREATE DATABASE IF NOT EXISTS vuln_app;
USE vuln_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100),
    password_hash VARCHAR(255),
    email VARCHAR(100),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2),
    description TEXT
);

-- Insert sample data
INSERT INTO users (username, password, password_hash, email, is_admin) VALUES 
('admin', 'admin123', '$2a$10$8K1p/a0dRTlB0ZQ1KXzQeOQlY7kQZ9XZ9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9', 'admin@example.com', TRUE),
('alice', 'password123', '$2a$10$8K1p/a0dRTlB0ZQ1KXzQeOQlY7kQZ9XZ9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9', 'alice@example.com', FALSE),
('bob', 'bobpass', '$2a$10$8K1p/a0dRTlB0ZQ1KXzQeOQlY7kQZ9XZ9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9', 'bob@example.com', FALSE);

INSERT INTO products (name, price, description) VALUES 
('Laptop', 999.99, 'High-performance laptop'),
('Smartphone', 699.99, 'Latest smartphone model'),
('Headphones', 149.99, 'Noise-cancelling headphones');
