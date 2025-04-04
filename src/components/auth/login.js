import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setUsername, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setEmailError(true);
      setLoading(false);
      return;
    } else {
      setEmailError(false);
    }

    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters long.");
      setPasswordError(true);
      setLoading(false);
      return;
    } else {
      setPasswordError(false);
    }

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      console.log("Response Data:", response.data); // Debugging response

      // Extract user data
      const { user } = response.data;
      if (!user || !user.role || !user.username) {
        setError("Invalid response from server.");
        setLoading(false);
        return;
      }

      const { role, username } = user;

      // Debugging props
      console.log("setUsername:", setUsername);
      console.log("setRole:", setRole);
      console.log("navigate:", navigate);

      // Update App state
      setUsername(username);
      console.log("Username set:", username);
      setRole(role);
      console.log("Role set:", role);

      // Navigate based on role
      if (role === "admin") {
        console.log("Navigating to admin dashboard");
        navigate("/admin-dashboard");
      } else if (role === "patient") {
        console.log("Navigating to patient dashboard");
        navigate("/patient-dashboard");
      } else if (role === "staff") {
        console.log("Navigating to staff dashboard");
        navigate("/staff-dashboard");
      } else {
        setError("Invalid user role.");
      }
    } catch (error) {
      console.error("Login error:", error); // Log error details
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
            className={emailError ? "input-error" : ""}
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
            className={passwordError ? "input-error" : ""}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
      {error && (
        <p className="error-message" aria-live="assertive">
          {error}
        </p>
      )}
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign up here
        </Link>
        .
      </p>
    </div>
  );
};

export default Login;