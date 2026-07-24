<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $firebase_uid = isset($_GET['firebase_uid']) ? $_GET['firebase_uid'] : die(json_encode(["message" => "firebase_uid is required.", "success" => false]));
    
    // Get user id from firebase_uid
    $user_query = "SELECT id FROM users WHERE firebase_uid = :firebase_uid";
    $user_stmt = $db->prepare($user_query);
    $user_stmt->bindParam(':firebase_uid', $firebase_uid);
    $user_stmt->execute();
    
    if ($user_stmt->rowCount() > 0) {
        $user_id = $user_stmt->fetch(PDO::FETCH_ASSOC)['id'];
        
        // Get wishlist items
        // For simplicity, we just return the full product JSON if it was stored, but since the DB stores product_id, 
        // we'd normally join with products. However, if the frontend sends the full product object and we want to store it, 
        // maybe we should use a JSON column or simpler.
        // Let's assume the frontend just needs an array of product data. 
        // We'll join with the `products` table.
        $query = "SELECT p.* FROM wishlist w JOIN wishlist_items wi ON w.id = wi.wishlist_id JOIN products p ON wi.product_id = p.id WHERE w.user_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        
        $items = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // Convert to the Product type expected by frontend
            $row['price'] = (float)$row['price'];
            if(isset($row['original_price'])) $row['original_price'] = (float)$row['original_price'];
            if(isset($row['reviews'])) $row['reviews'] = (int)$row['reviews'];
            if(isset($row['rating'])) $row['rating'] = (float)$row['rating'];
            // Handle images
            $img_query = "SELECT image_url FROM product_images WHERE product_id = :product_id";
            $img_stmt = $db->prepare($img_query);
            $img_stmt->bindParam(':product_id', $row['id']);
            $img_stmt->execute();
            $images = [];
            while($img = $img_stmt->fetch(PDO::FETCH_ASSOC)){
                $images[] = $img['image_url'];
            }
            if(count($images) > 0) {
                $row['image'] = $images[0];
                $row['images'] = $images;
            } else {
                $row['image'] = 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800'; // Default placeholder
                $row['images'] = [$row['image']];
            }
            $items[] = $row;
        }
        http_response_code(200);
        echo json_encode(["success" => true, "items" => $items]);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "User not found.", "success" => false]);
    }
} elseif ($method === 'POST') {
    // Sync entirely
    $data = json_decode(file_get_contents("php://input"));
    if(!empty($data->firebase_uid) && isset($data->items)) {
        $firebase_uid = $data->firebase_uid;
        
        $user_query = "SELECT id FROM users WHERE firebase_uid = :firebase_uid";
        $user_stmt = $db->prepare($user_query);
        $user_stmt->bindParam(':firebase_uid', $firebase_uid);
        $user_stmt->execute();
        
        if ($user_stmt->rowCount() > 0) {
            $user_id = $user_stmt->fetch(PDO::FETCH_ASSOC)['id'];
            
            // Get or create wishlist
            $wishlist_query = "SELECT id FROM wishlist WHERE user_id = :user_id";
            $w_stmt = $db->prepare($wishlist_query);
            $w_stmt->bindParam(':user_id', $user_id);
            $w_stmt->execute();
            
            if ($w_stmt->rowCount() > 0) {
                $wishlist_id = $w_stmt->fetch(PDO::FETCH_ASSOC)['id'];
            } else {
                $w_insert = "INSERT INTO wishlist (user_id) VALUES (:user_id)";
                $w_inst = $db->prepare($w_insert);
                $w_inst->bindParam(':user_id', $user_id);
                $w_inst->execute();
                $wishlist_id = $db->lastInsertId();
            }
            
            // Clear existing
            $del_query = "DELETE FROM wishlist_items WHERE wishlist_id = :wishlist_id";
            $del_stmt = $db->prepare($del_query);
            $del_stmt->bindParam(':wishlist_id', $wishlist_id);
            $del_stmt->execute();
            
            // Insert new ones
            if (count($data->items) > 0) {
                foreach ($data->items as $item) {
                    $item_id = $item->id;
                    $ins_query = "INSERT IGNORE INTO wishlist_items (wishlist_id, product_id) VALUES (:wishlist_id, :product_id)";
                    $ins_stmt = $db->prepare($ins_query);
                    $ins_stmt->bindParam(':wishlist_id', $wishlist_id);
                    // Since product.id might be a string in frontend (e.g. "1"), it might need to be cast to int, but PHP PDO handles it
                    $ins_stmt->bindParam(':product_id', $item_id);
                    $ins_stmt->execute();
                }
            }
            
            http_response_code(200);
            echo json_encode(["message" => "Wishlist synced successfully.", "success" => true]);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "User not found.", "success" => false]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Incomplete data.", "success" => false]);
    }
}
?>
