import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "../styling/patient.css";

const PatientDashboard = ({ username }) => {
  const navigate = useNavigate();
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

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      navigate("/"); // Redirect to login page after sign-out
    }
  };

  useEffect(() => {
    if (!username) return;
    setLoading(true);

    const fetchWaitTime = async () => {
      try {
        const API_URL =
          process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await axios.get(
          `${API_URL}/api/queue/estimate-wait-time`
        );
        setWaitTime(response.data.waitTime);
      } catch (error) {
        console.error("Error fetching estimated wait time", error);
        setError("Failed to fetch estimated wait time. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWaitTime();
  }, [username]);

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
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
  setUsername: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
};

export default PatientDashboard;
