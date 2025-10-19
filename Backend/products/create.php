<?php
require_once '../config/database.php';

header('Content-Type: application/json');

try {
    $database = new Database();
    $db = $database->getConnection();

    // Get JSON input
    $input = getJsonInput();

    if (!$input) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Invalid JSON data'
        ], 400);
    }

    // Validate required fields
    $requiredFields = ['name', 'description', 'price', 'category_id', 'seller_id', 'stock_quantity'];
    foreach ($requiredFields as $field) {
        if (!isset($input[$field]) || empty($input[$field])) {
            sendJsonResponse([
                'success' => false,
                'message' => "Field '$field' is required"
            ], 400);
        }
    }

    $name = trim($input['name']);
    $description = trim($input['description']);
    $price = (float)$input['price'];
    $categoryId = (int)$input['category_id'];
    $sellerId = (int)$input['seller_id'];
    $stockQuantity = (int)$input['stock_quantity'];
    $imageUrl = isset($input['image_url']) ? trim($input['image_url']) : null;
    $featured = isset($input['featured']) ? (bool)$input['featured'] : false;

    // Validate price
    if ($price <= 0) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Price must be greater than 0'
        ], 400);
    }

    // Validate stock quantity
    if ($stockQuantity < 0) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Stock quantity cannot be negative'
        ], 400);
    }

    // Verify category exists
    $categoryQuery = "SELECT id FROM categories WHERE id = :category_id";
    $categoryStmt = $db->prepare($categoryQuery);
    $categoryStmt->bindParam(':category_id', $categoryId);
    $categoryStmt->execute();
    
    if (!$categoryStmt->fetch()) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Invalid category ID'
        ], 400);
    }

    // Verify seller exists
    $sellerQuery = "SELECT id FROM users WHERE id = :seller_id AND role = 'seller' AND status = 'active'";
    $sellerStmt = $db->prepare($sellerQuery);
    $sellerStmt->bindParam(':seller_id', $sellerId);
    $sellerStmt->execute();
    
    if (!$sellerStmt->fetch()) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Invalid seller ID'
        ], 400);
    }

    // Insert product
    $query = "INSERT INTO products (name, description, price, category_id, seller_id, image_url, stock_quantity, featured) 
              VALUES (:name, :description, :price, :category_id, :seller_id, :image_url, :stock_quantity, :featured)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':category_id', $categoryId);
    $stmt->bindParam(':seller_id', $sellerId);
    $stmt->bindParam(':image_url', $imageUrl);
    $stmt->bindParam(':stock_quantity', $stockQuantity);
    $stmt->bindParam(':featured', $featured, PDO::PARAM_BOOL);

    if ($stmt->execute()) {
        $productId = $db->lastInsertId();
        
        sendJsonResponse([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => [
                'id' => (int)$productId,
                'name' => $name,
                'price' => $price,
                'stock_quantity' => $stockQuantity
            ]
        ]);
    } else {
        throw new Exception('Failed to create product');
    }

} catch (Exception $e) {
    error_log("Product create error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Failed to create product'
    ], 500);
}
?>
