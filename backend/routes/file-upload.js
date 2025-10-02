const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Insecure file upload configuration
const insecureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // INTENTIONALLY VULNERABLE - using original filename
        cb(null, file.originalname);
    }
});

const insecureUpload = multer({ 
    storage: insecureStorage,
    // No file type restrictions
});

// Secure file upload configuration
const secureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'secure-uploads/');
    },
    filename: (req, file, cb) => {
        // Secure - generate safe filename
        const ext = path.extname(file.originalname);
        const name = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, name + ext);
    }
});

const secureUpload = multer({ 
    storage: secureStorage,
    fileFilter: (req, file, cb) => {
        // Only allow specific file types
        const allowedTypes = ['.jpg', '.jpeg', '.png', '.pdf', '.txt'];
        const ext = path.extname(file.originalname).toLowerCase();
        
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('File type not allowed'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Vulnerable file upload
router.post('/insecure', insecureUpload.single('file'), (req, res) => {
    res.json({
        success: true,
        message: 'File uploaded (insecurely)!',
        filename: req.file.originalname,
        path: req.file.path
    });
});

// Secure file upload
router.post('/secure', secureUpload.single('file'), (req, res) => {
    res.json({
        success: true,
        message: 'File uploaded securely!',
        filename: req.file.filename,
        path: req.file.path
    });
});

// List uploaded files
router.get('/files', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    
    try {
        const files = fs.readdirSync('uploads/');
        res.json({ files });
    } catch (error) {
        res.json({ files: [] });
    }
});

module.exports = router;
