import React from "react";
import RegisterPatient from "./registerPatients";

const PatientDashboard = () => {
  return (
    <div className="patdash1">
      <h1 className="patdash">Patient Dashboard</h1>
      <h3>Welcome, Patient!</h3>
      <div>
        <RegisterPatient />
      </div>
      {/* Add patient-specific content here */}
    </div>
  );
};

export default PatientDashboard;
