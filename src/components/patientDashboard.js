import React from "react";
import RegisterPatient from "./registerPatients";

const PatientDashboard = () => {
  return (
    <div>
      <h1>Patient Dashboard</h1>
      <p>Welcome, Patient!</p>
      <div className="container">
      <div className="Register">
        <RegisterPatient />
      </div>
        {/* Add patient-specific content here */}
        </div>
    </div>
  );
};

export default PatientDashboard;
