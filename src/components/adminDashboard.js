import React from "react";
import RegisterPatient from "./registerPatients";
import Queue from "./queue";
import UpdatePatient from "./updatePatients";

const AdminDashboard = () => {
  return (
    <div>
      <div className="admdash1">
        <h2 className="admdash">Admin Dashboard</h2>
        <h3>Welcome, Admin!</h3>
        <div>
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
