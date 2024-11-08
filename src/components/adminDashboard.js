import React from "react";
import RegisterPatient from "./registerPatients";
import Queue from "./queue";
import UpdatePatient from "./updatePatients";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin!</p>
      <div className="container">
        <div className="Register">
          <RegisterPatient />
        </div>
        <div className="Queue">
          <Queue />
        </div>
        <div className="Update">
          <UpdatePatient />
        </div>
      </div>
      {/* Add admin-specific content here */}
    </div>
  );
};

export default AdminDashboard;
