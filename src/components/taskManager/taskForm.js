import React from "react";

const TaskForm = ({
  newTask,
  handleInputChange,
  handleCreateTask,
  loading,
}) => (
  <div className="form-group">
    <input
      type="text"
      name="username"
      placeholder="Enter the 'Assigned person Full Name'"
      value={newTask.username}
      onChange={handleInputChange}
      aria-label="Assigned person full name"
    />
    <input
      type="text"
      name="title"
      placeholder="Enter your 'Task Title'"
      value={newTask.title}
      onChange={handleInputChange}
      aria-label="Task title"
    />
    <label htmlFor="message">Description:</label>
    <input
      style={{ height: "70px" }}
      type="text"
      name="description"
      value={newTask.description}
      onChange={handleInputChange}
      aria-label="Task description"
    />
    <button onClick={handleCreateTask} disabled={loading}>
      Create Task
    </button>
  </div>
);

export default TaskForm;
