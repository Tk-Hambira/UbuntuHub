<?php
require_once 'config/database.php';

header('Content-Type: application/json');

try {
    $database = new Database();
    $connection = $database->testConnection();
    
    if ($connection) {
        sendJsonResponse([
            'success' => true,
            'message' => 'Ubuntu Hub Namibia API is running',
            'timestamp' => date('Y-m-d H:i:s'),
            'database' => 'connected',
            'endpoints' => [
                'POST /auth/login.php' => 'User login',
                'GET /products/featured.php' => 'Get featured products',
                'GET /products/list.php' => 'Get all products',
                'GET /products/detail.php?id={id}' => 'Get product details',
                'POST /products/create.php' => 'Create new product',
                'GET /categories/list.php' => 'Get all categories',
                'POST /contact/submit.php' => 'Submit contact message',
                'GET /analytics/dashboard.php?type={admin|seller}' => 'Get dashboard stats'
            ]
        ]);
    } else {
        sendJsonResponse([
            'success' => false,
            'message' => 'Database connection failed',
            'timestamp' => date('Y-m-d H:i:s')
        ], 500);
    }
    
} catch (Exception $e) {
    sendJsonResponse([
        'success' => false,
        'message' => 'API initialization failed: ' . $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ], 500);
}
?>
