/**
 * Main Server File
 * Sets up Express server, middleware, and routes
 * Connects to PostgreSQL database
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

// Import database connection
const { connectDB } = require('./config/database');

// Initialize Express app
const app = express();

// Port configuration (default: 5000)
const PORT = process.env.PORT || 5000;

// Middleware
// Enable CORS for frontend requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes
// Authentication routes (public - no JWT required)
app.use('/api', authRoutes);

// Project routes (protected - JWT required)
app.use('/api/projects', projectRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to PostgreSQL database
    await connectDB();
    console.log('Database connected successfully');

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

module.exports = app;
