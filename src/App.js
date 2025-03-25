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
import RegisterPatient from "./components/registerPatients";
import Queue from "./components/queue";
import UpdatePatient from "./components/updatePatients";
import AdminDashboard from "./components/adminDashboard";
import PatientDashboard from "./components/patientDashboard";
import ADHDAssessment from "./components/ADHDAssessmt";
import ADHDResults from "./components/ADHDResults";
import PrivacyPolicy from "./components/ptc/privacypolicy";
import TermsOfService from "./components/ptc/terms";
import ContactUs from "./components/ptc/contactUs";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [username, setUserName] = useState(""); // Updated to be dynamic
  const [authenticated, setAuthenticated] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
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
          <div className="nav-toggle" onClick={toggleNav}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
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
              authenticated ? (
                <AdminDashboard
                  username={username}
                  setAuthenticated={setAuthenticated}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/patient-dashboard"
            element={
              authenticated ? (
                <PatientDashboard
                  username={username}
                  setAuthenticated={setAuthenticated}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/register-patient"
            element={
              authenticated ? <RegisterPatient /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/queue"
            element={authenticated ? <Queue /> : <Navigate to="/login" />}
          />
          <Route
            path="/update-patient"
            element={
              authenticated ? <UpdatePatient /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/adhd-assessment"
            element={
              authenticated ? <ADHDAssessment /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/adhd-results"
            element={authenticated ? <ADHDResults /> : <Navigate to="/login" />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
