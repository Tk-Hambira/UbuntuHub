-- Ubuntu Hub Namibia Database Setup
-- Run this script in phpMyAdmin to create the database and tables

-- Create Database
CREATE DATABASE IF NOT EXISTS ubuntu_hub_namibia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ubuntu_hub_namibia;

-- Users Table (Admin and Sellers only)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    role ENUM('admin', 'seller') NOT NULL,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Categories Table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    seller_id INT NOT NULL,
    image_url VARCHAR(255),
    stock_quantity INT NOT NULL DEFAULT 0,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (seller_id) REFERENCES users(id)
);

-- Contact Messages Table
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Categories
INSERT INTO categories (name, slug, sort_order) VALUES
('Food & Grains', 'food-grains', 1),
('Jewelry', 'jewelry', 2),
('Meat Products', 'meat-products', 3),
('Spices & Seasonings', 'spices-seasonings', 4),
('Crafts', 'crafts', 5),
('Traditional Clothing', 'traditional-clothing', 6);

-- Insert Default Admin User (password: admin123)
INSERT INTO users (username, email, password_hash, first_name, last_name, role) VALUES
('admin', 'admin@ubuntuhub.na', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'admin');

-- Insert Sample Sellers (password: seller123)
INSERT INTO users (username, email, password_hash, first_name, last_name, phone, role) VALUES
('naledi', 'naledi@ubuntuhub.na', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Naledi', 'Shikomba', '+264811234567', 'seller'),
('johannes', 'johannes@ubuntuhub.na', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Johannes', 'Katjivikua', '+264812345678', 'seller'),
('maria', 'maria@ubuntuhub.na', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Maria', 'Nghidinwa', '+264813456789', 'seller');

-- Insert Sample Products
INSERT INTO products (name, description, price, category_id, seller_id, image_url, stock_quantity, featured) VALUES
('Traditional Mahangu', 'Premium quality traditional mahangu grain, organically grown in northern Namibia.', 45.00, 1, 2, '/Images/Mahungu.jpeg', 50, TRUE),
('Himba Jewelry Set', 'Authentic Himba jewelry set including necklace, bracelets, and earrings.', 280.00, 2, 4, '/Images/Himba Necklace.jpeg', 15, TRUE),
('Premium Biltong', 'Traditional Namibian biltong made from premium game meat.', 120.00, 3, 2, '/Images/Biltong Products.jpg', 25, TRUE),
('Namib Desert Salt', 'Pure salt harvested from the Namib Desert salt pans.', 35.00, 4, 2, '/Images/Bottle Opener.jpeg', 100, TRUE),
('Handwoven Basket', 'Traditional basket handwoven using indigenous materials.', 150.00, 5, 3, '/Images/Craft Bowls.jpeg', 20, FALSE),
('Traditional Shawl', 'Beautiful traditional Namibian shawl woven with authentic patterns.', 320.00, 6, 3, '/Images/Traditional Dress.jpg', 8, FALSE),
('Oshifima Flour', 'High-quality oshifima flour made from pearl millet.', 28.00, 1, 3, '/Images/Mahungu.jpeg', 75, FALSE),
('Damara Honey', 'Pure wildflower honey harvested from the Damara region.', 65.00, 1, 4, '/Images/Bottle Opener.jpeg', 30, FALSE),
('Leather Sandals', 'Handcrafted leather sandals in traditional Namibian style.', 180.00, 6, 2, '/Images/Herero designed ladies.jpeg', 12, FALSE),
('Wild Moringa Powder', 'Organic moringa powder sourced from wild moringa trees.', 55.00, 4, 4, '/Images/Tk Hambira.JPEG', 40, FALSE);

-- Success message
SELECT 'Database setup completed successfully!' as message;
