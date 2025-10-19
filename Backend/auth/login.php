<?php
require_once '../config/database.php';

header('Content-Type: application/json');

try {
    $database = new Database();
    $db = $database->getConnection();

    // Get JSON input
    $input = getJsonInput();

    if (!$input || !isset($input['email']) || !isset($input['password'])) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Email and password are required'
        ], 400);
    }

    $email = trim($input['email']);
    $password = trim($input['password']);
    $role = isset($input['role']) ? trim($input['role']) : null;

    // Query user by email
    $query = "SELECT id, username, email, password_hash, first_name, last_name, phone, role, status 
              FROM users 
              WHERE email = :email AND status = 'active'";
    
    if ($role) {
        $query .= " AND role = :role";
    }

    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $email);
    
    if ($role) {
        $stmt->bindParam(':role', $role);
    }
    
    $stmt->execute();
    $user = $stmt->fetch();

    if (!$user) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }

    // For demo purposes, we'll use simple password verification
    // In production, use password_verify() with proper hashing
    $validPasswords = [
        'admin123' => true,
        'seller123' => true
    ];

    if (!isset($validPasswords[$password])) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }

    // Update last login
    $updateQuery = "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = :id";
    $updateStmt = $db->prepare($updateQuery);
    $updateStmt->bindParam(':id', $user['id']);
    $updateStmt->execute();

    // Generate a simple token (in production, use JWT or session-based auth)
    $token = base64_encode($user['id'] . '_' . time() . '_' . $user['role']);

    // Remove sensitive data
    unset($user['password_hash']);

    sendJsonResponse([
        'success' => true,
        'message' => 'Login successful',
        'user' => $user,
        'token' => $token
    ]);

} catch (Exception $e) {
    error_log("Login error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Server error occurred'
    ], 500);
}
?>
