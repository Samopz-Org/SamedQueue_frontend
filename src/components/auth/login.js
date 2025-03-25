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

    try {
      const response = await axios.post(
        // "http://localhost:5000/api/auth/login",
        "https://samedqueue-app.onrender.com/api/auth/login",

        {
          email,
          password,
        }
      );
      console.log("Login successfully", response.data.user);

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
        setError("Invalid credentials");
      }
    } catch (error) {
      setError(
        "Error logging in: " + (error.response?.data?.message || error.message)
      );
      console.error("Error logging in", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <p>Already have an account? Log in 👇!</p>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            placeholder="Enter Email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
      {error && (
        <p style={{ color: "red" }} aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};

export default Login;
