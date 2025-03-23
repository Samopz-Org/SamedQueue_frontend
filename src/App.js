import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import RegisterPatient from "./components/registerPatients";
import Queue from "./components/queue";
import UpdatePatient from "./components/updatePatients";
import AdminDashboard from "./components/adminDashboard";
import PatientDashboard from "./components/patientDashboard";
import ADHDAssessment from "./components/ADHDAssessmt";
import ADHDResults from "./components/ADHDResults";
import logo from "./logo.svg";
// import media from "./components/media/patDocImage.jpeg";
// import media2 from "./components/media/docImage2.jpeg";
// import media3 from "./components/media/patImage.jpeg";
// import patImage from "./components/media/patImage2.jpeg";
import "./styling/App.css";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

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
            <Link to="/signup" className="nav-link" onClick={toggleNav}>
              Signup
            </Link>
            <Link to="/login" className="nav-link" onClick={toggleNav}>
              Login
            </Link>
          </div>
          <div className="nav-toggle" onClick={toggleNav}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-patient" element={<RegisterPatient />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/update-patient" element={<UpdatePatient />} />
          <Route path="/adhd-assessment" element={<ADHDAssessment />} />
          <Route path="/adhd-results" element={<ADHDResults />} />
        </Routes>
        <header className="App-header">
          <a className="App-link" href="/" target="_self">
            <div>
              <img src={logo} className="App-logo" alt="Samopz Clinic Logo" />
            </div>
          </a>
          <a
            className="App-link"
            href="https://github.com/samopz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4 className="animated-text">Powered By Samopz' Clinic</h4>
          </a>
          <div className="content">
            <h4 className="animated-text">
              We Prioritize Your Health! (Book Your Appointment With Us!) Your
              Sound Health is Our Pride @ Samopz' Clinic!
            </h4>
            <div className="container">
              {/* <div className="auth">
                <Signup />
              </div>
              <div className="auth">
                <Login />
              </div> */}
              <div className="media">
                <div>
                  <p className="img-text">
                    Welcome to Our Medical Family, Our Doctors Are Ready To
                    Serve You Better
                  </p>
                  {/* <img className="img" src={media} alt="Doctor with patient" /> */}
                  {/* <img className="img" src={media2} alt="Doctor" /> */}
                  <div className="blog-post">
                    <p>
                      As we open our doors to welcome you to our medical
                      facility, we want to assure you that our team of dedicated
                      doctors and healthcare professionals are committed to
                      providing you with the highest quality care. Our mission
                      is to deliver personalized, compassionate, and innovative
                      medical services that cater to your unique needs. In this
                      blog, we'll introduce you to our team of experts and
                      highlight the values that drive our commitment to
                      excellence. <br />
                      Meet Our Team of Experts: Our team of doctors and
                      healthcare professionals are highly trained and
                      experienced in their respective fields. They are
                      passionate about delivering exceptional patient care and
                      are dedicated to staying up-to-date with the latest
                      medical advancements. From routine check-ups to complex
                      surgeries, our team is equipped to handle a wide range of
                      medical needs. <br />
                      Our Values: At our medical facility, we are guided by a
                      set of core values that shape our approach to patient
                      care. These values include: - Compassion: We believe that
                      every patient deserves to be treated with kindness,
                      empathy, and respect. - Innovation: We are committed to
                      staying at the forefront of medical advancements and using
                      the latest technologies to improve patient outcomes. -
                      Personalization: We understand that every patient is
                      unique, and we tailor our care to meet their individual
                      needs and preferences. - Collaboration: We believe that
                      healthcare is a team effort, and we work closely with our
                      patients, their families, and other healthcare
                      professionals to ensure seamless care. <br />
                      What to Expect: When you visit our medical facility, you
                      can expect: - Prompt and courteous service: Our staff is
                      dedicated to ensuring that you receive prompt attention
                      and are treated with respect and kindness. -
                      State-of-the-art facilities: Our medical facility is
                      equipped with the latest medical technologies and
                      equipment to ensure that you receive the best possible
                      care. - Personalized care plans: Our doctors and
                      healthcare professionals will work with you to develop a
                      personalized care plan that addresses your unique needs
                      and health goals.<br></br>At our medical facility, we are
                      committed to providing you with exceptional care and
                      service. Our team of doctors and healthcare professionals
                      are dedicated to delivering personalized, compassionate,
                      and innovative medical services that cater to your unique
                      needs. We look forward to welcoming you to our medical
                      family and serving you better.<br></br> Call to Action: If
                      you're looking for a medical facility that prioritizes
                      your health and well-being, look no further. Contact us
                      today to schedule an appointment and experience the
                      difference that our team of experts can make.
                    </p>
                  </div>
                  <p className="img-text">
                    Do Not Ignore Early Sign of Your Health Symptoms
                  </p>
                  {/* <img className="img" src={patImage} alt="doctor" /> */}
                  <p className="img-text">
                    Book Appointment with us To Address Your Symptoms Early!
                  </p>
                  {/* <img className="img" src={media3} alt="doctor" /> */}
                </div>
              </div>
            </div>
          </div>
        </header>
        <footer className="App-footer">
          <p>&copy; 2025 Samopz' Clinic. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy-policy" className="footer-link">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="footer-link">
              Terms of Service
            </a>
            <a href="/contact-us" className="footer-link">
              Contact Us
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
