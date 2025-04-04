import React, { useState, useEffect } from "react";
import axios from "axios";
import NextPatient from "./next-patient";
import QueueSize from "./queueSize";
import EstimateWaitTime from "./estimateWaitTime";
import "../styling/patient.css";

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const API_URL =
          process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await axios.get(
          `${API_URL}/api/queue/current-queue`
        );
        setQueue(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching queue", error);
        setError("Failed to fetch queue");
        setLoading(false);
      }
    };

    fetchQueue();
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div className="spinner">{error}</div>;
  }

  return (
    <div className="queue">
      <div>
        <QueueSize />
        <EstimateWaitTime />
        <NextPatient queue={queue} setQueue={setQueue} />
      </div>
      <div className="queue-box">
        <h3 className="Current_Queue">Current Queue</h3>
        <ol>
          {queue.map((patient) => (
            <li key={patient._id}>
              {patient.name} - {patient.age + "yrs"} - {patient.symptoms}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Queue;
