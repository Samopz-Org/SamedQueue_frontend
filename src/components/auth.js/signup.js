import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:3001/api/users/signup",
        "https://samedqueue.onrender.com/api/users/signup",
        {
          username,
          password,
        }
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error registering user:", error.response.data);
      setError(error.response.data.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;