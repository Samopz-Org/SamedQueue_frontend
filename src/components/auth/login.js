import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styling/login.css";

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
      const response = await axios.post(
        // "http://localhost:5000/api/auth/login",
        "https://samedqueue-app.onrender.com/api/auth/login",

        {
          email,
          password,
        }
      );

      console.log("Login successful", response.data.user);

      // Check user role and navigate to the appropriate dashboard
      if (response.data.user.role === "admin") {
        setUserName(response.data.user.username);
        setAuthenticated(true);
        navigate("/admin-dashboard");
      } else if (response.data.user.role === "patient") {
        setUserName(response.data.user.username);
        setAuthenticated(true);
        navigate("/patient-dashboard");
      } else {
        setError("Invalid credentials.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("Error logging in:", error);
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
