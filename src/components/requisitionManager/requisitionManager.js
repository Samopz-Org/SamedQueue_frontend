import React, { useState, useEffect } from "react";
import apiClient from "../../utils/apiClient"; // Import the apiClient
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequisitionForm from "../requisitionManager/requisitionForm";
import RequisitionList from "../requisitionManager/requisitionList";

const RequisitionManager = ({ API_URL }) => {
  const [requisitions, setRequisitions] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    department: "",
    amount: "",
    purpose: "",
    status: "Pending",
  });
  const [editingRequisition, setEditingRequisition] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch requisitions from the backend
  useEffect(() => {
    const fetchRequisitions = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`${API_URL}/api/requisitions`);
        setRequisitions(response.data);
      } catch (err) {
        toast.error("Failed to fetch requisitions.");
        console.error("Error fetching requisitions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequisitions();
  }, [API_URL]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      username: "",
      department: "",
      amount: "",
      purpose: "",
      status: "Pending",
    });
    setEditingRequisition(null);
  };

  // Validate form inputs
  const validateForm = () => {
    if (
      !formData.username ||
      !formData.department ||
      !formData.amount ||
      !formData.purpose
    ) {
      toast.error("All fields are required.");
      return false;
    }
    return true;
  };

  // Create a new requisition
  const handleCreateRequisition = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await apiClient.post(
        `${API_URL}/api/requisitions`,
        formData
      );
      setRequisitions([...requisitions, response.data]);
      resetForm();
      toast.success("Requisition created successfully!");
    } catch (err) {
      toast.error("Failed to create requisition.");
      console.error("Error creating requisition:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing requisition
  const handleUpdateRequisition = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await apiClient.put(
        `${API_URL}/api/requisitions/${editingRequisition._id}`,
        formData
      );
      setRequisitions(
        requisitions.map((req) =>
          req._id === editingRequisition._id ? response.data : req
        )
      );
      resetForm();
      toast.success("Requisition updated successfully!");
    } catch (err) {
      toast.error("Failed to update requisition.");
      console.error("Error updating requisition:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a requisition
  const handleDeleteRequisition = async (id) => {
    if (!window.confirm("Are you sure you want to delete this requisition?")) {
      return;
    }

    setLoading(true);
    try {
      await apiClient.delete(`${API_URL}/api/requisitions/${id}`);
      setRequisitions(requisitions.filter((req) => req._id !== id));
      toast.success("Requisition deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete requisition.");
      console.error("Error deleting requisition:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    resetForm();
  };

  return (
    <div className="container">
      <h1>Account Requisition Manager</h1>

      {loading && <div className="spinner"></div>}

      {/* Requisition Form */}
      <RequisitionForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={
          editingRequisition ? handleUpdateRequisition : handleCreateRequisition
        }
        handleCancelEdit={handleCancelEdit}
        editingRequisition={editingRequisition}
      />

      {/* Requisitions Table */}
      <RequisitionList
        requisitions={requisitions}
        handleEditRequisition={(req) => {
          setEditingRequisition(req);
          setFormData(req);
        }}
        handleDeleteRequisition={handleDeleteRequisition}
      />
    </div>
  );
};

export default RequisitionManager;
