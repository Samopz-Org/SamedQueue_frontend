import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Home from "./components/auth/home";
import StaffAttendance from "./components/staffAttendance";
import AddAttendance from "./components/addAttendance";
import RegisterPatient from "./components/registerPatients";
import Queue from "./components/queue";
import UpdatePatient from "./components/updatePatients";
import AdminDashboard from "./components/adminDashboard";
import StaffDashboard from "./components/staffDashboard";
import PatientDashboard from "./components/patientDashboard";
import ADHDAssessment from "./components/ADHDAssessmt";
import ADHDResults from "./components/ADHDResults";
import PrivacyPolicy from "./components/ptc/privacypolicy";
import TermsOfService from "./components/ptc/terms";
import ContactUs from "./components/ptc/contactUs";
import "./styling/home.css";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [username, setUserName] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const ProtectedRoute = ({ element }) => {
    return authenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className={`nav-links ${isNavOpen ? "open" : ""}`}>
            <Link to="/" className="nav-link" onClick={toggleNav}>
              Home
            </Link>
            {!authenticated && (
              <>
                <Link to="/signup" className="nav-link" onClick={toggleNav}>
                  Signup
                </Link>
                <Link to="/login" className="nav-link" onClick={toggleNav}>
                  Login
                </Link>
              </>
            )}
            <Link to="/privacy-policy" className="nav-link" onClick={toggleNav}>
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="nav-link"
              onClick={toggleNav}
            >
              Terms of Service
            </Link>
            <Link to="/contact-us" className="nav-link" onClick={toggleNav}>
              Contact Us
            </Link>
          </div>
          <button
            className="nav-toggle"
            onClick={toggleNav}
            aria-label="Toggle Navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={!authenticated ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={
              !authenticated ? (
                <Login
                  setAuthenticated={setAuthenticated}
                  setUserName={setUserName}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                element={
                  <AdminDashboard
                    username={username}
                    setAuthenticated={setAuthenticated}
                  />
                }
              />
            }
          />
          <Route
            path="/staff-dashboard"
            element={
              <ProtectedRoute
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
            path="/patient-dashboard"
            element={
              <ProtectedRoute
                element={
                  <PatientDashboard
                    username={username}
                    setAuthenticated={setAuthenticated}
                  />
                }
              />
            }
          />
          <Route path="/staff-attendance" element={<StaffAttendance />} />
          <Route
            path="/add-attendance"
            element={<AddAttendance API_URL={API_URL} />}
          />

          <Route
            path="/register-patient"
            element={<ProtectedRoute element={<RegisterPatient />} />}
          />
          <Route
            path="/queue"
            element={<ProtectedRoute element={<Queue />} />}
          />
          <Route
            path="/update-patient"
            element={<ProtectedRoute element={<UpdatePatient />} />}
          />
          <Route
            path="/adhd-assessment"
            element={<ProtectedRoute element={<ADHDAssessment />} />}
          />
          <Route
            path="/adhd-results"
            element={<ProtectedRoute element={<ADHDResults />} />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
