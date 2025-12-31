import React from "react";
import { FaFilter } from "react-icons/fa";

const TodoFilter = ({ filters, onFilterChange }) => {
  const handleChange = (name, value) => {
    onFilterChange({ [name]: value });
  };

  return (
    <div className="card mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status"
            value={
              filters.completed === undefined
                ? "all"
                : filters.completed.toString()
            }
            onChange={(e) => {
              const value = e.target.value;
              handleChange(
                "completed",
                value === "all" ? undefined : value === "true"
              );
            }}
            className="input-field">
            <option value="all">All</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={filters.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            className="input-field">
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sort"
            value={filters.sort}
            onChange={(e) => handleChange("sort", e.target.value)}
            className="input-field">
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="-priority">Priority (High to Low)</option>
            <option value="priority">Priority (Low to High)</option>
            <option value="title">Title (A-Z)</option>
            <option value="-title">Title (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.completed !== undefined || filters.priority) && (
        <div className="mt-4">
          <button
            onClick={() =>
              onFilterChange({ completed: undefined, priority: "" })
            }
            className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoFilter;
