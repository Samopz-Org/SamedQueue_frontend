import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./taskForm";
import TaskList from "./taskList";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskManager = ({ API_URL }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    username: "",
    status: "pending",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.username) {
      toast.error("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/tasks`, newTask);
      setTasks([...tasks, response.data.task]);
      setNewTask({
        title: "",
        description: "",
        username: "",
        status: "pending",
      });
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/api/tasks/${id}`, {
        status: "completed",
      });
      setTasks(
        tasks.map((task) =>
          task._id === id ? response.data.updatedTask : task
        )
      );
      toast.success("Task marked as completed!");
    } catch (error) {
      toast.error("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_URL]);

  return (
    <div className="container">
      <h1>Task Manager</h1>
      {loading && <div className="spinner"></div>}
      <TaskForm
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleCreateTask={handleCreateTask}
        loading={loading}
      />
      <TaskList
        tasks={tasks}
        handleUpdateTask={handleUpdateTask}
        loading={loading}
      />
    </div>
  );
};

export default TaskManager;
