import React, { useState, useEffect } from "react";
import axios from "axios";

const Queue = () => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await axios.get("http://localhost:3000/current-queue");
        setQueue(response.data);
      } catch (error) {
        console.error("Error fetching queue", error);
      }
    };

    fetchQueue();
  }, []);

  return (
    <div>
      <h2>Current Queue</h2>
      <ul>
        {queue.map((patient) => (
          <li key={patient._id}>
            {patient.name} - {patient.symptoms}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Queue;
