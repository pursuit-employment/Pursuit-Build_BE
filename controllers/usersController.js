const db = require('../db/db');
const bcrypt = require('bcrypt');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await db.any('SELECT id, name, email, role FROM users');
        res.json(users);
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a specific user
const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.oneOrNone('SELECT id, name, email FROM users WHERE id = $1', [id]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedUser = await db.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
            [name, email, id]
        );
        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser.rows[0]);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
        if (deletedUser.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
};
