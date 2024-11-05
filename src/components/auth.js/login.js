// FILE: Login.js
import React, { useState } from "react";
import axios from "axios";

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:3001/api/users/login",
        "https://samedqueue.onrender.com/api/users/login",

        {
          username,
          password,
        }
      );
      if (response.data.success) {
        setAuthenticated(true);
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Error logging in");
      console.error("Error logging in", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
