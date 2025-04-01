import React, { useState, useEffect } from "react";
import axios from "axios";

const RequisitionManager = ({ API_URL }) => {
  const [requisitions, setRequisitions] = useState([]);
  const [formData, setFormData] = useState({
    requesterName: "",
    department: "",
    amount: "",
    purpose: "",
    status: "Pending",
  });
  const [editingRequisition, setEditingRequisition] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Fetch requisitions from the backend
  useEffect(() => {
    const fetchRequisitions = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${API_URL}/api/requisitions`);
        setRequisitions(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch requisitions.");
        console.error("Error fetching requisitions:", err);
      }
    };
    fetchRequisitions();
  }, [API_URL]);

  // Reset success and error messages after a timeout
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create a new requisition
  const handleCreateRequisition = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate form inputs
    if (
      !formData.requesterName ||
      !formData.department ||
      !formData.amount ||
      !formData.purpose
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/requisitions`,
        formData
      );
      setRequisitions([...requisitions, response.data]);
      setFormData({
        requesterName: "",
        department: "",
        amount: "",
        purpose: "",
        status: "Pending",
      });
      setLoading(false);
      setSuccess("Requisition created successfully!");
    } catch (err) {
      setLoading(false);
      setError("Failed to create requisition.");
    }
  };

  // Update an existing requisition
  const handleUpdateRequisition = async (id) => {
    setLoading(true);
    setError("");

    // Validate form inputs
    if (
      !formData.requesterName ||
      !formData.department ||
      !formData.amount ||
      !formData.purpose
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/requisitions/${id}`,
        formData
      );
      setRequisitions(
        requisitions.map((req) => (req._id === id ? response.data : req))
      );
      setEditingRequisition(null);
      setFormData({
        requesterName: "",
        department: "",
        amount: "",
        purpose: "",
        status: "Pending",
      });
      setLoading(false);
      setSuccess("Requisition updated successfully!");
    } catch (err) {
      setLoading(false);
      setError("Failed to update requisition.");
    }
  };

  // Delete a requisition
  const handleDeleteRequisition = async (id) => {
    setLoading(true);
    setError("");

    // Confirm deletion
    if (!window.confirm("Are you sure you want to delete this requisition?")) {
      setLoading(false);
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/requisitions/${id}`);
      setRequisitions(requisitions.filter((req) => req._id !== id));
      setSuccess("Requisition deleted successfully!");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to delete requisition.");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingRequisition(null);
    setFormData({
      requesterName: "",
      department: "",
      amount: "",
      purpose: "",
      status: "Pending",
    });
  };

  return (
    <div>
      <h1>Account Requisition Manager</h1>

      {loading && <p>Loading...</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Requisition Form */}
      <form
        onSubmit={
          editingRequisition
            ? () => handleUpdateRequisition(editingRequisition._id)
            : handleCreateRequisition
        }
      >
        <input
          type="text"
          name="requesterName"
          placeholder="Requester Name"
          value={formData.requesterName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="purpose"
          placeholder="Purpose"
          value={formData.purpose}
          onChange={handleInputChange}
          required
        />

        <button type="submit">
          {editingRequisition ? "Update Requisition" : "Create Requisition"}
        </button>
        {editingRequisition && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>

      {/* Requisitions Table */}
      <table border="1">
        <thead>
          <tr>
            <th>Requester Name</th>
            <th>Department</th>
            <th>Amount</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requisitions.map((req) => (
            <tr key={req._id}>
              <td>{req.requesterName}</td>
              <td>{req.department}</td>
              <td>{req.amount}</td>
              <td>{req.purpose}</td>
              <td>{req.status}</td>
              <td>
                <button
                  onClick={() => {
                    setEditingRequisition(req);
                    setFormData(req);
                  }}
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    marginRight: "5px",
                  }}
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
      <select
        name="status"
        value={formData.status}
        onChange={handleInputChange}
        required
        style={{
          backgroundColor: "blue",
          color: "white",
          marginLeft: "10px",
        }}
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
};

export default RequisitionManager;
