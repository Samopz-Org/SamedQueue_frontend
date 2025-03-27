import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styling/staffDashboard.css";

const StaffDashboard = ({ username, setAuthenticated }) => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    // Fetch tasks on component mount
    setLoading(true);
    axios
      .get(`${API_URL}/api/tasks`)
      .then((response) => {
        setTasks(response.data);
        setErrorMessage(""); // Clear any previous error messages
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setErrorMessage("Failed to fetch tasks. Please try again.");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run effect only once on mount

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setAuthenticated(false);
    }
  };

  const handleMarkTaskAsCompleted = (taskId) => {
    setLoading(true);
    axios
      .put(`${API_URL}/api/tasks/${taskId}`, { completed: true })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        setErrorMessage(""); // Clear any previous error messages
      })
      .catch((error) => {
        console.error("Error marking task as completed:", error);
        setErrorMessage("Failed to mark task as completed.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="staff-dashboard">
      <h1>Welcome, {username}</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {loading && <div className="spinner"></div>} {/* Loading Indicator */}
      {/* Navigation Links */}
      <nav className="dashboard-nav">
        <div className="nav-links">
          <Link
            to="/add-attendance"
            className="nav-link"
            aria-label="Add Attendance"
          >
            Add Attendance
          </Link>
          <Link
            to="/staff-attendance"
            className="nav-link"
            aria-label="View Attendance"
          >
            View Attendance
          </Link>
          <Link to="/tasks" className="nav-link" aria-label="Manage Tasks">
            Manage Tasks
          </Link>
        </div>
      </nav>
      {/* Tasks Section */}
      <section className="tasks-section">
        <h2>Your Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks assigned.</p>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <span>{task.description}</span>
                <button
                  onClick={() => handleMarkTaskAsCompleted(task.id)}
                  aria-label={`Mark task "${task.description}" as completed`}
                  disabled={loading}
                >
                  Mark as Completed
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default StaffDashboard;
