// FILE: src/components/QueueSize.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const QueueSize = () => {
  const [queueSize, setQueueSize] = useState(0);

  useEffect(() => {
    const fetchQueueSize = async () => {
      try {
          const response = await axios.get(
            //   "http://localhost:3001/queue-size"
              "https://samedqueue.onrender.com/queue-size"
          );
        setQueueSize(response.data.size);
      } catch (error) {
        console.error("Error fetching queue size", error);
      }
    };

    fetchQueueSize();
  }, []);

  return (
    <div>
      <h3>Queue Size</h3>
      <p>{queueSize} patients in the queue</p>
    </div>
  );
};

export default QueueSize;
