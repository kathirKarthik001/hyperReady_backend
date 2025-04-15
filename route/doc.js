const express = require('express');
const pool = require('../config/db');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Create document
router.post('/create', auth(['admin', 'user']), async (req, res) => {
    const { title, body, doc_url } = req.body;
    const userId = req.user.id;
    if (!title) {
        return res.status(400).json({ error: 'Title required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO docs (userId, title, body, doc_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, title, body, doc_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all documents (admin only)
router.get('/', auth(['admin']), async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM docs');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;