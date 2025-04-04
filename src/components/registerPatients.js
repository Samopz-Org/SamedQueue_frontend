import React, { useState } from "react";
import axios from "axios";
import "../styling/patient.css";

const RegisterPatient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (age <= 0) {
      setMessage("Age must be a positive number");
      return;
    }
    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await axios.post(`${API_URL}/api/patients`, {
        name,
        email,
        age,
        symptoms,
      });
      setMessage(response.data.message); // Extract the result property
    } catch (error) {
      console.error(
        "Error registering patient:",
        error.response || error.message
      );
      setMessage(error.response?.data?.message || "Error registering patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <h3>Book Appointment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name: </label>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age: </label>
          <input
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="symptoms">Symptoms: </label>
          <input
            type="text"
            placeholder="Enter Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPatient;
