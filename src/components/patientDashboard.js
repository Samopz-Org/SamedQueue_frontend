import React from "react";
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
        <a
          className="App-link"
          href="/"
          onClick={handleSignOut}
          aria-label="Sign out"
        >
          <div>
            <img src={logo} className="App-logo" alt="Samopz Clinic Logo" />
          </div>
        </a>
        <h4>Click on the "logo" to Sign-Out</h4>
      </header>
      <main className="patient-main">
        <h1 className="dashboard-title">Patient Dashboard</h1>
        <h3>Welcome, {username}!</h3>
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

export default PatientDashboard;
