/**
 * Database Connection Script
 * Example script for connecting to PostgreSQL using 'pg' library
 * This demonstrates how to connect and query the database from Node.js
 */

const { Pool } = require('pg');
require('dotenv').config();

// Create connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'mini_sass_dashboard',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

/**
 * Test database connection
 * Example function to verify database connectivity
 */
async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

/**
 * Example: Get all projects
 * Demonstrates querying the projects table
 */
async function getAllProjects() {
  try {
    const result = await pool.query(
      'SELECT id, name, status, deadline, assigned_team_member, budget FROM projects ORDER BY id'
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

/**
 * Example: Get projects by status
 * Demonstrates filtering using the indexed status field
 */
async function getProjectsByStatus(status) {
  try {
    const result = await pool.query(
      'SELECT id, name, status, deadline, assigned_team_member, budget FROM projects WHERE status = $1 ORDER BY deadline',
      [status]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching projects by status:', error);
    throw error;
  }
}

/**
 * Example: Create a new project
 * Demonstrates inserting data into the projects table
 */
async function createProject(projectData) {
  const { name, status, deadline, assignedTeamMember, budget } = projectData;
  try {
    const result = await pool.query(
      'INSERT INTO projects (name, status, deadline, assigned_team_member, budget) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, status, deadline, assignedTeamMember, budget]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

// Example usage (uncomment to test)
/*
(async () => {
  const connected = await testConnection();
  if (connected) {
    console.log('Testing database queries...');
    
    // Get all projects
    const allProjects = await getAllProjects();
    console.log('All projects:', allProjects.length);
    
    // Get active projects
    const activeProjects = await getProjectsByStatus('active');
    console.log('Active projects:', activeProjects.length);
  }
  
  // Close connection pool
  await pool.end();
})();
*/

module.exports = {
  pool,
  testConnection,
  getAllProjects,
  getProjectsByStatus,
  createProject,
};
