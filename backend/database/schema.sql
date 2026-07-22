-- schema.sql
CREATE DATABASE IF NOT EXISTS handcrafted_heels;
USE handcrafted_heels;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    is_new_arrival BOOLEAN DEFAULT FALSE,
    is_best_seller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE SET NULL
);

CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE colors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    hex_code VARCHAR(7)
);

CREATE TABLE sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    size_value VARCHAR(20) NOT NULL
);

CREATE TABLE product_colors (
    product_id INT NOT NULL,
    color_id INT NOT NULL,
    PRIMARY KEY (product_id, color_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE CASCADE
);

CREATE TABLE product_sizes (
    product_id INT NOT NULL,
    size_id INT NOT NULL,
    PRIMARY KEY (product_id, size_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (size_id) REFERENCES sizes(id) ON DELETE CASCADE
);

CREATE TABLE contact_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wholesale_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    contact_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    estimated_quantity INT,
    message TEXT,
    status ENUM('new', 'reviewing', 'approved', 'rejected') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE website_settings (
    setting_key VARCHAR(50) PRIMARY KEY,
    setting_value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO product_categories (name, slug, description) VALUES 
('Bridal Heels', 'bridal-heels', 'Elegant handcrafted heels for your special day.'),
('Party Wear', 'party-wear', 'Glamorous heels for parties and events.');

INSERT INTO products (category_id, name, slug, description, price, is_new_arrival, is_best_seller) VALUES 
(1, 'Crystal Embellished Stiletto', 'crystal-embellished-stiletto', 'Stunning bridal stiletto with premium crystals.', 4500.00, TRUE, TRUE),
(2, 'Velvet Block Heel', 'velvet-block-heel', 'Comfortable yet stylish block heel for parties.', 3200.00, FALSE, TRUE);

INSERT INTO colors (name, hex_code) VALUES ('Silver', '#C0C0C0'), ('Gold', '#FFD700'), ('Black', '#000000'), ('Red', '#FF0000');
INSERT INTO sizes (size_value) VALUES ('36'), ('37'), ('38'), ('39'), ('40'), ('41');

INSERT INTO product_colors (product_id, color_id) VALUES (1, 1), (1, 2), (2, 3), (2, 4);
INSERT INTO product_sizes (product_id, size_id) VALUES (1, 1), (1, 2), (1, 3), (2, 2), (2, 3), (2, 4);

INSERT INTO users (username, email, password_hash) VALUES 
('admin', 'info@handcraftedheels.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'); -- password is 'password'

INSERT INTO website_settings (setting_key, setting_value) VALUES 
('contact_email', 'info@handcraftedheels.com'),
('store_address', 'GALLI NO 35, INDIRA NAGAR - 2, THAKKAR BAPPA COLONY, SG BARVE MARG, Chembur, MUMBAI (M. CORP), MUMBAI, 400071');
