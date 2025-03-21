import React, { useState } from "react";
import axios from "axios";

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
      const response = await axios.post(
        // "http://localhost:5000/api/patients",
        "https://samedqueue-app.onrender.com/api/patients",
        {
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
    <div className="Register">
      <h2>Book Appointment</h2>
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
      <div className="ADHDCheck">
        You Think You Might Have Attention Deficit Hyperactivity Disorder?
      </div>
      <div className="ADHDCheck">
        See Symptoms Checklist for Adult ADHD Below!
      </div>
    </div>
  );
};

export default RegisterPatient;
