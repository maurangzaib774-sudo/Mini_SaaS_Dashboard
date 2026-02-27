/**
 * Authentication Routes
 * Handles user registration and login
 * POST /api/register - Register a new user
 * POST /api/login - Authenticate user and return JWT
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * POST /api/register
 * Register a new user
 * Body: { email, password }
 * Returns: { user, token }
 */
router.post('/register', authController.register);

/**
 * POST /api/login
 * Authenticate user and return JWT token
 * Body: { email, password }
 * Returns: { user, token }
 */
router.post('/login', authController.login);

module.exports = router;
