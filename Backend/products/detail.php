<?php
require_once '../config/database.php';

header('Content-Type: application/json');

// Handle different HTTP methods
$method = $_SERVER['REQUEST_METHOD'];

try {
    $database = new Database();
    $db = $database->getConnection();

    switch($method) {
        case 'GET':
            // Get single product details
            if (!isset($_GET['id'])) {
                sendJsonResponse([
                    'success' => false,
                    'message' => 'Product ID is required'
                ], 400);
            }

            $productId = (int)$_GET['id'];

            $query = "SELECT p.id, p.name, p.description, p.price, p.image_url, p.stock_quantity, p.featured, p.created_at,
                             c.name as category_name, c.slug as category_slug, c.id as category_id,
                             u.first_name, u.last_name, u.username as seller_username, u.id as seller_id
                      FROM products p 
                      LEFT JOIN categories c ON p.category_id = c.id 
                      LEFT JOIN users u ON p.seller_id = u.id 
                      WHERE p.id = :id AND p.status = 'active'";

            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $productId);
            $stmt->execute();

            $product = $stmt->fetch();

            if (!$product) {
                sendJsonResponse([
                    'success' => false,
                    'message' => 'Product not found'
                ], 404);
            }

            $formattedProduct = [
                'id' => (int)$product['id'],
                'name' => $product['name'],
                'description' => $product['description'],
                'price' => (float)$product['price'],
                'image_url' => $product['image_url'],
                'stock_quantity' => (int)$product['stock_quantity'],
                'featured' => (bool)$product['featured'],
                'created_at' => $product['created_at'],
                'category' => [
                    'id' => (int)$product['category_id'],
                    'name' => $product['category_name'],
                    'slug' => $product['category_slug']
                ],
                'seller' => [
                    'id' => (int)$product['seller_id'],
                    'name' => trim($product['first_name'] . ' ' . $product['last_name']),
                    'username' => $product['seller_username']
                ]
            ];

            sendJsonResponse([
                'success' => true,
                'data' => $formattedProduct
            ]);
            break;

        default:
            sendJsonResponse([
                'success' => false,
                'message' => 'Method not allowed'
            ], 405);
    }

} catch (Exception $e) {
    error_log("Product detail error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Failed to fetch product details'
    ], 500);
}
?>
