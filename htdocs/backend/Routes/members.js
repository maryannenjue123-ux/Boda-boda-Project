const express = require('express');
const router = express.Router();
const pool = require('../db-config');

// Get All Members
router.get('/', async (req, res) => {
    try {
        const allMembers = await pool.query('SELECT * FROM members ORDER BY id DESC');
        res.json(allMembers.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Add Member
router.post('/', async (req, res) => {
    try {
        const { name, phone, balance } = req.body;
        const newMember = await pool.query(
            'INSERT INTO members (name, phone, balance) VALUES ($1, $2, $3) RETURNING *',
            [name, phone, balance || 0]
        );
        res.json(newMember.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;