import React from "react";
import RegisterPatient from "./registerPatients";
import Queue from "./queue";
import UpdatePatient from "./updatePatients";
import logo from "../logo.svg";
import "../styling/adminDashboard.css";

const AdminDashboard = ({ userName, setAuthenticated }) => {
  const handleSignOut = () => {
    setAuthenticated(false);
    // Additional sign-out logic if needed
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <a className="App-link" href="/" onClick={handleSignOut}>
          <div>
            <img src={logo} className="App-logo" alt="Samopz Clinic Logo" />
          </div>
        </a>
        <h4>Click on the "logo" to Sign-Out</h4>
      </header>
      <main className="admin-main">
        <h2 className="dashboard-title">Doctor Dashboard</h2>
        <h3>Welcome, {userName}!</h3>
        <div className="component-group">
          <div className="component">
            <Queue />
          </div>
          <div className="component">
            <UpdatePatient />
          </div>
          <div className="component">
            <RegisterPatient />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
