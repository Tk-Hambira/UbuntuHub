<?php
/**
 * Database Setup Script for Ubuntu Hub Namibia
 * Run this once to create the database and tables
 */

try {
    // Connect to MySQL without specifying a database
    $pdo = new PDO('mysql:host=localhost', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS ubuntu_hub_namibia CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✓ Database 'ubuntu_hub_namibia' created successfully\n";

    // Select the database
    $pdo->exec("USE ubuntu_hub_namibia");

    // Create tables
    $tables = [
        "CREATE TABLE users (
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
        )",

        "CREATE TABLE categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            slug VARCHAR(100) UNIQUE NOT NULL,
            sort_order INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )",

        "CREATE TABLE products (
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
        )",

        "CREATE TABLE contact_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            subject VARCHAR(200) NOT NULL,
            message TEXT NOT NULL,
            status ENUM('new', 'read') DEFAULT 'new',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )"
    ];

    foreach ($tables as $table) {
        $pdo->exec($table);
    }
    echo "✓ Tables created successfully\n";

    // Insert default categories
    $pdo->exec("INSERT INTO categories (name, slug, sort_order) VALUES
        ('Food & Grains', 'food-grains', 1),
        ('Jewelry', 'jewelry', 2),
        ('Meat Products', 'meat-products', 3),
        ('Spices & Seasonings', 'spices-seasonings', 4),
        ('Crafts', 'crafts', 5),
        ('Traditional Clothing', 'traditional-clothing', 6)");
    echo "✓ Categories inserted successfully\n";

    // Insert default users (passwords are hashed for 'admin123' and 'seller123')
    $pdo->exec("INSERT INTO users (username, email, password_hash, first_name, last_name, role) VALUES
        ('admin', 'admin@ubuntuhub.na', '\$2y\$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'admin'),
        ('naledi', 'naledi@ubuntuhub.na', '\$2y\$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Naledi', 'Shikomba', 'seller'),
        ('johannes', 'johannes@ubuntuhub.na', '\$2y\$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Johannes', 'Katjivikua', 'seller'),
        ('maria', 'maria@ubuntuhub.na', '\$2y\$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Maria', 'Nghidinwa', 'seller')");
    echo "✓ Users inserted successfully\n";

    // Insert sample products
    $pdo->exec("INSERT INTO products (name, description, price, category_id, seller_id, image_url, stock_quantity, featured) VALUES
        ('Traditional Mahangu', 'Premium quality traditional mahangu grain, organically grown in northern Namibia.', 45.00, 1, 2, '/Images/mahangu.jpg', 50, TRUE),
        ('Himba Jewelry Set', 'Authentic Himba jewelry set including necklace, bracelets, and earrings.', 280.00, 2, 4, '/Images/jewelry.jpg', 15, TRUE),
        ('Premium Biltong', 'Traditional Namibian biltong made from premium game meat.', 120.00, 3, 2, '/Images/biltong.jpg', 25, TRUE),
        ('Namib Desert Salt', 'Pure salt harvested from the Namib Desert salt pans.', 35.00, 4, 2, '/Images/salt.jpg', 100, TRUE),
        ('Handwoven Basket', 'Traditional basket handwoven using indigenous materials.', 150.00, 5, 3, '/Images/basket.jpg', 20, FALSE),
        ('Traditional Shawl', 'Beautiful traditional Namibian shawl woven with authentic patterns.', 320.00, 6, 3, '/Images/shawl.jpg', 8, FALSE)");
    echo "✓ Sample products inserted successfully\n";

    echo "\n🎉 Database setup completed successfully!\n";
    echo "Demo credentials:\n";
    echo "Admin: admin@ubuntuhub.na / admin123\n";
    echo "Sellers: naledi@ubuntuhub.na / seller123\n";
    echo "         johannes@ubuntuhub.na / seller123\n";
    echo "         maria@ubuntuhub.na / seller123\n";

} catch (PDOException $e) {
    echo "❌ Database setup failed: " . $e->getMessage() . "\n";
    exit(1);
}
?>
