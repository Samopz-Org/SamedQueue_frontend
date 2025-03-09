import React from "react";
import axios from "axios";

const NextPatient = ({ queue, setQueue }) => {
  if (!queue || queue.length === 0) {
    return <div>No patients in the queue</div>;
  }

  const nextPatient = queue[0];

  const handleNextPatient = async () => {
    console.log("Next Patient button clicked");
    try {
      // Make an API call to remove the current patient from the queue
      const response = await axios.post(
        "http://localhost:5000/api/queue/next-patient",
        { id: nextPatient.id }
      );
      console.log("API response:", response);

      // Update the queue state in the parent component
      setQueue(queue.slice(1));
    } catch (error) {
      console.error("Error updating queue", error);
    }
  };

  return (
    <div>
      <h2>Next Patient</h2>
      <p>Name: {nextPatient.name}</p>
      <p>Age: {nextPatient.age}</p>
      <p>Condition: {nextPatient.symptoms}</p>
      <button onClick={handleNextPatient}>Next Patient</button>
    </div>
  );
};

export default NextPatient;
