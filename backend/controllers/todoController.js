const Todo = require("../models/Todo");

/**
 * @desc    Get all todos
 * @route   GET /api/todos
 * @access  Public
 */
const getAllTodos = async (req, res, next) => {
  try {
    const { completed, priority, sort = "-createdAt" } = req.query;

    // Build query
    const query = {};
    if (completed !== undefined) {
      query.completed = completed === "true";
    }
    if (priority) {
      query.priority = priority;
    }

    // Execute query with sorting
    const todos = await Todo.find(query).sort(sort);

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single todo by ID
 * @route   GET /api/todos/:id
 * @access  Public
 */
const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new todo
 * @route   POST /api/todos
 * @access  Public
 */
const createTodo = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    // Title is already validated and trimmed by middleware
    // Just ensure we have it (safety check)
    if (!title) {
      return res.status(400).json({
        success: false,
        error: "Title is required",
      });
    }

    // Convert string boolean to actual boolean if needed
    let completedValue = false;
    if (completed !== undefined && completed !== null) {
      if (typeof completed === "boolean") {
        completedValue = completed;
      } else if (typeof completed === "string") {
        completedValue = completed === "true";
      }
    }

    // Handle empty string for dueDate
    const dueDateValue = dueDate && dueDate.trim() !== "" ? dueDate : null;

    const todo = await Todo.create({
      title,
      description: description || "",
      priority: priority || "medium",
      dueDate: dueDateValue,
      completed: completedValue,
    });

    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update todo
 * @route   PUT /api/todos/:id
 * @access  Public
 */
const updateTodo = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }

    // Update fields with proper type conversion
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (priority !== undefined) todo.priority = priority;
    if (dueDate !== undefined) {
      // Handle empty string for dueDate
      todo.dueDate = dueDate && dueDate.trim() !== "" ? dueDate : null;
    }
    if (completed !== undefined) {
      // Convert string boolean to actual boolean if needed
      if (typeof completed === "boolean") {
        todo.completed = completed;
      } else if (typeof completed === "string") {
        todo.completed = completed === "true";
      } else {
        todo.completed = Boolean(completed);
      }
    }

    const updatedTodo = await todo.save();

    res.status(200).json({
      success: true,
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete todo
 * @route   DELETE /api/todos/:id
 * @access  Public
 */
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id || id.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Todo ID is required",
      });
    }

    // Check if ID is a valid MongoDB ObjectId format (24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid todo ID format",
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle todo completion status
 * @route   PATCH /api/todos/:id/toggle
 * @access  Public
 */
const toggleTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }

    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();

    res.status(200).json({
      success: true,
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
};
