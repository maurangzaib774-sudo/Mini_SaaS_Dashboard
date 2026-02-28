/**
 * Project Controller
 * Handles all CRUD operations for projects
 * GET /projects - Get all projects
 * GET /projects/:id - Get project by ID
 * POST /projects - Create new project
 * PUT /projects/:id - Update project
 * DELETE /projects/:id - Delete project
 */

const { pool } = require('../config/database');

/**
 * GET /api/projects
 * Get all projects from database
 * Returns array of all projects
 */
const getAllProjects = async (req, res) => {
  try {
    // Query all projects from database
    // Placeholder: Replace with actual database query
    const result = await pool.query(
      'SELECT id, name, status, deadline, assigned_team_member as "assignedTeamMember", budget FROM projects ORDER BY id DESC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

/**
 * GET /api/projects/:id
 * Get a single project by ID
 * Returns project object or 404 if not found
 */
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    // Query project by ID
    const result = await pool.query(
      'SELECT id, name, status, deadline, assigned_team_member as "assignedTeamMember", budget FROM projects WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};


module.exports = {
  getAllProjects,
  getProjectById,
 
};