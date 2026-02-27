import axios from 'axios';

// Base URL for the backend API
// Update this to match your backend server URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor to add JWT token to requests
 * Retrieves token from localStorage and adds it to Authorization header
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor to handle 401 errors (unauthorized)
 * Redirects to login if token is invalid or expired
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Optionally redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * API Service Functions
 * Placeholder functions for CRUD operations
 */

/**
 * GET /projects
 * Fetches all projects from the backend
 * @returns {Promise<Array>} Array of project objects
 */
export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * GET /projects/:id
 * Fetches a single project by ID
 * @param {number} id - Project ID
 * @returns {Promise<Object>} Project object
 */
export const getProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

/**
 * POST /projects
 * Creates a new project
 * @param {Object} projectData - Project data object
 * @returns {Promise<Object>} Created project object
 */
export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

/**
 * PUT /projects/:id
 * Updates an existing project
 * @param {number} id - Project ID
 * @param {Object} projectData - Updated project data
 * @returns {Promise<Object>} Updated project object
 */
export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

/**
 * DELETE /projects/:id
 * Deletes a project by ID
 * @param {number} id - Project ID
 * @returns {Promise<void>}
 */
export const deleteProject = async (id) => {
  try {
    await api.delete(`/projects/${id}`);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

/**
 * Authentication API Functions
 */

/**
 * POST /register
 * Registers a new user
 * @param {Object} userData - User data (email, password)
 * @returns {Promise<Object>} Response with user data and token
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * POST /login
 * Authenticates a user and returns JWT token
 * @param {Object} credentials - Login credentials (email, password)
 * @returns {Promise<Object>} Response with user data and token
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Logout function
 * Removes token from localStorage
 */
export const logout = () => {
  localStorage.removeItem('token');
};

export default api;
