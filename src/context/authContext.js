import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Home from "./components/landingpage/homePage";
import StaffAttendance from "./components/staffAttendance";
import AddAttendance from "./components/addAttendance";
import RegisterPatient from "./components/registerPatients";
import Queue from "./components/queue";
import UpdatePatient from "./components/updatePatients";
import AdminDashboard from "./components/adminDashboard";
import StaffDashboard from "./components/staffDashboard";
import StaffRequisitionForm from "./components/staffRequisitionForm";
import StaffRequisitions from "./components/staffRequisitions";
import PatientDashboard from "./components/patientDashboard";
import TaskManager from "./components/taskManager/taskManager";
import RequisitionManager from "./components/requisitionManager/requisitionManager";
import ADHDAssessment from "./components/ADHDAssessmt";
import ADHDResults from "./components/ADHDResults";
import PrivacyPolicy from "./components/ptc/privacypolicy";
import TermsOfService from "./components/ptc/terms";
import ContactUs from "./components/ptc/contactUs";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const NotFound = () => (
  <div className="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="btn">
      Go Back to Home
    </Link>
  </div>
);

const ProtectedRoute = ({ element, authenticated, allowedRoles }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decoded.exp < currentTime) {
      localStorage.removeItem("authToken"); // Remove expired token
      return <Navigate to="/login" />;
    }

    // Check if the user's role is allowed
    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      return <Navigate to="/" />; // Redirect to home if role is not allowed
    }
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("authToken");
    return <Navigate to="/login" />;
  }

  return authenticated ? element : <Navigate to="/login" />;
};

function App() {
  const [username, setUserName] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decoded.exp > currentTime) {
          setAuthenticated(true);
          setUserName(decoded.username); // Assuming the token contains the username
        } else {
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false); // Set loading to false after the check
  }, []);

  if (loading) {
    // Show a loading spinner or placeholder while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              authenticated ? (
                <Login
                  setAuthenticated={setAuthenticated}
                  setUserName={setUserName}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["admin"]}
                element={
                  <AdminDashboard
                    username={username}
                    setAuthenticated={setAuthenticated}
                  />
                }
              />
            }
          />

          {/* Staff Routes */}
          <Route
            path="/staff-dashboard"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["staff"]}
                element={
                  <StaffDashboard
                    username={username}
                    setAuthenticated={setAuthenticated}
                  />
                }
              />
            }
          />
          <Route
            path="/requisitions"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["staff"]}
                element={<RequisitionManager API_URL={API_URL} />}
              />
            }
          />
          <Route
            path="/staffRequisition-form"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["staff"]}
                element={<StaffRequisitionForm API_URL={API_URL} />}
              />
            }
          />
          <Route
            path="/staff-requisitions"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["staff"]}
                element={<StaffRequisitions username={username} />}
              />
            }
          />
          <Route
            path="/staff-attendance"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["staff"]}
                element={<StaffAttendance />}
              />
            }
          />
          <Route
            path="/add-attendance"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["staff"]}
                element={<AddAttendance API_URL={API_URL} />}
              />
            }
          />

          {/* Patient Routes */}
          <Route
            path="/patient-dashboard"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["patient"]}
                element={
                  <PatientDashboard
                    username={username}
                    setAuthenticated={setAuthenticated}
                  />
                }
              />
            }
          />
          <Route
            path="/register-patient"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["patient"]}
                element={<RegisterPatient />}
              />
            }
          />
          <Route
            path="/queue"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["patient"]}
                element={<Queue />}
              />
            }
          />
          <Route
            path="/update-patient"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["patient"]}
                element={<UpdatePatient />}
              />
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["patient"]}
                element={<TaskManager API_URL={API_URL} />}
              />
            }
          />
          <Route
            path="/adhd-assessment"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["patient"]}
                element={<ADHDAssessment />}
              />
            }
          />
          <Route
            path="/adhd-results"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                allowedRoles={["patient"]}
                element={<ADHDResults />}
              />
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

// export default App;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../utils/apiClient"; // Import the apiClient

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
      const response = await apiClient.post("/api/auth/login", {
        email,
        password,
      });

      // Extract token and user data
      const { token, user } = response.data;
      const { role, username } = user;

      // Store token in localStorage
      localStorage.setItem("authToken", token);

      // Set user state
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

// export default Login;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import "../../styling/home.css";

const Home = ({ authenticated }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  return (
    <div>
      <div className="img-container">
        {/* Navigation */}
        <nav className="navbar">
          <div className={`nav-links ${isNavOpen ? "open" : ""}`}>
            <Link to="/" className="nav-link" onClick={handleNavClick}>
              Home
            </Link>
            {!authenticated ? (
              <>
                <Link
                  to="/signup"
                  className="nav-link"
                  onClick={handleNavClick}
                >
                  Signup
                </Link>
                <Link to="/login" className="nav-link" onClick={handleNavClick}>
                  Login
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="nav-link"
                onClick={handleNavClick}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/contact-us"
              className="nav-link"
              onClick={handleNavClick}
            >
              Contact Us
            </Link>
          </div>
          <div
            className="nav-toggle"
            onClick={toggleNav}
            aria-label="Toggle Navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="hero-section">
          <div className="hero-content">
            <img
              src={logo}
              className="hero-logo"
              alt="Samopz Clinic Logo - Your Health, Our Priority"
            />
            <h1>Samopz' Clinic</h1>
            <p>Your Health, Our Priority. Book Your Appointment Today!</p>
            <a href="/signup" className="cta-button">
              Get Started
            </a>
          </div>
        </header>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature">
            <i className="fas fa-user-md feature-icon"></i>
            <h3>Expert Doctors</h3>
            <p>
              Our team of highly trained professionals is here to serve you.
            </p>
          </div>
          <div className="feature">
            <i className="fas fa-heartbeat feature-icon"></i>
            <h3>Comprehensive Care</h3>
            <p>
              We provide personalized and compassionate healthcare services.
            </p>
          </div>
          <div className="feature">
            <i className="fas fa-hospital feature-icon"></i>
            <h3>State-of-the-Art Facility</h3>
            <p>
              Experience the best medical care with cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Patients Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>
              "Samopz' Clinic provided exceptional care. The doctors were
              attentive and compassionate."
            </p>
            <h4>- Hannah Badmus</h4>
          </div>
          <div className="testimonial">
            <p>
              "I felt valued and cared for. The staff went above and beyond to
              ensure my comfort."
            </p>
            <h4>- David Douglas</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="privacy-terms">
        <Link
          to="/privacy-policy"
          // className="nav-link"
          onClick={handleNavClick}
        >
          Privacy Policy .
          </Link>
        <Link
          to="/terms-of-service"
          // className="nav-link"
          onClick={handleNavClick}
        >
          Terms of Service
          </Link>
          </div>
        <p>
          &copy; {new Date().getFullYear()} Samopz' Clinic. All rights reserved.
        </p>
        <div className="social-media">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

// export default Home;