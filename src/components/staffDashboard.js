import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import apiClient from "../utils/apiClient"; // Import the apiClient
import logo from "../logo.svg";
import "../styling/staffDashboard.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const StaffDashboard = ({ username, setAuthenticated }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    apiClient
      .get(`${API_URL}/api/tasks/user/${username}`, {
        params: { username },
      })
      .then((response) => {
        // Sort tasks: pending ones first
        const sortedTasks = response.data.sort((a, b) =>
          a.status === "pending" && b.status !== "pending" ? -1 : 1
        );
        setTasks(sortedTasks);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch tasks. Please try again."
        );
      })
      .finally(() => setLoading(false));
  }, [username]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setAuthenticated(false);
    }
  };

  const updateTask = async (id, updates) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await apiClient.put(`${API_URL}/api/tasks/${id}`, updates);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setErrorMessage("Error updating task: " + error.message);
      console.error("Error updating task:", error.message);
      throw error;
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
    <div className="container">
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
              to="/staffRequisition-form"
              className="nav-link"
              onClick={handleNavClick}
              aria-label="Staff Requisition Form"
            >
              Add Requisition
            </Link>
            <Link
              to="/staff-requisitions"
              className="nav-link"
              onClick={handleNavClick}
              aria-label="Staff Requisitions"
            >
              View Requisitions
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
      {loading && <div className="spinner"></div>}
      <section className="tasks-section">
        <h2>Your Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks assigned.</p>
        ) : (
          <table
            border="1"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th>S/N</th>
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
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>
                    {task.status !== "completed" && (
                      <button
                        onClick={() => handleUpdateTask(task._id)}
                        disabled={loading}
                      >
                        Mark as Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

StaffDashboard.propTypes = {
  username: PropTypes.string,
  setAuthenticated: PropTypes.func.isRequired,
};

export default StaffDashboard;
