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
      placeholder="Enter the 'Task Title'"
      value={newTask.title}
      onChange={handleInputChange}
      aria-label="Task title"
    />
    <label htmlFor="message">Description:</label>
    <textarea
      type="text"
      name="description"
      value={newTask.description}
      onChange={handleInputChange}
      aria-label="Task description"
    ></textarea>
    <button onClick={handleCreateTask} disabled={loading}>
      Create Task
    </button>
  </div>
);

export default TaskForm;
