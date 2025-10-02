const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'vuln_app'
});

// Weak authentication - vulnerable to bypass
router.post('/login-weak', (req, res) => {
    const { username, password } = req.body;
    
    // INTENTIONALLY VULNERABLE - weak authentication logic
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.json({ error: err.message });
        }
        
        if (results.length > 0) {
            req.session.user = results[0];
            res.json({ success: true, user: results[0], message: 'Login successful!' });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// Strong authentication
router.post('/login-strong', async (req, res) => {
    const { username, password } = req.body;
    
    // Secure parameterized query
    const query = 'SELECT * FROM users WHERE username = ?';
    
    db.query(query, [username], async (err, results) => {
        if (err) {
            return res.json({ error: err.message });
        }
        
        if (results.length > 0) {
            const user = results[0];
            // Compare hashed password
            const validPassword = await bcrypt.compare(password, user.password_hash);
            
            if (validPassword) {
                req.session.user = user;
                res.json({ success: true, user: user, message: 'Login successful!' });
            } else {
                res.json({ success: false, message: 'Invalid credentials' });
            }
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    });
});

// Authentication bypass demonstration
router.get('/admin', (req, res) => {
    // INTENTIONALLY VULNERABLE - weak session validation
    if (req.session.user) {
        res.json({ 
            success: true, 
            message: 'Welcome to admin panel!',
            secret: 'FLAG{AUTH_BYPASS_SUCCESS}'
        });
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
});

module.exports = router;
