import React, { useEffect, useState } from "react";
import apiClient from "../utils/apiClient"; // Import the apiClient
import "../styling/patient.css";

const EstimateWaitTime = () => {
  const [waitTime, setWaitTime] = useState({ hours: 0, minutes: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWaitTime = async () => {
      try {
        const API_URL =
          process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await apiClient.get(
          `${API_URL}/api/queue/estimate-wait-time`
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
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <div className="spinner">{error}</div>;
  }

  return (
    <div className="estimate-wait-time">
      <h3>Estimated Wait Time</h3>
      <p>
        {waitTime.hours} hours, {waitTime.minutes} minutes
      </p>
    </div>
  );
};

export default EstimateWaitTime;
