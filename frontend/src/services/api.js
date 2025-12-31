import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your connection.",
        isNetworkError: true,
      });
    }

    // Handle different error status codes
    const { status, data } = error.response;
    let message = "An error occurred";

    if (status === 404) {
      message = "Resource not found";
    } else if (status === 400) {
      // Handle validation errors - show first error or general message
      if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
        message = data.errors[0].msg || data.error || "Validation error";
      } else {
        message = data.error || data.message || "Invalid request";
      }
    } else if (status === 500) {
      message = "Server error. Please try again later.";
    } else {
      message = data.error || data.message || "An unexpected error occurred";
    }

    return Promise.reject({
      message,
      status,
      data: data?.errors || data,
    });
  }
);

// API methods
export const todoService = {
  // Get all todos
  getAllTodos: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.completed !== undefined) {
        params.append("completed", filters.completed);
      }
      if (filters.priority) {
        params.append("priority", filters.priority);
      }
      if (filters.sort) {
        params.append("sort", filters.sort);
      }

      const response = await api.get(`/todos?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single todo by ID
  getTodoById: async (id) => {
    try {
      const response = await api.get(`/todos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new todo
  createTodo: async (todoData) => {
    try {
      const response = await api.post("/todos", todoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update todo
  updateTodo: async (id, todoData) => {
    try {
      const response = await api.put(`/todos/${id}`, todoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Toggle todo completion
  toggleTodo: async (id) => {
    try {
      const response = await api.patch(`/todos/${id}/toggle`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete todo
  deleteTodo: async (id) => {
    try {
      if (!id) {
        throw new Error("Todo ID is required");
      }
      console.log("Deleting todo with ID:", id);
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Delete API error:", error);
      throw error;
    }
  },
};

export default api;
