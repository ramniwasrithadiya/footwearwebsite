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

$firebase_uid = isset($_GET['firebase_uid']) ? $_GET['firebase_uid'] : die(json_encode(["message" => "firebase_uid is required.", "success" => false]));

$query = "SELECT id, firebase_uid, first_name, last_name, full_name, mobile, email, created_at FROM users WHERE firebase_uid = :firebase_uid LIMIT 0,1";

$stmt = $db->prepare($query);
$stmt->bindParam(':firebase_uid', $firebase_uid);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    http_response_code(200);
    echo json_encode(["success" => true, "profile" => $row]);
} else {
    http_response_code(404);
    echo json_encode(["message" => "Profile not found.", "success" => false]);
}
?>
