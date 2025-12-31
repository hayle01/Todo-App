import React from "react";
import { FaEdit, FaTrash, FaClock, FaFlag } from "react-icons/fa";

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !todo.completed;
  };

  return (
    <div
      className={`card transition-all duration-200 ${
        todo.completed ? "opacity-75" : ""
      }`}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo._id)}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? "bg-primary-600 border-primary-600"
              : "border-gray-300 hover:border-primary-500"
          }`}
          aria-label={
            todo.completed ? "Mark as incomplete" : "Mark as complete"
          }>
          {todo.completed && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold mb-2 ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`text-sm mb-3 ${
                    todo.completed ? "text-gray-400" : "text-gray-600"
                  }`}>
                  {todo.description}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {/* Priority */}
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    priorityColors[todo.priority]
                  }`}>
                  <FaFlag className="w-3 h-3" />
                  {todo.priority.charAt(0).toUpperCase() +
                    todo.priority.slice(1)}
                </span>

                {/* Due Date */}
                {todo.dueDate && (
                  <span
                    className={`inline-flex items-center gap-1 ${
                      isOverdue(todo.dueDate)
                        ? "text-red-600 font-medium"
                        : "text-gray-600"
                    }`}>
                    <FaClock className="w-3 h-3" />
                    {formatDate(todo.dueDate)}
                    {isOverdue(todo.dueDate) && (
                      <span className="ml-1 text-xs">(Overdue)</span>
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(todo)}
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                aria-label="Edit todo">
                <FaEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(todo)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                aria-label="Delete todo">
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
