<?php
// auth_api.php
header('Content-Type: application/json');

// 1. Setup Database and Classes
require_once 'db.php';
require_once 'User.php';

// 2. Get the raw JSON data sent by JavaScript
 $inputJSON = file_get_contents('php://input');
 $input = json_decode($inputJSON, true);

 $response = ['success' => false, 'message' => 'Invalid request'];

// Initialize User Class
 $userObj = new User($pdo);

// 3. Check what action is requested
if (isset($input['action'])) {
    
    if ($input['action'] === 'register') {
        // Handle Registration
        $name = $input['name'];
        $pass= $input['password'];
        $email = $input['email'];

        // Attempt to register
        if ($userObj->register($name, $pass, $email)) { // Note: Ensure your User.php accepts name as first arg or adjust here
            $response = ['success' => true, 'message' => 'User created in database!'];
        } else {
            $response = ['success' => false, 'message' => 'Email already exists in database.'];
        }
    } 
    
    elseif ($input['action'] === 'login') {
        // Handle Login
        $email = $input['email'];
        $pass = $input['password'];

        $userData = $userObj->login($email, $pass); // Note: Ensure your User.php login accepts email

        if ($userData) {
            // Start session
            session_start();
            $_SESSION['user_id'] = $userData['id'];
            $_SESSION['username'] = $userData['username'];
            
            $response = [
                'success' => true, 
                'message' => 'Login successful',
                'user' => $userData
            ];
        } else {
            $response = ['success' => false, 'message' => 'Invalid database credentials.'];
        }
    }
}

// 4. Send response back to JavaScript
echo json_encode($response);
?>