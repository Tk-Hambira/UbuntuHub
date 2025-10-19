<?php
require_once '../config/database.php';

header('Content-Type: application/json');

try {
    $database = new Database();
    $db = $database->getConnection();

    // Get JSON input
    $input = getJsonInput();

    if (!$input || !isset($input['name']) || !isset($input['email']) || !isset($input['message'])) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Name, email, and message are required'
        ], 400);
    }

    $name = trim($input['name']);
    $email = trim($input['email']);
    $subject = trim($input['subject'] ?? 'General Inquiry');
    $message = trim($input['message']);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Invalid email address'
        ], 400);
    }

    // Insert contact message
    $query = "INSERT INTO contact_messages (name, email, subject, message) VALUES (:name, :email, :subject, :message)";
    $stmt = $db->prepare($query);
    
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':subject', $subject);
    $stmt->bindParam(':message', $message);
    
    if ($stmt->execute()) {
        sendJsonResponse([
            'success' => true,
            'message' => 'Thank you for your message. We will get back to you soon!'
        ]);
    } else {
        throw new Exception('Failed to save message');
    }

} catch (Exception $e) {
    error_log("Contact submit error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Failed to send message. Please try again.'
    ], 500);
}
?>
