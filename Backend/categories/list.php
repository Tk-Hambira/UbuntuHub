<?php
require_once '../config/database.php';

header('Content-Type: application/json');

try {
    $database = new Database();
    $db = $database->getConnection();

    // Get categories
    $query = "SELECT id, name, slug, sort_order FROM categories ORDER BY sort_order ASC, name ASC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $categories = $stmt->fetchAll();

    // Format the response
    $formattedCategories = array_map(function($category) {
        return [
            'id' => (int)$category['id'],
            'name' => $category['name'],
            'slug' => $category['slug'],
            'sort_order' => (int)$category['sort_order']
        ];
    }, $categories);

    sendJsonResponse([
        'success' => true,
        'data' => $formattedCategories
    ]);

} catch (Exception $e) {
    error_log("Categories error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Failed to fetch categories',
        'data' => []
    ], 500);
}
?>
