import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthenticated, setUserName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        {
        email,
        password,
      });

      // Extract user data
      const { role, username } = response.data.user;
      setUserName(username);
      setAuthenticated(true);

      // Navigate based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "patient") {
        navigate("/patient-dashboard");
      } else if (role === "staff") {
        navigate("/staff-dashboard");
      } else {
        setError("Invalid user role.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          (error.request
            ? "Network error. Please try again."
            : "An unexpected error occurred.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Log In</h2>
      <p>Already have an account? Log in 👇!</p>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
      {error && (
        <p className="error-message" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};

export default Login;
