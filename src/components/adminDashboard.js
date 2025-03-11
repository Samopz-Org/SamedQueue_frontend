import React from "react";
import RegisterPatient from "./registerPatients";
import Queue from "./queue";
import UpdatePatient from "./updatePatients";
import logo from "../logo.svg";

const AdminDashboard = () => {
  return (
    <div>
      <div className="admdash1">
        <a className="App-link" href="/" target="_self">
          <div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </a>
        <h4>Click on the "logo" to Sign-Out</h4>

        <h2 className="admdash">Doctor Dashboard</h2>
        <h3>Welcome, Doctor!</h3>
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
      </div>
      {/* Add admin-specific content here */}
    </div>
  );
};

export default AdminDashboard;
