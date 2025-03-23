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

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userName, setUserName] = useState(""); // Updated to be dynamic
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
            {/* {authenticated && (
              <>
                <Link
                  to="/admin-dashboard"
                  className="nav-link"
                  onClick={toggleNav}
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/patient-dashboard"
                  className="nav-link"
                  onClick={toggleNav}
                >
                  Patient Dashboard
                </Link>
              </>
            )} */}
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
                  userName={userName}
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
                  userName={userName}
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
