import React from "react";

export const TaskDetailsModal = ({ task, onClose }) => {
  const task_id = task.id; 
  const timestamp = parseInt(task_id.split("_")[1]); // Extract the timestamp and convert it to a number
  const dateTime = new Date(timestamp); // Create a Date object using the timestamp
  const formattedDateTime = dateTime.toLocaleString(); // Format the Date object into a human-readable string

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2 className="modal-title">{task.title}</h2>
          <h3 className="modal-description">Description:</h3>
          <p className="text-description">{task.description}</p>
          <h3 className="modal-status">Status:</h3>
          <p className="text-status">{task.status}</p>
          <h5 className="modal-task-create-date">Date created:</h5>
          <p className="created-date">{formattedDateTime}</p> {/* Display formatted date time */}
        </div>
      </div>
    </div>
  );
};