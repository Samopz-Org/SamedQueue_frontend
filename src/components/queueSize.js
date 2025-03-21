import React, { useEffect, useState } from "react";
import axios from "axios";

const QueueSize = () => {
  const [queueSize, setQueueSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueueSize = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/api/queue/queue-size"
          "https://samedqueue-app.onrender.com/api/queue/queue-size",
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Queue Size</h3>
      <p>{queueSize} patients in the queue</p>
    </div>
  );
};

export default QueueSize;
