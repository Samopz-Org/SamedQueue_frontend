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
import media from "./components/media/patDocImage.jpeg";
import media2 from "./components/media/docImage2.jpeg";
import media3 from "./components/media/patImage.jpeg";
import patImage from "./components/media/patImage2.jpeg";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/admin-dashboard" element={<Navigate to="/admin-dashboard" />} /> */}
          {/* <Route path="/home" element={<Navigate to="/Homepage" />} /> */}
          {/* <Route path="/about" element={<Register />} /> */}
          {/* <Route path="/contact" element={<Register />} /> */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-patient" element={<RegisterPatient />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/update-patient" element={<UpdatePatient />} />
        </Routes>
        <header className="App-header">
          <a className="App-link" href="/" target="_self">
            <div>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
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
              <div className="media">
                <div>
                  <p className="img-text">
                    Welcome, Our Doctors Are Ready To Serve You!
                  </p>

                  <img className="img" src={media} alt="doctor" />
                  <img className="img" src={media2} alt="doctor" />
                  <div className="blog-post">
                    <p> ddddddddddddddhdbsdfvdugdjkiedydjjhdusdhjgh </p>
                    <p> ddddddddddddddhdbsdfvdugdjkiedydjjhdusdhjgh </p>
                    <p> ddddddddddddddhdbsdfvdugdjkiedydjjhdusdhjgh </p>
                    <p> ddddddddddddddhdbsdfvdugdjkiedydjjhdusdhjgh </p>
                    <p> ddddddddddddddhdbsdfvdugdjkiedydjjhdusdhjgh </p>
                  </div>
                  <p className="img-text">
                    Do Not Ignore Early Sign of Your Health Symptoms{" "}
                  </p>
                  <img className="img" src={patImage} alt="doctor" />

                  <p className="img-text">
                    Book Your Appointment with Your Doctor To Address Your
                    Symptoms Early!
                  </p>
                  <img className="img" src={media3} alt="doctor" />
                </div>
              </div>
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
      </div>
    </Router>
  );
}

export default App;
