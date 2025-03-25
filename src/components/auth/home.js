import React from "react";
import logo from "../../logo.svg";
import "../../styling/home.css";

const Home = () => {
  return (
    <div>
      <header className="App-header">
        <a className="App-link" href="/" target="_self" aria-label="Home">
          <div>
            <img src={logo} className="App-logo" alt="Samopz Clinic Logo" />
          </div>
        </a>
        <a
          className="App-link"
          href="https://github.com/samopz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Samopz Clinic GitHub"
        >
          <h4 className="animated-text">Powered By Samopz' Clinic</h4>
        </a>
        <div className="content">
          <h4 className="animated-text">
            We Prioritize Your Health! Book Your Appointment With Us! Your Sound
            Health is Our Pride @ Samopz' Clinic!
          </h4>
          <section className="container">
            <div className="media">
              <p className="img-text">
                Welcome to Our Medical Family. Our Doctors Are Ready To Serve
                You Better.
              </p>
              <div className="blog-post">
                <p>
                  As we open our doors to welcome you to our medical facility,
                  we want to assure you that our team of dedicated doctors and
                  healthcare professionals are committed to providing you with
                  the highest quality care. Our mission is to deliver
                  personalized, compassionate, and innovative medical services
                  that cater to your unique needs.
                </p>
                <p>
                  <strong>Meet Our Team of Experts:</strong> Our team of doctors
                  and healthcare professionals are highly trained and
                  experienced in their respective fields. They are passionate
                  about delivering exceptional patient care and are dedicated to
                  staying up-to-date with the latest medical advancements.
                </p>
                <p>
                  <strong>Our Values:</strong> At our medical facility, we are
                  guided by a set of core values that shape our approach to
                  patient care:
                </p>
                <ul>
                  <li>
                    <strong>Compassion:</strong> Every patient deserves to be
                    treated with kindness, empathy, and respect.
                  </li>
                  <li>
                    <strong>Innovation:</strong> We use the latest technologies
                    to improve patient outcomes.
                  </li>
                  <li>
                    <strong>Personalization:</strong> We tailor our care to meet
                    individual needs and preferences.
                  </li>
                  <li>
                    <strong>Collaboration:</strong> We work closely with
                    patients, families, and other healthcare professionals to
                    ensure seamless care.
                  </li>
                </ul>
                <p>
                  <strong>What to Expect:</strong> When you visit our medical
                  facility, you can expect prompt and courteous service,
                  state-of-the-art facilities, and personalized care plans.
                </p>
                <p>
                  <strong>Call to Action:</strong> If you're looking for a
                  medical facility that prioritizes your health and well-being,
                  contact us today to schedule an appointment and experience the
                  difference our team of experts can make.
                </p>
              </div>
              <p className="img-text">
                Do Not Ignore Early Signs of Your Health Symptoms. Book Your
                Appointment with Your Doctor Today!
              </p>
            </div>
          </section>
        </div>
      </header>
      <footer className="App-footer">
        <p>
          &copy; {new Date().getFullYear()} Samopz' Clinic. All rights reserved.
        </p>
        <div className="footer-links">
          <a
            href="/privacy-policy"
            className="footer-link"
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="footer-link"
            aria-label="Terms of Service"
          >
            Terms of Service
          </a>
          <a href="/contact-us" className="footer-link" aria-label="Contact Us">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
