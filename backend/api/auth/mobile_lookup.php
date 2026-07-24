<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$mobile = isset($_GET['mobile']) ? $_GET['mobile'] : die(json_encode(["message" => "mobile is required.", "success" => false]));

$query = "SELECT email FROM users WHERE mobile = :mobile LIMIT 0,1";

$stmt = $db->prepare($query);
$stmt->bindParam(':mobile', $mobile);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode(["success" => true, "email" => $row['email']]);
} else {
    http_response_code(404);
    echo json_encode(["message" => "Account not found for this mobile number.", "success" => false]);
}
?>
