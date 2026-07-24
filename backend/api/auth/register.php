<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    $data = json_decode(file_get_contents("php://input"));

    if (
        !empty($data->firebase_uid) &&
        !empty($data->first_name) &&
        !empty($data->last_name) &&
        !empty($data->mobile) &&
        !empty($data->email)
    ) {
        $full_name = $data->first_name . ' ' . $data->last_name;

        $query = "INSERT INTO users 
                  SET firebase_uid=:firebase_uid, 
                      first_name=:first_name, 
                      last_name=:last_name, 
                      full_name=:full_name, 
                      mobile=:mobile, 
                      email=:email";

        $stmt = $db->prepare($query);

        $stmt->bindParam(":firebase_uid", $data->firebase_uid);
        $stmt->bindParam(":first_name", $data->first_name);
        $stmt->bindParam(":last_name", $data->last_name);
        $stmt->bindParam(":full_name", $full_name);
        $stmt->bindParam(":mobile", $data->mobile);
        $stmt->bindParam(":email", $data->email);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(array("message" => "User was created.", "success" => true));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create user.", "success" => false));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create user. Data is incomplete.", "success" => false));
    }
} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        http_response_code(409);
        echo json_encode(array("message" => "User with this email, mobile, or uid already exists.", "success" => false));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Database error: " . $e->getMessage(), "success" => false));
    }
}
?>
