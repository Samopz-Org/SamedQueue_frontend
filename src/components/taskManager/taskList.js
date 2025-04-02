import React from "react";

const TaskList = ({ tasks, handleUpdateTask, loading }) => (
  <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead >
      <tr style={{ backgroundColor: "#f2f2f2" }}>
        <th>S/N</th>
        <th>Name</th>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((task, index) => (
        <tr key={task._id}>
          <td>{index + 1}</td>
          <td>{task.username}</td>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.status}</td>
          <td>
            {task.status !== "completed" && (
              <button
                onClick={() => handleUpdateTask(task._id)}
                disabled={loading}
                style={{ backgroundColor: "#e6ba2a", color: "white" }}
              >
                Mark as Completed
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TaskList;
