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

/**
 * POST /api/projects
 * Create a new project
 * Body: { name, status, deadline, assignedTeamMember, budget }
 * Returns: Created project object
 */
router.post('/', projectController.createProject);

/**
 * PUT /api/projects/:id
 * Update an existing project
 * Body: { name, status, deadline, assignedTeamMember, budget }
 * Returns: Updated project object
 */
router.put('/:id', projectController.updateProject);

/**
 * DELETE /api/projects/:id
 * Delete a project by ID
 * Returns: Success message
 */
router.delete('/:id', projectController.deleteProject);

module.exports = router;
