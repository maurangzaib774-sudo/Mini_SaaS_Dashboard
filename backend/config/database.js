/**
 * Database Configuration
 * Handles PostgreSQL connection using 'pg' library
 * Provides connection pool for efficient database operations
 */

const { Pool } = require('pg');
require('dotenv').config();

// Create PostgreSQL connection pool
// Connection pool allows multiple concurrent database connections
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'mini_sass_dashboard',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  // SSL configuration required for Supabase and most cloud databases
  ssl: process.env.DB_HOST && process.env.DB_HOST.includes('supabase') 
    ? { rejectUnauthorized: false }  // Supabase uses self-signed certificates
    : false,  // Local databases typically don't need SSL
  // Maximum number of clients in the pool
  max: 20,
  // How long a client is allowed to remain idle before being closed
  idleTimeoutMillis: 30000,
  // How long to wait for a connection from the pool
  connectionTimeoutMillis: 10000,  // Increased timeout for cloud connections
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Connect to database
 * Tests the connection and returns the pool
 * @returns {Promise<Pool>} Database connection pool
 */
const connectDB = async () => {
  try {
    // Test connection with a simple query
    const result = await pool.query('SELECT NOW()');
    console.log('Database connection test successful:', result.rows[0].now);
    return pool;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

/**
 * Placeholder function for database queries
 * Can be replaced with actual database operations
 * @param {string} query - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<Object>} Query result
 */
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};

module.exports = {
  pool,
  connectDB,
  query,
};
