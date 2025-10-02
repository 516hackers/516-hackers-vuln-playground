const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(session({
    secret: 'insecure_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Routes
app.use('/sqli', require('./routes/sqli'));
app.use('/xss', require('./routes/xss'));
app.use('/auth', require('./routes/auth'));
app.use('/file-upload', require('./routes/file-upload'));

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Vulnerable app running on http://localhost:${PORT}`);
    console.log('⚠️  FOR TRAINING PURPOSES ONLY - DO NOT USE IN PRODUCTION');
});
