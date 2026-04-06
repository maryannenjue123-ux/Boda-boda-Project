<?php
// User.php
require_once 'db.php';

class User {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function register($username, $password, $email) {
        // 1. Hash the password for security
        $hash = password_hash($password, PASSWORD_DEFAULT);
        
        // 2. Insert into the USERS table (not members)
        $sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        
        return $stmt->execute([$username, $hash, $email]);
    }
}
?>