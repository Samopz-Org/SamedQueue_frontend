import React from "react";
import RegisterPatient from "./registerPatients";
import EstimateWaitTime from "./estimateWaitTime";
import QueueSize from "./queueSize";
import logo from "../logo.svg";

const PatientDashboard = () => {
  return (
    <div className="patdash1">
      <a className="App-link" href="/" target="_self">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </a>
      <h4>Click on the "SamedQueue-logo" to Sign-Out</h4>

      <h1 className="patdash">Patient Dashboard</h1>
      <h3>Welcome, Patient!</h3>
      <div>
        <QueueSize />
        
        <EstimateWaitTime />

        <RegisterPatient />
      </div>
      {/* Add patient-specific content here */}
    </div>
  );
};

export default PatientDashboard;
