import React, { useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

// Lazy-loaded components
const Login = lazy(() => import("./components/auth/login"));
const Signup = lazy(() => import("./components/auth/signup"));
const Home = lazy(() => import("./components/auth/home"));
const RegisterPatient = lazy(() => import("./components/registerPatients"));
const Queue = lazy(() => import("./components/queue"));
const UpdatePatient = lazy(() => import("./components/updatePatients"));
const AdminDashboard = lazy(() => import("./components/adminDashboard"));
const PatientDashboard = lazy(() => import("./components/patientDashboard"));
const ADHDAssessment = lazy(() => import("./components/ADHDAssessmt"));
const ADHDResults = lazy(() => import("./components/ADHDResults"));
const PrivacyPolicy = lazy(() => import("./components/ptc/privacypolicy"));
const TermsOfService = lazy(() => import("./components/ptc/terms"));
const ContactUs = lazy(() => import("./components/ptc/contactUs"));

const ProtectedRoute = ({ authenticated, children }) => {
  return authenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [username, setUserName] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
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

        {/* Routes */}
        <Suspense fallback={<div>Loading...</div>}>
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
                <ProtectedRoute authenticated={authenticated}>
                  <AdminDashboard
                    username={username}
                    setAuthenticated={setAuthenticated}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient-dashboard"
              element={
                <ProtectedRoute authenticated={authenticated}>
                  <PatientDashboard
                    username={username}
                    setAuthenticated={setAuthenticated}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register-patient"
              element={
                <ProtectedRoute authenticated={authenticated}>
                  <RegisterPatient />
                </ProtectedRoute>
              }
            />
            <Route
              path="/queue"
              element={
                <ProtectedRoute authenticated={authenticated}>
                  <Queue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-patient"
              element={
                <ProtectedRoute authenticated={authenticated}>
                  <UpdatePatient />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adhd-assessment"
              element={
                <ProtectedRoute authenticated={authenticated}>
                  <ADHDAssessment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adhd-results"
              element={
                <ProtectedRoute authenticated={authenticated}>
                  <ADHDResults />
                </ProtectedRoute>
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
