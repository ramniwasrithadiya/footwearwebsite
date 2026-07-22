<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../utils/jwt_helper.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email) && !empty($data->password)) {
    // Determine if it's admin or user login based on a flag, or check both.
    // Assuming simple customer login for this endpoint.
    $query = "SELECT id, first_name, last_name, password_hash FROM users WHERE email = :email LIMIT 0,1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();
    
    if($stmt->rowCount() > 0) {
        $row = $stmt->fetch();
        
        if(password_verify($data->password, $row['password_hash'])) {
            $token = array(
               "iat" => time(),
               "exp" => time() + (60 * 60 * 24), // Valid for 24 hours
               "data" => array(
                   "id" => $row['id'],
                   "email" => $data->email,
                   "name" => $row['first_name'] . ' ' . $row['last_name'],
                   "role" => "customer"
               )
            );
            
            $jwt = JwtHelper::encode($token);
            http_response_code(200);
            echo json_encode(["message" => "Successful login.", "token" => $jwt]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Login failed. Incorrect password."]);
        }
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Login failed. User not found."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data."]);
}
?>
