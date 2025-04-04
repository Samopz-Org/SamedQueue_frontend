import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
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
import PatientDashboard from "./components/patientDashboard";
import StaffRequisitionForm from "./components/staffRequisitionForm";
import StaffRequisitions from "./components/staffRequisitions";
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

function App() {
  const [username, setUsername] = useState(null); // State for username
  const [role, setRole] = useState(null); // State for user role
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  console.log("setUsername:", setUsername);
  console.log("setRole:", setRole);

  useEffect(() => {
    // Simulate fetching user data (e.g., from an API or localStorage)
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        const user = await new Promise((resolve) =>
          setTimeout(
            () => resolve({ username: "to Samopz' Clinic", role: "admin" }),
            1000
          )
        );
        setUsername(user.username);
        setRole(user.role);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="loading"></div>; // Show loading spinner
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Show error message
  }

  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={<Login setUsername={setUsername} setRole={setRole} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Admin Routes */}
          {role === "admin" && (
            <>
              <Route
                path="/admin-dashboard"
                element={<AdminDashboard username={username} />}
              />
              <Route
                path="/requisitions"
                element={<RequisitionManager API_URL={API_URL} />}
              />
              <Route
                path="/staffRequisition-form"
                element={<StaffRequisitionForm API_URL={API_URL} />}
              />
              <Route
                path="/staff-requisitions"
                element={<StaffRequisitions />}
              />
              <Route path="/staff-attendance" element={<StaffAttendance />} />
              <Route
                path="/add-attendance"
                element={<AddAttendance API_URL={API_URL} />}
              />
              <Route
                path="/tasks"
                element={<TaskManager API_URL={API_URL} />}
              />
              <Route path="/register-patient" element={<RegisterPatient />} />
              <Route path="/queue" element={<Queue />} />
              <Route path="/update-patient" element={<UpdatePatient />} />
              <Route path="/adhd-assessment" element={<ADHDAssessment />} />
              <Route path="/adhd-results" element={<ADHDResults />} />
              <Route path="/" element={<Navigate to="/admin-dashboard" />} />
            </>
          )}

          {/* Staff Routes */}
          {role === "staff" && (
            <>
              <Route
                path="/staff-dashboard"
                element={<StaffDashboard username={username} />}
              />
              <Route
                path="/requisitions"
                element={<RequisitionManager API_URL={API_URL} />}
              />
              <Route
                path="/staffRequisition-form"
                element={<StaffRequisitionForm API_URL={API_URL} />}
              />
              <Route
                path="/staff-requisitions"
                element={<StaffRequisitions />}
              />
              <Route path="/staff-attendance" element={<StaffAttendance />} />
              <Route
                path="/add-attendance"
                element={<AddAttendance API_URL={API_URL} />}
              />
              <Route
                path="/tasks"
                element={<TaskManager API_URL={API_URL} />}
              />
              <Route path="/" element={<Navigate to="/staff-dashboard" />} />
            </>
          )}

          {/* Patient Routes */}
          {role === "patient" && (
            <>
              <Route
                path="/patient-dashboard"
                element={<PatientDashboard username={username} />}
              />
              <Route path="/register-patient" element={<RegisterPatient />} />
              <Route path="/queue" element={<Queue />} />
              <Route path="/update-patient" element={<UpdatePatient />} />
              <Route path="/adhd-assessment" element={<ADHDAssessment />} />
              <Route path="/adhd-results" element={<ADHDResults />} />
              <Route path="/" element={<Navigate to="/patient-dashboard" />} />
            </>
          )}

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
