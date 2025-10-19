<?php
require_once '../config/database.php';

header('Content-Type: application/json');

try {
    $database = new Database();
    $db = $database->getConnection();

    // Get query parameters
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 8;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

    // Query featured products
    $query = "SELECT p.id, p.name, p.description, p.price, p.image_url, p.stock_quantity, p.featured,
                     c.name as category_name, c.slug as category_slug,
                     u.first_name, u.last_name, u.username as seller_username
              FROM products p 
              LEFT JOIN categories c ON p.category_id = c.id 
              LEFT JOIN users u ON p.seller_id = u.id 
              WHERE p.status = 'active' AND p.featured = TRUE
              ORDER BY p.created_at DESC 
              LIMIT :limit OFFSET :offset";

    $stmt = $db->prepare($query);
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $products = $stmt->fetchAll();

    // Format the response
    $formattedProducts = array_map(function($product) {
        return [
            'id' => (int)$product['id'],
            'name' => $product['name'],
            'description' => $product['description'],
            'price' => (float)$product['price'],
            'image_url' => $product['image_url'],
            'stock_quantity' => (int)$product['stock_quantity'],
            'featured' => (bool)$product['featured'],
            'category' => [
                'name' => $product['category_name'],
                'slug' => $product['category_slug']
            ],
            'seller' => [
                'name' => trim($product['first_name'] . ' ' . $product['last_name']),
                'username' => $product['seller_username']
            ]
        ];
    }, $products);

    sendJsonResponse([
        'success' => true,
        'data' => $formattedProducts,
        'total' => count($formattedProducts)
    ]);

} catch (Exception $e) {
    error_log("Featured products error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Failed to fetch featured products',
        'data' => []
    ], 500);
}
?>
