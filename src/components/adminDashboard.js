import React, { useEffect } from "react";
import RegisterPatient from "./registerPatients";
import Queue from "./queue";
import UpdatePatient from "./updatePatients";
import logo from "../logo.svg";
import "../styling/adminDashboard.css";

const AdminDashboard = ({ username, setAuthenticated }) => {
  useEffect(() => {
    console.log("AdminDashboard username:", username);
  }, [username]);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      setAuthenticated(false);
      // Additional sign-out logic if needed
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
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
      <main className="admin-main">
        <h2 className="dashboard-title">Doctor Dashboard</h2>
        <h4>Welcome, Doctor {username}!</h4>
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
