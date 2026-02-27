import React, { useState, useEffect } from 'react';
import ProjectTable from './ProjectTable';
import ProjectModal from './ProjectModal';
import SearchAndFilter from './SearchAndFilter';
import { getProjects, createProject, updateProject, deleteProject } from '../services/api';

/**
 * Dashboard Component
 * Main container component that manages project state and handles CRUD operations
 * - Fetches projects on component mount
 * - Manages search and filter state
 * - Handles modal open/close state
 * - Coordinates API calls for CRUD operations
 */
function Dashboard() {
  // State for storing all projects
  const [projects, setProjects] = useState([]);
  
  // State for filtered projects (displayed in table)
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for status filter
  const [statusFilter, setStatusFilter] = useState('all');
  
  // State for modal visibility and editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch projects from API on component mount
   * Uses useEffect hook to run once when component mounts
   */
  useEffect(() => {
    fetchProjects();
  }, []);

  /**
   * Apply search and filter whenever searchTerm or statusFilter changes
   * Filters projects based on search term (project name) and status
   */
  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, projects]);

  /**
   * Fetches all projects from the backend API
   * GET /projects endpoint
   */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects. Please try again.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Applies search and filter to projects
   * - Filters by project name (case-insensitive)
   * - Filters by status (all, active, on hold, completed)
   */
  const applyFilters = () => {
    let filtered = [...projects];

    // Apply search filter (by project name)
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(project =>
        project.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    setFilteredProjects(filtered);
  };

  /**
   * Opens modal for adding a new project
   */
  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  /**
   * Opens modal for editing an existing project
   * @param {Object} project - The project object to edit
   */
  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  /**
   * Closes the modal and resets editing state
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  /**
   * Handles form submission for both create and update
   * POST /projects for new projects
   * PUT /projects/:id for existing projects
   * @param {Object} projectData - The project data from the form
   */
  const handleSubmitProject = async (projectData) => {
    try {
      setLoading(true);
      setError(null);

      if (editingProject) {
        // Update existing project
        const updatedProject = await updateProject(editingProject.id, projectData);
        setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
      } else {
        // Create new project
        const newProject = await createProject(projectData);
        setProjects([...projects, newProject]);
      }

      handleCloseModal();
    } catch (err) {
      setError(`Failed to ${editingProject ? 'update' : 'create'} project. Please try again.`);
      console.error('Error saving project:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles project deletion
   * DELETE /projects/:id endpoint
   * @param {number} projectId - The ID of the project to delete
   */
  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await deleteProject(projectId);
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (err) {
      setError('Failed to delete project. Please try again.');
      console.error('Error deleting project:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Project Dashboard</h1>
        <p className="text-gray-600">Manage your projects efficiently</p>
      </div>

      {/* Error Message Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Search and Filter Section */}
      <SearchAndFilter
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onAddProject={handleAddProject}
      />

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      {/* Projects Table */}
      {!loading && (
        <ProjectTable
          projects={filteredProjects}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      )}

      {/* Project Modal for Add/Edit */}
      {isModalOpen && (
        <ProjectModal
          project={editingProject}
          onClose={handleCloseModal}
          onSubmit={handleSubmitProject}
        />
      )}
    </div>
  );
}

export default Dashboard;
