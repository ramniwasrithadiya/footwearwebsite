<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT p.id, p.name, p.slug, p.description, p.base_price, c.name as category_name
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          WHERE p.is_active = 1";

$stmt = $db->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

if($num > 0) {
    $products_arr = array();
    $products_arr["records"] = array();
    
    while ($row = $stmt->fetch()) {
        extract($row);
        $product_item = array(
            "id" => $id,
            "name" => $name,
            "slug" => $slug,
            "description" => html_entity_decode($description),
            "price" => $base_price,
            "category" => $category_name
        );
        array_push($products_arr["records"], $product_item);
    }
    
    http_response_code(200);
    echo json_encode($products_arr);
} else {
    http_response_code(404);
    echo json_encode(["message" => "No products found."]);
}
?>
