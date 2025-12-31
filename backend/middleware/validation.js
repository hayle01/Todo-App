const { body, validationResult } = require("express-validator");

/**
 * Middleware to handle validation results
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    return res.status(400).json({
      success: false,
      error: errorMessages.join(", "),
      errors: errors.array(),
    });
  }
  next();
};

/**
 * Validation rules for creating a todo
 */
const validateCreateTodo = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),
  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
  body("priority")
    .optional({ checkFalsy: true })
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),
  body("dueDate")
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!value || value === "" || value === null) {
        return true; // Allow empty/null values
      }
      // Check if it's a valid ISO 8601 date
      const date = new Date(value);
      return !isNaN(date.getTime()) && value.match(/^\d{4}-\d{2}-\d{2}/);
    })
    .withMessage("Due date must be a valid ISO 8601 date"),
  body("completed")
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (value === undefined || value === null) {
        return true; // Allow undefined/null
      }
      return typeof value === "boolean" || value === "true" || value === "false";
    })
    .withMessage("Completed must be a boolean"),
  handleValidationErrors,
];

/**
 * Validation rules for updating a todo
 */
const validateUpdateTodo = [
  body("title")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),
  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
  body("priority")
    .optional({ checkFalsy: true })
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),
  body("dueDate")
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (!value || value === "" || value === null) {
        return true; // Allow empty/null values
      }
      // Check if it's a valid ISO 8601 date
      const date = new Date(value);
      return !isNaN(date.getTime()) && value.match(/^\d{4}-\d{2}-\d{2}/);
    })
    .withMessage("Due date must be a valid ISO 8601 date"),
  body("completed")
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (value === undefined || value === null) {
        return true; // Allow undefined/null
      }
      return typeof value === "boolean" || value === "true" || value === "false";
    })
    .withMessage("Completed must be a boolean"),
  handleValidationErrors,
];

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
  handleValidationErrors,
};
