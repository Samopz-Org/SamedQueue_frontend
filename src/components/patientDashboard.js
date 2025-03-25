import React from "react";
import PropTypes from "prop-types";
import RegisterPatient from "./registerPatients";
import EstimateWaitTime from "./estimateWaitTime";
import QueueSize from "./queueSize";
import ADHDAssessment from "./ADHDAssessmt";
import logo from "../logo.svg";
import "../styling/patientDashboard.css";

const PatientDashboard = ({ username, setAuthenticated }) => {
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      setAuthenticated(false);
      // Additional sign-out logic if needed
    }
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
            <QueueSize />
          </div>
          <div className="component">
            <EstimateWaitTime />
          </div>
          <div className="component">
            <RegisterPatient />
          </div>
          <div className="component">
            <ADHDAssessment />
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
