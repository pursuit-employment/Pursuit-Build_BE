const db = require('../db/db'); // Assuming you have a database connection setup

// GET all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await db.any('SELECT * FROM projects');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET a single project by id
const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await db.oneOrNone('SELECT * FROM projects WHERE id = $1', [id]);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST a new project
const createProject = async (req, res) => {
    try {
        const { title, description, requester_id, product_manager_id, status } = req.body;
        const newProject = await db.one(
            'INSERT INTO projects (title, description, requester_id, product_manager_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, requester_id, product_manager_id, status]
        );
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT (update) a project
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, requester_id, product_manager_id, status } = req.body;
        const updatedProject = await db.oneOrNone(
            'UPDATE projects SET title = $1, description = $2, requester_id = $3, product_manager_id = $4, status = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
            [title, description, requester_id, product_manager_id, status, id]
        );
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(updatedProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE a project
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await db.oneOrNone('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
};
