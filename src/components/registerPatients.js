import React, { useState } from "react";
import axios from "axios";

const RegisterPatient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:3001/register",
        "https://samedqueue.onrender.com/register",
        {
          name,
          email,
          symptoms,
          age,
        }
      );
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
    <div className="Register">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name: </label>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Symptoms: </label>
          <input
            type="text"
            placeholder="Enter Symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age: </label>
          <input
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      <div className="ADHDCheck">You Think You Might Have Attention Deficit Hyperactivity Disorder?</div>
      <div className="ADHDCheck">See Symptoms Checklist for Adult ADHD Below!</div>
    </div>
  );
};

export default RegisterPatient;
