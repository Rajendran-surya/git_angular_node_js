const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'user_management'
});


router.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});


router.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    pool.query(query, [name, email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to add user' });
        }
        res.status(201).json({ id: results.insertId, name, email });
    });
});

module.exports = router;
