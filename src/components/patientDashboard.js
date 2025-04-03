import React, { useEffect, useState } from "react";
import apiClient from "../utils/apiClient"; // Import the apiClient
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "../styling/patient.css";

const PatientDashboard = ({ username, setAuthenticated }) => {
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      setAuthenticated(false);
      // Additional sign-out logic if needed
    }
  };

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [waitTime, setWaitTime] = useState({ hours: 0, minutes: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  useEffect(() => {
    const fetchWaitTime = async () => {
      try {
        const API_URL =
          process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await apiClient.get(
          `${API_URL}/api/queue/estimate-wait-time`
        );
        setWaitTime(response.data.waitTime);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching estimated wait time", error);
        setError("Failed to fetch estimated wait time");
        setLoading(false);
      }
    };

    fetchWaitTime();
  }, []); // Dependency array is intentionally empty to fetch data on mount.

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div className="spinner">{error}</div>;
  }

  return (
    <div className="container">
      <header className="patient-header">
        <div>
          <img
            src={logo}
            className="patient-logo"
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
              to="/register-patient"
              className="nav-link"
              onClick={handleNavClick}
            >
              Book Appointment
            </Link>
            <Link
              to="/adhd-assessment"
              className="nav-link"
              onClick={handleNavClick}
            >
              ADHD Assessment
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
        <main className="patient-main">
          <h2 className="patient-dashboard-title">Patient Dashboard</h2>
          <h4>Welcome, {username}!</h4>
          <div className="estimate-wait-time">
            <h3>Estimated Wait Time</h3>
            <p>
              {waitTime.hours} hours, {waitTime.minutes} minutes
            </p>
          </div>
        </main>
      </header>
    </div>
  );
};

PatientDashboard.propTypes = {
  username: PropTypes.string.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
};

export default PatientDashboard;
