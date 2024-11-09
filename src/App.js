import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth.js/login";
import Signup from "./components/auth.js/signup";
import RegisterPatient from "./components/registerPatients";
import Queue from "./components/queue";
import UpdatePatient from "./components/updatePatients";
import AdminDashboard from "./components/adminDashboard";
import PatientDashboard from "./components/patientDashboard";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <a className="App-link" href="https://github.com/samopz"
            target="_blank"
            rel="noopener noreferrer"
          >
          <img src={logo} className="App-logo" alt="logo"/>
</a>
          <a
            className="App-link"
            href="https://github.com/samopz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4 className="animated-text">Power By Samopz' Clinic</h4>
          </a>
          <div>
            <h4 className="animated-text">
              We Prioritize Your Health! (Book Your Appointment With Us!)
            </h4>
            <div className="container">
              <div className="auth">
                <Signup />
              </div>
              <div className="auth">
                <Login />
              </div>
              {/* <div className="Register">
                <RegisterPatient />
              </div>
              <div className="Queue">
                <Queue />
              </div>
              <div className="Update">
                <UpdatePatient />
              </div> */}
            </div>
          </div>
          <a
            className="App-link"
            href="https://github.com/samopz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Power By Samopz
          </a>
        </header>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          {/* <Route path="/home" element={<Navigate to="/Homepage" />} /> */}
          {/* <Route path="/about" element={<Register />} /> */}
          {/* <Route path="/contact" element={<Register />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-patient" element={<RegisterPatient />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/update-patient" element={<UpdatePatient />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
