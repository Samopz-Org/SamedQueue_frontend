import React, { useState } from "react";
import axios from "axios";

const UpdatePatient = () => {
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        // `http://localhost:5000/api/patients/${email}`,
        `https://samedqueue-app.onrender.com/api/patients/:${email}`,
        { symptoms }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage("Error updating patient: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Update-Patient">
      <h2>Update Patient Symptoms</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdatePatient;
