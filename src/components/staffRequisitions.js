import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import apiClient from "../utils/apiClient"; // Import the apiClient
import "../styling/staffDashboard.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const StaffRequisitions = ({ username }) => {
  const [requisitions, setRequisitions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    apiClient
      .get(`${API_URL}/api/requisitions/user/${username}`)
      .then((response) => {
        // Sort requisitions: pending ones first
        const sortedRequisitions = response.data.sort((a, b) =>
          a.status === "pending" && b.status !== "pending" ? -1 : 1
        );
        setRequisitions(sortedRequisitions);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error fetching requisitions:", error);
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch requisitions. Please try again."
        );
      })
      .finally(() => setLoading(false));
  }, [username]);

  return (
    <div className="requisitions-container">
      <h2>Your Requisitions</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {loading && <div className="spinner"></div>}
      {requisitions.length === 0 ? (
        <p>No requisitions found.</p>
      ) : (
        <table
          border="1"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th>S/N</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {requisitions.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>{req.title}</td>
                <td>{req.description}</td>
                <td>{req.status}</td>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

StaffRequisitions.propTypes = {
  username: PropTypes.string.isRequired,
};

export default StaffRequisitions;