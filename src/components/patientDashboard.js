import React, {useState} from "react";
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
  
    const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
    };
  
    const handleNavClick = () => {
      setIsNavOpen(false);
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
        {/* Navigation Links */}
        <nav className="navbar">
          <div className={`nav-links ${isNavOpen ? "open" : ""}`}>
            <Link to="/queue" className="nav-link" onClick={handleNavClick}>
              Queue Size
            </Link>
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
