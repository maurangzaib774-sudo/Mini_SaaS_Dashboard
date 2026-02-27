import React from 'react';

/**
 * SearchAndFilter Component
 * Provides search input and status filter dropdown
 * - Search by project name
 * - Filter by status (all, active, on hold, completed)
 * - Add new project button
 */
function SearchAndFilter({ searchTerm, statusFilter, onSearchChange, onStatusFilterChange, onAddProject }) {
  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full md:w-auto">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by project name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Add Project Button */}
      <button
        onClick={onAddProject}
        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        + Add Project
      </button>
    </div>
  );
}

export default SearchAndFilter;
