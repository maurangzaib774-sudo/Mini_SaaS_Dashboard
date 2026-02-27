import React, { useState, useEffect } from 'react';

/**
 * ProjectModal Component
 * Modal form for adding or editing projects
 * - Validates required fields
 * - Handles form submission
 * - Smooth open/close animation
 * - Includes all project fields: name, status, deadline, assignedTeamMember, budget
 */
function ProjectModal({ project, onClose, onSubmit }) {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    status: 'active',
    deadline: '',
    assignedTeamMember: '',
    budget: '',
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  /**
   * Initialize form data when editing an existing project
   * Runs when project prop changes
   */
  useEffect(() => {
    if (project) {
      // Format deadline for input (YYYY-MM-DD)
      const deadlineDate = project.deadline 
        ? new Date(project.deadline).toISOString().split('T')[0]
        : '';
      
      setFormData({
        name: project.name || '',
        status: project.status || 'active',
        deadline: deadlineDate,
        assignedTeamMember: project.assignedTeamMember || '',
        budget: project.budget || '',
      });
    } else {
      // Reset form for new project
      setFormData({
        name: '',
        status: 'active',
        deadline: '',
        assignedTeamMember: '',
        budget: '',
      });
    }
    setErrors({});
  }, [project]);

  /**
   * Handles input changes and updates form state
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validates form data before submission
   * @returns {boolean} - True if valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    // Validate project name (required)
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }

    // Validate status (required)
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    // Validate deadline (required)
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      // Check if deadline is in the past (optional validation)
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today && !project) {
        // Only warn for new projects, allow past dates for edits
        // You can remove this check if past dates are allowed
      }
    }

    // Validate assigned team member (required)
    if (!formData.assignedTeamMember.trim()) {
      newErrors.assignedTeamMember = 'Assigned team member is required';
    }

    // Validate budget (required and must be a positive number)
    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    } else {
      const budgetNum = parseFloat(formData.budget);
      if (isNaN(budgetNum) || budgetNum < 0) {
        newErrors.budget = 'Budget must be a positive number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * Validates form and calls onSubmit callback with form data
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert budget to number
      const projectData = {
        ...formData,
        budget: parseFloat(formData.budget),
      };
      onSubmit(projectData);
    }
  };

  /**
   * Handles modal backdrop click to close modal
   * @param {Event} e - Click event
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Modal Body - Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="space-y-4">
            {/* Project Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter project name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Status Field */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.status ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="active">Active</option>
                <option value="on hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
            </div>

            {/* Deadline Field */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.deadline ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.deadline && <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>}
            </div>

            {/* Assigned Team Member Field */}
            <div>
              <label htmlFor="assignedTeamMember" className="block text-sm font-medium text-gray-700 mb-1">
                Assigned Team Member <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="assignedTeamMember"
                name="assignedTeamMember"
                value={formData.assignedTeamMember}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.assignedTeamMember ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter team member name"
              />
              {errors.assignedTeamMember && <p className="mt-1 text-sm text-red-600">{errors.assignedTeamMember}</p>}
            </div>

            {/* Budget Field */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                Budget ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.budget ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter budget amount"
              />
              {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
            </div>
          </div>

          {/* Modal Footer - Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              {project ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectModal;
