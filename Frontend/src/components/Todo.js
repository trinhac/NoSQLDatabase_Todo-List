import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare, faList } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { TaskDetailsModal } from "./TaskDetailsModal";
export const Todo = ({ task, toggleComplete, deleteTodo, editTodo, editStatus }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const contentStyle = {
    opacity: task.status === "completed" ? 0.5 : 1, // Adjust opacity based on task status
    textDecoration: task.status === "completed" ? "line-through" : "none" // Add strikethrough effect when task is completed
  };

  return (
    <div>
      <div className="Todo" style={contentStyle}>
        <div className="toggle-square" onClick={() => editStatus(task.id)}>
          <FontAwesomeIcon
            icon={task.status === "completed" ? faCheckSquare : faSquare}
            className="square-icon"
          />
        </div>
        <p >{task.title}</p>
        <div>
          <FontAwesomeIcon
            className={`edit-icon ${task.status === "completed" ? "disabled" : ""}`}
            icon={faPenToSquare}
            onClick={task.status === "completed" ? null : () => editTodo(task.id)}
          />
          <FontAwesomeIcon
            className={`delete-icon`}
            icon={faTrash}
            onClick={() => deleteTodo(task.id)}
          />
          <FontAwesomeIcon
            className={`details-btn`}
            icon={faList}
            onClick={openModal} />
        </div>
      </div>
        {showModal && <TaskDetailsModal task={task} onClose={closeModal} />}
    </div>
  );
};