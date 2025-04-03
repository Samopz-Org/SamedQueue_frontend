import React, { useState } from "react";
import apiClient from "../utils/apiClient";
import "../styling/patient.css";

const UpdatePatient = () => {
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await apiClient.put(`${API_URL}/api/patients/:${email}`, {
        symptoms,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error updating patient: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-patient">
      <h3>Update Patient Symptoms</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Symptoms: </label>
          <input
            type="text"
            placeholder="Enter New Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>
        <button className="spinner" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdatePatient;
