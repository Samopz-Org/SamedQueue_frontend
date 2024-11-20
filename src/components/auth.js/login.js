import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      console.log("Login successfully", response.data.user);

      // Check user role and navigate to the appropriate dashboard
      if (response.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (response.data.user.role === "patient") {
        navigate("/patient-dashboard");
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
      <p>Already have an account? Log in 👇!</p>
      <form onSubmit={handleLogin}>
        <div>
          <label for="username" >Username: </label>
          <input
            type="text"
            placeholder="Samed Queue" 
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label for="password" >Password: </label>
          <input
            type="password"
            placeholder="Enter Password" 
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
