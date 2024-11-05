import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth.js/register";
import Login from "./components/auth.js/login";
import RegisterPatient from "./components/registerPatients";
import Queue from "./components/queue";
import UpdatePatient from "./components/updatePatients";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://github.com/samopz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="animated-text">Power By Samopz</h3>
        </a>
        <div>
          <h1 className="animated-text">Samedical_Queue_Site</h1>
            <div className="container">
              <div className="Reg">
                <Register />
              </div>
              <div className="Log">
                <Login />
              </div>
            <div className="Register">
              <RegisterPatient />
            </div>
            <div className="Queue">
              <Queue />
            </div>
            <div className="Update">
              <UpdatePatient />
            </div>
          </div>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Power By Samopz
        </a>
        </header>
         <Routes>
          <Route path="/register" element={Register} />
          <Route path="/login" element={Login} />
          <Route path="/register-patient" element={RegisterPatient} />
          <Route path="/queue" element={Queue} />
          <Route path="/update-patient" element={UpdatePatient} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
