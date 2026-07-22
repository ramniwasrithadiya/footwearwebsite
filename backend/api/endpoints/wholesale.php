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
    !empty($data->company_name) &&
    !empty($data->contact_name) &&
    !empty($data->email) &&
    !empty($data->phone)
){
    $company_name = sanitize_input($data->company_name);
    $contact_name = sanitize_input($data->contact_name);
    $email = sanitize_input($data->email);
    $phone = sanitize_input($data->phone);
    $estimated_quantity = isset($data->estimated_quantity) ? intval($data->estimated_quantity) : null;
    $message = isset($data->message) ? sanitize_input($data->message) : null;

    if(!validate_email($email)) {
        send_json_response(["message" => "Invalid email format."], 400);
    }

    $query = "INSERT INTO wholesale_inquiries (company_name, contact_name, email, phone, estimated_quantity, message) 
              VALUES (:company_name, :contact_name, :email, :phone, :estimated_quantity, :message)";
    $stmt = $db->prepare($query);

    $stmt->bindParam(":company_name", $company_name);
    $stmt->bindParam(":contact_name", $contact_name);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":phone", $phone);
    $stmt->bindParam(":estimated_quantity", $estimated_quantity);
    $stmt->bindParam(":message", $message);

    if($stmt->execute()){
        send_json_response(["message" => "Wholesale inquiry submitted successfully."], 201);
    } else {
        send_json_response(["message" => "Unable to submit inquiry."], 503);
    }
} else {
    send_json_response(["message" => "Incomplete data. Company name, contact name, email, and phone are required."], 400);
}
?>
