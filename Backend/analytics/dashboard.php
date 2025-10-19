<?php
require_once '../config/database.php';

header('Content-Type: application/json');

try {
    $database = new Database();
    $db = $database->getConnection();

    $userType = $_GET['type'] ?? 'admin';

    if ($userType === 'admin') {
        // Admin dashboard stats
        
        // Total products
        $productsQuery = "SELECT COUNT(*) as total FROM products WHERE status = 'active'";
        $productsStmt = $db->prepare($productsQuery);
        $productsStmt->execute();
        $totalProducts = $productsStmt->fetch()['total'];

        // Total sellers
        $sellersQuery = "SELECT COUNT(*) as total FROM users WHERE role = 'seller' AND status = 'active'";
        $sellersStmt = $db->prepare($sellersQuery);
        $sellersStmt->execute();
        $totalSellers = $sellersStmt->fetch()['total'];

        // Total categories
        $categoriesQuery = "SELECT COUNT(*) as total FROM categories";
        $categoriesStmt = $db->prepare($categoriesQuery);
        $categoriesStmt->execute();
        $totalCategories = $categoriesStmt->fetch()['total'];

        // Unread messages
        $messagesQuery = "SELECT COUNT(*) as total FROM contact_messages WHERE status = 'new'";
        $messagesStmt = $db->prepare($messagesQuery);
        $messagesStmt->execute();
        $unreadMessages = $messagesStmt->fetch()['total'];

        // Recent activity (latest products)
        $recentQuery = "SELECT p.name, p.created_at, u.first_name, u.last_name 
                        FROM products p 
                        LEFT JOIN users u ON p.seller_id = u.id 
                        WHERE p.status = 'active' 
                        ORDER BY p.created_at DESC 
                        LIMIT 5";
        $recentStmt = $db->prepare($recentQuery);
        $recentStmt->execute();
        $recentActivity = $recentStmt->fetchAll();

        sendJsonResponse([
            'success' => true,
            'data' => [
                'stats' => [
                    'total_products' => (int)$totalProducts,
                    'total_sellers' => (int)$totalSellers,
                    'total_categories' => (int)$totalCategories,
                    'unread_messages' => (int)$unreadMessages
                ],
                'recent_activity' => array_map(function($item) {
                    return [
                        'product_name' => $item['name'],
                        'seller_name' => trim($item['first_name'] . ' ' . $item['last_name']),
                        'created_at' => $item['created_at']
                    ];
                }, $recentActivity)
            ]
        ]);

    } else if ($userType === 'seller') {
        // Seller dashboard stats (requires seller_id parameter)
        $sellerId = $_GET['seller_id'] ?? null;
        
        if (!$sellerId) {
            sendJsonResponse([
                'success' => false,
                'message' => 'Seller ID is required'
            ], 400);
        }

        // Seller's products count
        $productsQuery = "SELECT COUNT(*) as total FROM products WHERE seller_id = :seller_id AND status = 'active'";
        $productsStmt = $db->prepare($productsQuery);
        $productsStmt->bindParam(':seller_id', $sellerId);
        $productsStmt->execute();
        $totalProducts = $productsStmt->fetch()['total'];

        // Featured products count
        $featuredQuery = "SELECT COUNT(*) as total FROM products WHERE seller_id = :seller_id AND status = 'active' AND featured = TRUE";
        $featuredStmt = $db->prepare($featuredQuery);
        $featuredStmt->bindParam(':seller_id', $sellerId);
        $featuredStmt->execute();
        $featuredProducts = $featuredStmt->fetch()['total'];

        // Low stock products
        $lowStockQuery = "SELECT COUNT(*) as total FROM products WHERE seller_id = :seller_id AND status = 'active' AND stock_quantity <= 5";
        $lowStockStmt = $db->prepare($lowStockQuery);
        $lowStockStmt->bindParam(':seller_id', $sellerId);
        $lowStockStmt->execute();
        $lowStockProducts = $lowStockStmt->fetch()['total'];

        // Recent products
        $recentQuery = "SELECT name, created_at, stock_quantity, featured 
                        FROM products 
                        WHERE seller_id = :seller_id AND status = 'active' 
                        ORDER BY created_at DESC 
                        LIMIT 5";
        $recentStmt = $db->prepare($recentQuery);
        $recentStmt->bindParam(':seller_id', $sellerId);
        $recentStmt->execute();
        $recentActivity = $recentStmt->fetchAll();

        sendJsonResponse([
            'success' => true,
            'data' => [
                'stats' => [
                    'total_products' => (int)$totalProducts,
                    'featured_products' => (int)$featuredProducts,
                    'low_stock_products' => (int)$lowStockProducts,
                    'categories_used' => 0 // Calculate later if needed
                ],
                'recent_activity' => array_map(function($item) {
                    return [
                        'product_name' => $item['name'],
                        'created_at' => $item['created_at'],
                        'stock_quantity' => (int)$item['stock_quantity'],
                        'featured' => (bool)$item['featured']
                    ];
                }, $recentActivity)
            ]
        ]);
    } else {
        sendJsonResponse([
            'success' => false,
            'message' => 'Invalid user type'
        ], 400);
    }

} catch (Exception $e) {
    error_log("Dashboard stats error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Failed to fetch dashboard stats'
    ], 500);
}
?>
