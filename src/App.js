import React from "react";
import RegisterPatient from "./components/registerPatients";
import Queue from "./components/queue";
import UpdatePatient from "./components/updatePatients";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
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
    </div>
  );
}

export default App;
