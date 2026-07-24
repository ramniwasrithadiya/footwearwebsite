<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$firebase_uid = isset($_GET['firebase_uid']) ? $_GET['firebase_uid'] : die(json_encode(["message" => "firebase_uid is required.", "success" => false]));

$user_query = "SELECT id FROM users WHERE firebase_uid = :firebase_uid";
$user_stmt = $db->prepare($user_query);
$user_stmt->bindParam(':firebase_uid', $firebase_uid);
$user_stmt->execute();

if ($user_stmt->rowCount() > 0) {
    $user_id = $user_stmt->fetch(PDO::FETCH_ASSOC)['id'];
    
    // We would fetch from an orders table here.
    // For now, let's return an empty array if there's no orders table fully defined in the schema for items yet, 
    // or if we just want to mock it gracefully from the PHP side.
    $orders = [];
    
    // Check if orders table exists and query it.
    try {
      $order_query = "SELECT * FROM orders WHERE user_id = :user_id ORDER BY created_at DESC";
      $order_stmt = $db->prepare($order_query);
      $order_stmt->bindParam(':user_id', $user_id);
      $order_stmt->execute();
      
      while ($row = $order_stmt->fetch(PDO::FETCH_ASSOC)) {
          // Map to frontend Order interface
          $orders[] = [
              "id" => $row['id'],
              "orderId" => "ORD-" . str_pad($row['id'], 5, '0', STR_PAD_LEFT),
              "productName" => "Product", // Need join with order_items
              "productImage" => "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80",
              "quantity" => 1,
              "orderDate" => date('Y-m-d', strtotime($row['created_at'])),
              "status" => $row['status'] ?? 'Processing',
              "totalAmount" => $row['total_amount'] ?? 0
          ];
      }
    } catch (Exception $e) {
      // Ignore if table doesn't exist yet
    }
    
    http_response_code(200);
    echo json_encode(["success" => true, "orders" => $orders]);
} else {
    http_response_code(404);
    echo json_encode(["message" => "User not found.", "success" => false]);
}
?>
