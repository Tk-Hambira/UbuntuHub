<?php
require_once '../config/database.php';

header('Content-Type: application/json');

try {
    $database = new Database();
    $db = $database->getConnection();

    // Get query parameters
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
    $category = isset($_GET['category']) ? trim($_GET['category']) : null;
    $search = isset($_GET['search']) ? trim($_GET['search']) : null;
    $featured_only = isset($_GET['featured']) ? filter_var($_GET['featured'], FILTER_VALIDATE_BOOLEAN) : false;

    // Build the query
    $whereConditions = ["p.status = 'active'"];
    $params = [];

    if ($category) {
        $whereConditions[] = "c.slug = :category";
        $params['category'] = $category;
    }

    if ($search) {
        $whereConditions[] = "(p.name LIKE :search OR p.description LIKE :search)";
        $params['search'] = '%' . $search . '%';
    }

    if ($featured_only) {
        $whereConditions[] = "p.featured = TRUE";
    }

    $whereClause = implode(' AND ', $whereConditions);

    $query = "SELECT p.id, p.name, p.description, p.price, p.image_url, p.stock_quantity, p.featured,
                     c.name as category_name, c.slug as category_slug,
                     u.first_name, u.last_name, u.username as seller_username
              FROM products p 
              LEFT JOIN categories c ON p.category_id = c.id 
              LEFT JOIN users u ON p.seller_id = u.id 
              WHERE $whereClause
              ORDER BY p.featured DESC, p.created_at DESC 
              LIMIT :limit OFFSET :offset";

    $stmt = $db->prepare($query);
    
    // Bind parameters
    foreach ($params as $key => $value) {
        $stmt->bindValue(':' . $key, $value);
    }
    
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $products = $stmt->fetchAll();

    // Get total count for pagination
    $countQuery = "SELECT COUNT(*) as total 
                   FROM products p 
                   LEFT JOIN categories c ON p.category_id = c.id 
                   WHERE $whereClause";
    
    $countStmt = $db->prepare($countQuery);
    foreach ($params as $key => $value) {
        $countStmt->bindValue(':' . $key, $value);
    }
    $countStmt->execute();
    $totalCount = $countStmt->fetch()['total'];

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
        'pagination' => [
            'total' => (int)$totalCount,
            'limit' => $limit,
            'offset' => $offset,
            'has_more' => ($offset + $limit) < $totalCount
        ]
    ]);

} catch (Exception $e) {
    error_log("Products list error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Failed to fetch products',
        'data' => []
    ], 500);
}
?>
