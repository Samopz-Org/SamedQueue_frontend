import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styling/staffDashboard.css";

const StaffDashboard = ({ username, setAuthenticated }) => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [isNavOpen, setIsNavOpen] = useState(false); // Navigation toggle state
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <div className="staff-dashboard">
      <h1>Welcome, {username}</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {loading && <p className="loading-message">Loading...</p>}

      {/* Navigation Links */}
      <nav className={`dashboard-nav ${isNavOpen ? "open" : ""}`}>
        <button className="nav-toggle" onClick={toggleNav} aria-label="Toggle Navigation">
          ☰
        </button>
        <div className={`nav-links ${isNavOpen ? "show" : ""}`}>
          <Link to="/add-attendance" className="nav-link" onClick={toggleNav}>
            Add Attendance
          </Link>
          <Link to="/staff-attendance" className="nav-link" onClick={toggleNav}>
            View Attendance
          </Link>
          <Link to="/tasks" className="nav-link" onClick={toggleNav}>
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
                  onClick={() => {
                    setLoading(true);
                    axios
                      .put(`${API_URL}/api/tasks/${task.id}`, {
                        completed: true,
                      })
                      .then(() => {
                        setTasks(tasks.filter((t) => t.id !== task.id));
                        setErrorMessage(""); // Clear any previous error messages
                      })
                      .catch((error) => {
                        console.error("Error marking task as completed:", error);
                        setErrorMessage("Failed to mark task as completed.");
                      })
                      .finally(() => setLoading(false));
                  }}
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