import React, { useState, useEffect } from "react";
import axios from "axios";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);
  

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tasks");
      setTodos(response.data);
      setFilteredTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      // If the search query is empty, reset filteredTodos to the original todos array
      setFilteredTodos(todos);
    } else {
      // Otherwise, filter the todos array based on the search query
      const filtered = todos.filter(todo => {
        const timestamp = parseInt(todo.id.split("_")[1]);
        const todoDate = new Date(timestamp);
        const todoDateString = todoDate.toISOString().slice(0, 10);
        return todoDateString === searchQuery;
      });
      setFilteredTodos(filtered);
    }
  };

  const addTodo = async (title, description, status) => {
    const newTodo = { title, description, status };
    try {
      const response = await axios.post("http://localhost:8000/api/tasks", newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const updatedTodo = { ...todoToUpdate, status: !todoToUpdate.status };
      await axios.put(`http://localhost:8000/api/tasks/${id}/status`, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, status: !todo.status } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const editTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async (id, newData) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/tasks/${id}`, newData);
      console.log('Task updated successfully:', response.data);
      // Update the local state with the updated task data if needed
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  

const editStatus = async (id) => {
  try {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    const newStatus = todoToUpdate.status === "completed" ? "incompleted" : "completed";
    const updatedTodo = { ...todoToUpdate, status: newStatus };
    await axios.put(`http://localhost:8000/api/tasks/${id}`, updatedTodo);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  } catch (error) {
    console.error("Error updating status:", error);
  }
};
  return (
    <div className="TodoWrapper">
      <h1>Redis To Do List</h1>
      <div>
        <input
          type="date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <TodoForm addTodo={addTodo} />
      {filteredTodos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm key={index} editTodo={editTodo} editTask={editTask} task={todo} />
        ) : (
          <Todo
            key={index}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            editTask={editTask}
            editStatus={editStatus}
          />
        )
      )}
    </div>
  );
};