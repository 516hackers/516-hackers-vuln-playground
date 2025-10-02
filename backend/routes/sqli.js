const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Insecure database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'vuln_app'
});

// Vulnerable SQL Injection endpoint
router.get('/search', (req, res) => {
    const username = req.query.username;
    
    // INTENTIONALLY VULNERABLE - concatenating user input
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    
    console.log('Executing query:', query);
    
    db.query(query, (err, results) => {
        if (err) {
            return res.json({ error: err.message });
        }
        res.json({ users: results, query: query });
    });
});

// Secure version for comparison
router.get('/search-secure', (req, res) => {
    const username = req.query.username;
    
    // Secure parameterized query
    const query = 'SELECT * FROM users WHERE username = ?';
    
    db.query(query, [username], (err, results) => {
        if (err) {
            return res.json({ error: err.message });
        }
        res.json({ users: results, query: query });
    });
});

module.exports = router;
