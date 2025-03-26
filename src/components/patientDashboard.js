import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const PatientDashboard = ({ username, setAuthenticated }) => {
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      setAuthenticated(false);
      // Additional sign-out logic if needed
    }
  };

  const toggleNav = () => {
    // Logic to toggle navigation (if applicable)
    console.log("Navigation toggled");
  };

  return (
    <div className="patient-dashboard">
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
      </header>
      <main className="patient-main">
        <h1 className="dashboard-title">Patient Dashboard</h1>
        <h4>Welcome, {username}!</h4>
        <div className="component-group">
          <div className="component">
            <Link to="/queue" className="nav-link" onClick={toggleNav}>
              Queue Size
            </Link>
          </div>
          <div className="component">
            <Link
              to="/estimate-wait-time"
              className="nav-link"
              onClick={toggleNav}
            >
              Estimate Wait Time
            </Link>
          </div>
          <div className="component">
            <Link
              to="/register-patient"
              className="nav-link"
              onClick={toggleNav}
            >
              Register Patient
            </Link>
          </div>
          <div className="component">
            <Link
              to="/adhd-assessment"
              className="nav-link"
              onClick={toggleNav}
            >
              ADHD Assessment
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

PatientDashboard.propTypes = {
  username: PropTypes.string.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
};

export default PatientDashboard;
