import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoFilter from "./components/TodoFilter";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import ConfirmDialog from "./components/ConfirmDialog";
import { todoService } from "./services/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    completed: undefined,
    priority: "",
    sort: "-createdAt",
  });
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, todo: null });

  // Fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.getAllTodos(filters);
      setTodos(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch todos");
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos when filters change
  useEffect(() => {
    fetchTodos();
  }, [filters.completed, filters.priority, filters.sort]);

  // Create new todo
  const handleCreateTodo = async (todoData) => {
    try {
      setError(null);
      const response = await todoService.createTodo(todoData);
      setTodos((prev) => [response.data, ...prev]);
      setShowForm(false);
      return { success: true };
    } catch (err) {
      const errorMsg = err.message || "Failed to create todo";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Update todo
  const handleUpdateTodo = async (id, todoData) => {
    try {
      setError(null);
      const response = await todoService.updateTodo(id, todoData);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data : todo))
      );
      setEditingTodo(null);
      return { success: true };
    } catch (err) {
      const errorMsg = err.message || "Failed to update todo";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Toggle todo completion
  const handleToggleTodo = async (id) => {
    try {
      setError(null);
      const response = await todoService.toggleTodo(id);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data : todo))
      );
    } catch (err) {
      setError(err.message || "Failed to toggle todo");
    }
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (todo) => {
    setDeleteDialog({ isOpen: true, todo });
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    const { todo } = deleteDialog;
    if (!todo) {
      setError("Invalid todo selected for deletion");
      setDeleteDialog({ isOpen: false, todo: null });
      return;
    }

    // Get the ID - MongoDB uses _id, but some APIs might use id
    const todoId = todo._id || todo.id;
    
    if (!todoId) {
      console.error("Todo object:", todo);
      setError("Todo ID not found. Please refresh the page and try again.");
      setDeleteDialog({ isOpen: false, todo: null });
      return;
    }

    try {
      setError(null);
      console.log("Deleting todo with ID:", todoId);
      console.log("Full todo object:", todo);
      await todoService.deleteTodo(todoId);
      setTodos((prev) => prev.filter((t) => {
        const tId = t._id || t.id;
        return tId !== todoId;
      }));
      setDeleteDialog({ isOpen: false, todo: null });
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete todo");
      setDeleteDialog({ isOpen: false, todo: null });
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteDialog({ isOpen: false, todo: null });
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Open form for editing
  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  // Get statistics
  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            My Todo List
          </h1>
          <p className="text-gray-600 text-lg">
            Organize your tasks and boost productivity
          </p>
        </header>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Tasks</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600 mt-1">Completed</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-orange-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600 mt-1">Pending</div>
          </div>
        </div>

        {/* Filters */}
        <TodoFilter filters={filters} onFilterChange={handleFilterChange} />

        {/* Add Todo Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary w-full md:w-auto flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Todo
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <ErrorMessage message={error} onClose={() => setError(null)} />
        )}

        {/* Todo Form Modal */}
        {showForm && (
          <TodoForm
            todo={editingTodo}
            onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
            onCancel={handleCloseForm}
          />
        )}

        {/* Todo List */}
        {loading ? (
          <LoadingSpinner />
        ) : todos.length === 0 ? (
          <div className="card text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-600 text-lg">No todos found</p>
            <p className="text-gray-500 text-sm mt-2">
              {filters.completed !== undefined || filters.priority
                ? "Try adjusting your filters"
                : "Create your first todo to get started"}
            </p>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={deleteDialog.isOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Delete Todo?"
          message={
            deleteDialog.todo
              ? `Are you sure you want to delete "${deleteDialog.todo.title}"? This action cannot be undone.`
              : "Are you sure you want to delete this todo? This action cannot be undone."
          }
          confirmText="Delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
}

export default App;
