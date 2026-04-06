<?php
// Transaction.php
require_once 'db.php';

class Transaction {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Add a transaction (and update member balance automatically)
    public function create($member_id, $amount, $type, $date, $description) {
        try {
            // Start a transaction (ensure both queries succeed or fail together)
            $this->pdo->beginTransaction();

            // 1. Insert into transactions table
            $sql = "INSERT INTO transactions (member_id, amount, transaction_type, transaction_date, description) VALUES (?, ?, ?, ?, ?)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$member_id, $amount, $type, $date, $description]);

            // 2. Update member balance
            $updateSql = "UPDATE members SET balance = balance + ? WHERE id = ?";
            $updateStmt = $this->pdo->prepare($updateSql);
            $updateStmt->execute([$amount, $member_id]);

            // Commit changes
            return $this->pdo->commit();

        } catch (Exception $e) {
            // Rollback if something goes wrong
            $this->pdo->rollBack();
            return false;
        }
    }

    // Get all transactions with Member Names (JOIN)
    public function getAllWithMemberName() {
        $sql = "SELECT t.*, m.name AS member_name 
                FROM transactions t 
                JOIN members m ON t.member_id = m.id 
                ORDER BY t.transaction_date DESC";
        return $this->pdo->query($sql)->fetchAll();
    }
    
    // Get transactions for a specific member
    public function getByMemberId($member_id) {
        $sql = "SELECT * FROM transactions WHERE member_id = ? ORDER BY transaction_date DESC";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$member_id]);
        return $stmt->fetchAll();
    }
}
?>