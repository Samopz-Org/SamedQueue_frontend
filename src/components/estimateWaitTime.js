import React, { useEffect, useState } from "react";
import axios from "axios";

const EstimateWaitTime = () => {
  const [waitTime, setWaitTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWaitTime = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/api/queue/estimate-wait-time"
          "https://samedqueue-app.onrender.com/api/queue/estimate-wait-time",
        );
        setWaitTime(response.data.waitTime);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching estimated wait time", error);
        setError("Failed to fetch estimated wait time");
        setLoading(false);
      }
    };

    fetchWaitTime();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Estimated Wait Time</h3>
      <p>{waitTime} minutes</p>
    </div>
  );
};

export default EstimateWaitTime;