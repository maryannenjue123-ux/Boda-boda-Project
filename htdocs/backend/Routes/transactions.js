const express = require('express');
const router = express.Router();
const pool = require('../db-config');

// Get All Transactions (with Member Names)
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT t.id, t.member_id, m.name as member_name, t.type, t.amount, t.description, t.transaction_date 
            FROM transactions t 
            JOIN members m ON t.member_id = m.id 
            ORDER BY t.id DESC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Add Transaction (Updates Member Balance automatically)
router.post('/', async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { member_id, type, amount, description } = req.body;

        // 1. Update Member Balance
        let updateQuery = '';
        if (type === 'deposit') {
            updateQuery = 'UPDATE members SET balance = balance + $1 WHERE id = $2';
        } else {
            updateQuery = 'UPDATE members SET balance = balance - $1 WHERE id = $2';
        }
        
        await client.query(updateQuery, [amount, member_id]);

        // 2. Record Transaction
        const insertQuery = 'INSERT INTO transactions (member_id, type, amount, description) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await client.query(insertQuery, [member_id, type, amount, description]);

        await client.query('COMMIT');
        res.json(result.rows[0]);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err.message);
        res.status(500).send('Transaction Failed');
    } finally {
        client.release();
    }
});

module.exports = router;