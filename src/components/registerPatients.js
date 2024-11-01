import React, { useState } from "react";
import axios from "axios";

const RegisterPatient = () => {
  const [name, setName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", {
        name,
        symptoms,
      });
      setMessage(response.data.result); // Extract the result property
    } catch (error) {
      console.error(
        "Error registering patient:",
        error.response || error.message
      );
      setMessage("Error registering patient");
    }
  };

  return (
    <div>
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Symptoms: </label>
          <input
            type="text"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPatient;
