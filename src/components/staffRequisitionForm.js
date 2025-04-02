import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequisitionForm from "./requisitionManager/requisitionForm";

const StaffRequisitionForm = ({ API_URL }) => {
  const [formData, setFormData] = useState({
    username: "",
    department: "",
    amount: "",
    purpose: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(false);

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
      await axios.post(`${API_URL}/api/requisitions`, formData);
      resetForm();
      toast.success("Requisition created successfully!");
    } catch (err) {
      toast.error("Failed to create requisition.");
      console.error("Error creating requisition:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Request Funds</h1>

      {loading && <div className="spinner"></div>}

      {/* Requisition Form */}
      <RequisitionForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleCreateRequisition}
      />
    </div>
  );
};

export default StaffRequisitionForm;
