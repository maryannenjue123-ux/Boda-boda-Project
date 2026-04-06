const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db-config');

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find User
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(400).json('User not found');

        const user = result.rows[0];

        // Check Password (In production, use bcrypt.compare)
        if (password !== user.password_hash) { 
            // For demo simplicity, direct comparison. Use bcrypt.compare(password, user.password_hash) in production
             return res.status(400).json('Invalid Credentials');
        }

        // JWT Token
        const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, email: user.email } });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;