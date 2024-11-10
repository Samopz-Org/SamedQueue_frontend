// FILE: src/components/EstimateWaitTime.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const EstimateWaitTime = () => {
  const [waitTime, setWaitTime] = useState(0);

  useEffect(() => {
    const fetchWaitTime = async () => {
      try {
        const response = await axios.get(
            // "http://localhost:3001/estimated-wait-time"
            "https://samedqueue.onrender.com/estimated-wait-time"
        );
        setWaitTime(response.data.waitTime);
      } catch (error) {
        console.error("Error fetching estimated wait time", error);
      }
    };

    fetchWaitTime();
  }, []);

  return (
    <div>
      <h3>Estimated Wait Time</h3>
      <p>{waitTime} minutes</p>
    </div>
  );
};

export default EstimateWaitTime;
