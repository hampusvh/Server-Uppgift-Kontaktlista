const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const mockUser = {
    username: 'testuser',
    password: 'password123',
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username !== mockUser.username || password !== mockUser.password) {
        return res.status(401).json({ message: 'Invalid input' });
    }

    const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
});

module.exports = router;

app.use('/api/auth', require('./routes/authRoutes')); 