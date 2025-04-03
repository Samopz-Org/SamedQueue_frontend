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

export default App;
