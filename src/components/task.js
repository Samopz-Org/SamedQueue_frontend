import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await axios.get(`${API_URL}/api/tasks`);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError("Error fetching tasks: " + error.message);
      console.error("Error fetching tasks:", error.message);
      throw error;
    }
  };

  const createTask = async (task) => {
    setLoading(true);
    setError(null);
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await axios.post(`${API_URL}/api/tasks`,
        task
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError("Error creating task: " + error.message);
      console.error("Error creating task:", error.message);
      throw error;
    }
  };

  const updateTask = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
       const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await axios.put(`${API_URL}/api/tasks/${id}`,
        updates
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError("Error updating task: " + error.message);
      console.error("Error updating task:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadTasks();
  }, []);

  const handleCreateTask = async () => {
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask.task]);
      setNewTask({ title: "", description: "", status: "pending" });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdateTask = async (id) => {
    try {
      const updatedTask = await updateTask(id, { status: "completed" });
      setTasks(
        tasks.map((task) => (task._id === id ? updatedTask.updatedTask : task))
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={handleCreateTask} disabled={loading}>
          Create Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            {task.status !== "completed" && (
              <button
                onClick={() => handleUpdateTask(task._id)}
                disabled={loading}
              >
                Mark as Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
