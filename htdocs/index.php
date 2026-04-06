<?php
// index.php
require_once 'db.php';
require_once 'User.php';
require_once 'Member.php';
require_once 'Transaction.php';

// Initialize classes
 $userObj = new User($pdo);
 $memberObj = new Member($pdo);
 $transObj = new Transaction($pdo);

// --- EXAMPLE 1: Register a User ---
// $userObj->register('admin', 'secret123', 'admin@example.com');


// --- EXAMPLE 2: Add a Member ---
// $memberObj->create('John Doe', '555-1234', '2023-10-01', 'active', 0.00);


// --- EXAMPLE 3: Process a Transaction (Deposit $100) ---
// This inserts a transaction row AND updates the member's balance automatically
// $transObj->create(1, 100.00, 'deposit', '2023-10-02', 'Initial Deposit');


// --- EXAMPLE 4: Display Data ---
echo "<h3>Members List:</h3>";
 $members = $memberObj->getAll();
foreach ($members as $m) {
    echo "ID: {$m['id']} - Name: {$m['name']} - Balance: \${$m['balance']}<br>";
}

echo "<hr><h3>Transaction History:</h3>";
 $transactions = $transObj->getAllWithMemberName();
foreach ($transactions as $t) {
    $color = $t['amount'] >= 0 ? 'green' : 'red';
    echo "<span style='color:$color;'>
            {$t['transaction_date']} | 
            {$t['member_name']} | 
            {$t['transaction_type']} | 
            \${$t['amount']}
          </span><br>";
}
?>