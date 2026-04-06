<?php
// Member.php
require_once 'db.php';

class Member {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Create a new member
    public function create($name, $phone, $join_date, $status, $balance) {
        $sql = "INSERT INTO members (name, phone, join_date, status, balance) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$name, $phone, $join_date, $status, $balance]);
    }

    // Get all members
    public function getAll() {
        $sql = "SELECT * FROM members ORDER BY join_date DESC";
        return $this->pdo->query($sql)->fetchAll();
    }

    // Get a single member by ID
    public function getById($id) {
        $sql = "SELECT * FROM members WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    // Update member details
    public function update($id, $name, $phone, $status) {
        $sql = "UPDATE members SET name = ?, phone = ?, status = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$name, $phone, $status, $id]);
    }

    // Delete a member
    public function delete($id) {
        $sql = "DELETE FROM members WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$id]);
    }
    
    // Update Balance (helper for transactions)
    public function updateBalance($id, $amount) {
        $sql = "UPDATE members SET balance = balance + ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$amount, $id]);
    }
}
?>