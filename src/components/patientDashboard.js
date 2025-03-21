import React from "react";
import RegisterPatient from "./registerPatients";
import EstimateWaitTime from "./estimateWaitTime";
import QueueSize from "./queueSize";
import ADHDAssessment from "./ADHDAssessmt";
import logo from "../logo.svg";
import "../patientDashboard.css";

const PatientDashboard = () => {
  return (
    <div className="patient-dashboard">
      <header className="patient-header">
        <a className="App-link" href="/" target="_self">
          <div>
            <img src={logo} className="App-logo" alt="Samopz Clinic Logo" />
          </div>
        </a>
        <h4>Click on the "logo" to Sign-Out</h4>
      </header>
      <main>
        <h1 className="dashboard-title">Patient Dashboard</h1>
        <h3>Welcome, Patient!</h3>
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
