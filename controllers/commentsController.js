const db = require('../db/db');
const jwt = require('jsonwebtoken');


// Get all comments for a specific project
const getAllComments = async (req, res) => {
    const { projectId } = req.params;
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const commentsPromise = db.any('SELECT * FROM comments WHERE project_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3', [projectId, limit, offset]);
        const totalCountPromise = db.one('SELECT COUNT(*) FROM comments WHERE project_id = $1', projectId);

        const [comments, totalCount] = await Promise.all([commentsPromise, totalCountPromise]);

        res.json({
            comments,
            totalCount: parseInt(totalCount.count),
            currentPage: parseInt(page),
            totalPages: Math.ceil(parseInt(totalCount.count) / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific comment
const getComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await db.one('SELECT * FROM comments WHERE id = $1', id);
        res.json(comment);
    } catch (error) {
        res.status(404).json({ error: 'Comment not found' });
    }
};

// Create a new comment
const createComment = async (req, res) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add the user ID from the token to the request body
        req.body.user_id = decoded.userId;
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const { projectId, user_id, content } = req.body;
    try {
        const newComment = await db.one(
            'INSERT INTO comments (project_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
            [projectId, user_id, content]
        );
        console.log(newComment);
        res.status(201).json(newComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Update a comment
const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const updatedComment = await db.one(
            'UPDATE comments SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
            [content, id]
        );
        res.json(updatedComment);
    } catch (error) {
        res.status(404).json({ error: 'Comment not found' });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        await db.none('DELETE FROM comments WHERE id = $1', id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: 'Comment not found' });
    }
};

module.exports = {
    getAllComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
};
