import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../logo.svg";
import "../styling/staffDashboard.css";

const StaffDashboard = ({ username, setAuthenticated }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const handleNavClick = () => {
    setIsNavOpen(false);
  };
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (!username) return; // Ensure username is available before making the request

    setLoading(true);
    axios
      .get(`${API_URL}/api/tasks/user/${username}`, {
        params: { username }, // Pass username as a query parameter
      })
      .then((response) => {
        setTasks(response.data); // Update tasks state with the fetched data
        setErrorMessage(""); // Clear any previous error messages
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setErrorMessage(
          error.response?.data?.message ||
          "Failed to fetch tasks. Please try again."
        );
      })
      .finally(() => setLoading(false));
}, [username, API_URL]); // Fetch tasks when username changes or component mounts

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
      <header className="staff-header">
        <div>
          <img
            src={logo}
            className="staff-logo"
            alt="Samopz Clinic Logo - Click to Sign Out"
            onClick={handleLogout}
          />
        </div>
        <button onClick={handleLogout} className="sign-out-button">
          Sign Out
        </button>
        {/* Navigation Links */}
        <nav className="navbar">
          <div className={`nav-links ${isNavOpen ? "open" : ""}`}>
            <Link
              to="/add-attendance"
              className="nav-link"
              onClick={handleNavClick}
              aria-label="Add Attendance"
            >
              Add Attendance
            </Link>
            <Link
              to="/staff-attendance"
              className="nav-link"
              onClick={handleNavClick}
              aria-label="View Attendance"
            >
              View Attendance
            </Link>
            <Link
              to="/tasks"
              className="nav-link"
              onClick={handleNavClick}
              aria-label="Manage Tasks"
            >
              Manage Tasks
            </Link>
          </div>
          <div
            className="nav-toggle"
            onClick={toggleNav}
            aria-label="Toggle Navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
      <h2 className="staff-dashboard-title">Staff Dashboard</h2>
      <h1>Welcome, {username}</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {loading && <div className="spinner"></div>} {/* Loading Indicator */}
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
    </div>
  );
};

export default StaffDashboard;
