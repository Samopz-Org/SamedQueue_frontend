import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
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
import TaskManager from "./components/task";
import ADHDAssessment from "./components/ADHDAssessmt";
import ADHDResults from "./components/ADHDResults";
import PrivacyPolicy from "./components/ptc/privacypolicy";
import TermsOfService from "./components/ptc/terms";
import ContactUs from "./components/ptc/contactUs";

const NotFound = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <Link to="/">Go Back to Home</Link>
  </div>
);

const ProtectedRoute = ({ element, authenticated }) => {
  return authenticated ? element : <Navigate to="/login" />;
};

function App() {
  const [username, setUserName] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                authenticated={authenticated}
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
            path="/staff-attendance"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                element={<StaffAttendance />}
              />
            }
          />
          <Route
            path="/add-attendance"
            element={
              <ProtectedRoute
                authenticated={authenticated}
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
                element={<RegisterPatient />}
              />
            }
          />
          <Route
            path="/queue"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                element={<Queue />}
              />
            }
          />
          <Route
            path="/update-patient"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                element={<UpdatePatient />}
              />
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                element={<TaskManager />}
              />
            }
          />
          <Route
            path="/adhd-assessment"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                element={<ADHDAssessment />}
              />
            }
          />
          <Route
            path="/adhd-results"
            element={
              <ProtectedRoute
                authenticated={authenticated}
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
