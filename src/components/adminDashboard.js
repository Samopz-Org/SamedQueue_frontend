import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../logo.svg";
import "../styling/adminDashboard.css";

const AdminDashboard = ({ username, setAuthenticated }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavClick = () => {
    setIsNavOpen(false);
  };
  useEffect(() => {
    console.log("AdminDashboard username:", username);
  }, [username]);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      setAuthenticated(false);
      // Additional sign-out logic if needed
    }
  };

  return (
    <div className="admin-dashboard">
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
              aria-label="Staff Attendance"
            >
              Staff Attendance
            </Link>
          </div>
          <button
            className="nav-toggle"
            onClick={toggleNav}
            aria-label="Toggle Navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </nav>
      </header>
      <main className="admin-main">
        <h2 className="admin-dashboard-title">Admin Dashboard</h2>
        <h4>Welcome, Admin! {username}!</h4>
      </main>
    </div>
  );
};

AdminDashboard.propTypes = {
  username: PropTypes.string.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
};

export default AdminDashboard;
