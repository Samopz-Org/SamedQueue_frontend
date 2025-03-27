import React, { useEffect } from "react";
import PropTypes from "prop-types";
import StaffAttendance from "./staffAttendance";
import AddAttendance from "./addAttendance";
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
        <div>
          <img
            src={logo}
            className="admin-logo"
            alt="Samopz Clinic Logo - Click to Sign Out"
            onClick={handleSignOut}
          />
        </div>
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      </header>
      <main className="admin-main">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <h4>Welcome, Admin! {username}!</h4>
        <div className="component-group">
          <div className="component">
            <AddAttendance />
          </div>
          <div className="component">
            <StaffAttendance />
          </div>
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

AdminDashboard.propTypes = {
  username: PropTypes.string.isRequired,
  setAuthenticated: PropTypes.func.isRequired,
};

export default AdminDashboard;
