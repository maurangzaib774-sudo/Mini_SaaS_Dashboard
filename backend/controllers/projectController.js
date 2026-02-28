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

/**
 * POST /api/projects
 * Create a new project
 * Body: { name, status, deadline, assignedTeamMember, budget }
 * Returns created project object
 */
const createProject = async (req, res) => {
  try {
    const { name, status, deadline, assignedTeamMember, budget } = req.body;

    // Validate required fields
    if (!name || !status || !deadline || !assignedTeamMember || budget === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate budget is a number
    if (isNaN(budget) || budget < 0) {
      return res.status(400).json({ error: 'Budget must be a positive number' });
    }

    // Insert new project into database
    const result = await pool.query(
      'INSERT INTO projects (name, status, deadline, assigned_team_member, budget) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, status, deadline, assigned_team_member as "assignedTeamMember", budget',
      [name, status, deadline, assignedTeamMember, budget]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

/**
 * PUT /api/projects/:id
 * Update an existing project
 * Body: { name, status, deadline, assignedTeamMember, budget }
 * Returns updated project object
 */
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, deadline, assignedTeamMember, budget } = req.body;

    // Validate required fields
    if (!name || !status || !deadline || !assignedTeamMember || budget === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate budget is a number
    if (isNaN(budget) || budget < 0) {
      return res.status(400).json({ error: 'Budget must be a positive number' });
    }

    // Update project in database
    const result = await pool.query(
      'UPDATE projects SET name = $1, status = $2, deadline = $3, assigned_team_member = $4, budget = $5 WHERE id = $6 RETURNING id, name, status, deadline, assigned_team_member as "assignedTeamMember", budget',
      [name, status, deadline, assignedTeamMember, budget, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

/**
 * DELETE /api/projects/:id
 * Delete a project by ID
 * Returns success message
 */
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete project from database
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
