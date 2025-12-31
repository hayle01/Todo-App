import React from "react";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <FaExclamationCircle className="text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="text-red-800 font-semibold mb-1">Error</h4>
        <p className="text-red-700 text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-600 hover:text-red-800 flex-shrink-0"
          aria-label="Close error message">
          <FaTimes className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
