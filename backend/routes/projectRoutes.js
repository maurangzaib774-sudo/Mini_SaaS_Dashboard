/**
 * Project Routes
 * Handles all CRUD operations for projects
 * All routes are protected with JWT authentication middleware
 */

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply JWT authentication middleware to all project routes
router.use(authMiddleware);

/**
 * GET /api/projects
 * Get all projects
 * Returns: Array of project objects
 */
router.get('/', projectController.getAllProjects);

/**
 * GET /api/projects/:id
 * Get a single project by ID
 * Returns: Project object
 */
router.get('/:id', projectController.getProjectById);

module.exports = router;
