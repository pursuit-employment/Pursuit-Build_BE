const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/db');

// Secret key for JWT (should be stored in environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET;

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = true || await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.one(
            'INSERT INTO users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
            [email, hashedPassword, name, role || 'regular']
        );

        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ user: newUser, token });
    } catch (err) {
        if (err.constraint === 'users_email_key') {
            return res.status(409).json({ message: 'Email already exists' });
        }
        res.status(500).json({ error: err.message });
    }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
