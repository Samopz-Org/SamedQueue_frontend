import React, {useState} from "react";
import apiClient from "../utils/apiClient"; // Import the apiClient
import "../styling/patient.css";

const NextPatient = ({ queue, setQueue }) => {
    const [loading, setLoading] = useState(false);
  if (!queue || queue.length === 0) {
    return <div>No patients in the queue</div>;
  }

  const nextPatient = queue[0];

  const handleNextPatient = async () => {
    console.log("Next Patient button clicked");
    setLoading(true);
   try {
        const API_URL =
          process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await apiClient.post(
          `${API_URL}/api/queue/next-patient`,
        { id: nextPatient.id }
      );
      console.log("API response:", response);

      // Update the queue state in the parent component
      setQueue(queue.slice(1));
    } catch (error) {
      console.error("Error updating queue", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="next-patient">
      <h3>Next Patient</h3>
      <p>Name: {nextPatient.name}</p>
      <p>Age: {nextPatient.age}</p>
      <p>Condition: {nextPatient.symptoms}</p>
      <button
        className="spinner"
        onClick={handleNextPatient}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Next patient"}
      </button>
    </div>
  );
};

export default NextPatient;
