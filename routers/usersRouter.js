const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/usersController');

const { authenticateToken } = require('../middleware/auth.js');

// Get all users
router.get('/', getAllUsers);

// Get a specific user
router.get('/:id', getUser);


// Update a user (protected route)
router.put('/:id', authenticateToken, updateUser);

// Delete a user (protected route)
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;
