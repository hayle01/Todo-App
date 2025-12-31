import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
  if (!todos || todos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
