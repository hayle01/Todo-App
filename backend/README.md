# Backend API Documentation

## Overview

RESTful API for the To-Do List application built with Node.js, Express, and MongoDB.

## Architecture

### Models (`models/Todo.js`)
- **Todo Schema**: Defines the structure of todo documents
- **Fields**: title, description, completed, priority, dueDate, timestamps
- **Validation**: Built-in Mongoose validation
- **Indexes**: Optimized for common queries

### Controllers (`controllers/todoController.js`)
- **Business Logic**: Handles all CRUD operations
- **Error Handling**: Proper error responses
- **Query Building**: Dynamic filtering and sorting

### Routes (`routes/todoRoutes.js`)
- **RESTful Endpoints**: Standard HTTP methods
- **Middleware**: Validation and error handling

### Middleware
- **Validation** (`middleware/validation.js`): Input validation using express-validator
- **Error Handler** (`middleware/errorHandler.js`): Centralized error handling

## Security

- **Helmet**: Security headers
- **CORS**: Configured for frontend origin
- **Rate Limiting**: Prevents abuse
- **Input Validation**: Prevents malicious input
- **Error Sanitization**: No sensitive data in errors

## Error Handling

All errors are caught and formatted consistently:
```json
{
  "success": false,
  "error": "Error message",
  "stack": "..." // Only in development
}
```

## Validation Rules

- **Title**: Required, 1-200 characters
- **Description**: Optional, max 1000 characters
- **Priority**: Must be 'low', 'medium', or 'high'
- **Due Date**: Must be valid ISO 8601 date
- **Completed**: Must be boolean

