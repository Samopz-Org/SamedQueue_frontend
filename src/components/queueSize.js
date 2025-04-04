import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styling/patient.css";

const QueueSize = () => {
  const [queueSize, setQueueSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueueSize = async () => {
     try {
       const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
       const response = await axios.get(
         `${API_URL}/api/queue/queue-size`
       );
       setQueueSize(response.data.queueSize);
       setLoading(false);
     } catch (error) {
       console.error("Error fetching queue size", error);
       setError("Failed to fetch queue size");
       setLoading(false);
     }
    };

    fetchQueueSize();
  }, []);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div className="spinner">{error}</div>;
  }

  return (
    <div className="queue-size">
      <h3>Queue Size</h3>
      <p>{queueSize} patients in the queue</p>
    </div>
  );
};

export default QueueSize;
