const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectsController');

const {
    getAllComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/commentsController');

// Project routes
router.get('/', getAllProjects);
router.get('/:id', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// Comment routes for a specific project
router.get('/:projectId/comments', getAllComments);
router.get('/:projectId/comments/:commentId', getComment);
router.post('/:projectId/comments', createComment);
router.put('/:projectId/comments/:commentId', updateComment);
router.delete('/:projectId/comments/:commentId', deleteComment);

// Github repo routes for a specific project
// router.get('/:projectId/github-repo', getGithubRepo);
// router.post('/:projectId/github-repo', createGithubRepo);
// router.put('/:projectId/github-repo/:githubRepoId', updateGithubRepo);
// router.delete('/:projectId/github-repo/:githubRepoId', deleteGithubRepo);

module.exports = router;
