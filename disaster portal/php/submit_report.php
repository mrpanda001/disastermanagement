<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "disaster_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$emergencyType = $_POST['emergencyType'];
$location = $_POST['location'];
$description = $_POST['description'];
$severity = $_POST['severity'];
$contact = $_POST['contact'];
$anonymous = isset($_POST['anonymous']) ? 1 : 0;
$timestamp = date('Y-m-d H:i:s');

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO emergency_reports (emergency_type, location, description, severity, contact, anonymous, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssis", $emergencyType, $location, $description, $severity, $contact, $anonymous, $timestamp);

// Execute the statement
if ($stmt->execute()) {
    // Send notification to emergency services based on severity
    if ($severity == 'critical' || $severity == 'high') {
        // In a real application, you would implement actual notification logic here
        // This could include sending emails, SMS, or integrating with emergency services APIs
        $notification = "Critical emergency reported at: " . $location;
        // Log the notification (in a real application, this would be sent to emergency services)
        error_log($notification);
    }
    
    // Return success response
    header('Content-Type: application/json');
    echo json_encode(['status' => 'success', 'message' => 'Emergency report submitted successfully']);
} else {
    // Return error response
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Error submitting report']);
}

// Close connections
$stmt->close();
$conn->close();
?> 