const express = require('express');
const router = express.Router();

// Store comments (insecure - no sanitization)
let comments = [];

// Vulnerable XSS endpoint
router.post('/comment', (req, res) => {
    const { comment, username } = req.body;
    
    // INTENTIONALLY VULNERABLE - no input sanitization
    comments.push({ username, comment, timestamp: new Date() });
    
    res.json({ 
        success: true, 
        message: 'Comment added!',
        comments: comments
    });
});

// Get comments (vulnerable - reflects unsanitized data)
router.get('/comments', (req, res) => {
    res.json(comments);
});

// Secure version with basic sanitization
router.post('/comment-secure', (req, res) => {
    const { comment, username } = req.body;
    
    // Basic sanitization
    const sanitizedComment = comment.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const sanitizedUsername = username.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    comments.push({ 
        username: sanitizedUsername, 
        comment: sanitizedComment, 
        timestamp: new Date() 
    });
    
    res.json({ 
        success: true, 
        message: 'Comment added securely!',
        comments: comments
    });
});

module.exports = router;
