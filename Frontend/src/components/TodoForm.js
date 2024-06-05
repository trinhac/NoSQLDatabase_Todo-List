import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return; // Ensuring title is not empty
    addTodo(title, description, status); // Passing title, description, and status to addTodo function
    setTitle(""); // Clearing title after adding todo
    setDescription(""); // Clearing description after adding todo
    setStatus(""); // Clearing status after adding todo
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="todo-input"
        placeholder="Add task"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="todo-input"
        placeholder="Add description"
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};