<?php
// register_user.php
require_once 'db.php';
require_once 'User.php';

// Initialize the User Class
 $userObj = new User($pdo);

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get raw data
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email    = $_POST['email'];

    // Call the register function from User.php
    if ($userObj->register($username, $password, $email)) {
        echo "<h3>Success! User created in the 'users' table.</h3>";
        echo "<a href='register.html'>Create another</a>";
    } else {
        echo "<h3 style='color:red'>Error. Username might already exist.</h3>";
    }

} else {
    echo "Please submit the form.";
}
?>