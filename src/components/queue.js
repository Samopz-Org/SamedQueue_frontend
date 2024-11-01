import React, { useState, useEffect } from "react";
import axios from "axios";

const Queue = () => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:3001/current-queue"
          "https://samedqueue.onrender.com/current-queue"
        );
        setQueue(response.data);
      } catch (error) {
        console.error("Error fetching queue", error);
      }
    };

    fetchQueue();
  }, []);

  return (
    <div className="Queue">
      <h2 className="Current_Queue">Current Queue</h2>
      <div class="queue-box">
        <ol>
          {queue.map((patient) => (
            <li key={patient._id}>
              {patient.name} - {patient.symptoms}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Queue;
