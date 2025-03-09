import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:3001/api/users/signup",
        "http://localhost:5000/api/auth/signup",
        // "https://samedqueue.onrender.com/api/users/signup",
        {
          username,
          email,
          password,
        }
      );
      setMessage("Registration successful. Go Ahead to 'Log in' with Your Newly 'Created Account Details'!", response);
    } catch (error) {
      console.error("Error registering user:", error.response.data);
      setError(error.response.data.message || "Registration failed");
    }
  };

  return (
    <div>
      <p>Don't have an account? Create one 👇!</p>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Full Name: </label>
          <input
            type="text"
            placeholder="Enter Full Name"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Email">Email: </label>
          <input
            type="text"
            placeholder="Enter Email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            placeholder="Enter password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;
