const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} = require("../controllers/todoController");
const {
  validateCreateTodo,
  validateUpdateTodo,
} = require("../middleware/validation");

// Get all todos
router.get("/", getAllTodos);

// Get single todo
router.get("/:id", getTodoById);

// Create new todo
router.post("/", validateCreateTodo, createTodo);

// Update todo
router.put("/:id", validateUpdateTodo, updateTodo);

// Toggle todo completion
router.patch("/:id/toggle", toggleTodo);

// Delete todo
router.delete("/:id", deleteTodo);

module.exports = router;
