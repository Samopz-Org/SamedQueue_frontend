import React, { useState } from "react";
import axios from "axios";

const UpdatePatient = () => {
  const [patientId, setPatientId] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        // `http://localhost:3001/update-symptoms/${patientId}`,
        `https://samedqueue.onrender.com/update-symptoms/${patientId}`,
        { symptoms }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage("Error updating patient");
    }
  };

  return (
    <div className="Update-Patient">
      <h2>Update Patient Symptoms</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient ID: </label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Symptoms: </label>
          <input
            type="text"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdatePatient;
