<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../utils/validation.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(
    !empty($data->name) &&
    !empty($data->email) &&
    !empty($data->message)
){
    $name = sanitize_input($data->name);
    $email = sanitize_input($data->email);
    $phone = isset($data->phone) ? sanitize_input($data->phone) : null;
    $message = sanitize_input($data->message);

    if(!validate_email($email)) {
        send_json_response(["message" => "Invalid email format."], 400);
    }

    $query = "INSERT INTO contact_inquiries (name, email, phone, message) VALUES (:name, :email, :phone, :message)";
    $stmt = $db->prepare($query);

    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":phone", $phone);
    $stmt->bindParam(":message", $message);

    if($stmt->execute()){
        send_json_response(["message" => "Message sent successfully."], 201);
    } else {
        send_json_response(["message" => "Unable to send message."], 503);
    }
} else {
    send_json_response(["message" => "Incomplete data. Name, email and message are required."], 400);
}
?>
