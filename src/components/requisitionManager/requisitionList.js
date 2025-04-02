import React from "react";

const RequisitionList = ({
  requisitions,
  handleEditRequisition,
  handleDeleteRequisition,
}) => (
  <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ backgroundColor: "#f2f2f2" }}>
        <th>S/N</th>
        <th>Requester Name</th>
        <th>Department</th>
        <th>Amount</th>
        <th>Purpose</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {requisitions.map((req, index) => (
        <tr key={req._id}>
          <td>{index + 1}</td>
          <td>{req.username}</td>
          <td>{req.department}</td>
          <td>{req.amount}</td>
          <td>{req.purpose}</td>
          <td>{req.status}</td>
          <td>
            <button
              onClick={() => handleEditRequisition(req)}
              style={{ marginRight: "5px" }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteRequisition(req._id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RequisitionList;
