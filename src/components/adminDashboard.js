import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../logo.svg";
import "../styling/adminDashboard.css";

const AdminDashboard = ({ username }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      navigate("/"); // Redirect to login page after sign-out
    }
  };

  useEffect(() => {
    if (!username) {
      navigate("/login"); // Redirect to login if username is not set
    }
  }, [username, navigate]);

  return (
    <div className="container">
      <header className="admin-header">
        <div>
          <img
            src={logo}
            className="admin-logo"
            alt="Samopz Clinic Logo - Click to Sign Out"
            onClick={handleSignOut}
          />
        </div>
        <button onClick={handleSignOut} className="sign-out-button">
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
              to="/requisitions"
              className="nav-link"
              onClick={handleNavClick}
              aria-label="Manage Requisitions"
            >
              Manage Requisitions
            </Link>
            <Link
              to="/staff-requisitions"
              className="nav-link"
              onClick={handleNavClick}
              aria-label="Staff Requisitions"
            >
              View Requisitions
            </Link>
            <Link
              to="/tasks"
              className="nav-link"
              onClick={handleNavClick}
              aria-label="Manage Tasks"
            >
              Manage Tasks
            </Link>
            <Link
              to="/queue"
              className="nav-link"
              onClick={handleNavClick}
              aria-label="Queue"
            >
              Queue
            </Link>
            <Link
              to="/update-patient"
              className="nav-link"
              onClick={handleNavClick}
              aria-label="Update Patient"
            >
              Update Patient
            </Link>
            <Link
              to="/register-patient"
              className="nav-link"
              onClick={handleNavClick}
              aria-label="Register Patient"
            >
              Book Appointment
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
      <main className="admin-main">
        <h2 className="admin-dashboard-title">Admin Dashboard</h2>
        <h4>Welcome, {username}!</h4>
      </main>
    </div>
  );
};

AdminDashboard.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
};

export default AdminDashboard;
