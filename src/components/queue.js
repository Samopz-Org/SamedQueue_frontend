import React, { useState, useEffect } from "react";
import axios from "axios";

const Queue = () => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await axios.get("https://samedqueue-frontend.vercel.app/current-queue");
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
        <ul>
          {queue.map((patient) => (
            <li key={patient._id}>
              {patient.name} - {patient.symptoms}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Queue;
