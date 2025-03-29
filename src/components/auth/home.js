import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import "../../styling/home.css";

const Home = ({ authenticated }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  return (
    <div>
      <div className="img-container">
        {/* Navigation */}
        <nav className="navbar">
          <div className={`nav-links ${isNavOpen ? "open" : ""}`}>
            <Link to="/" className="nav-link" onClick={handleNavClick}>
              Home
            </Link>
            {!authenticated ? (
              <>
                <Link
                  to="/signup"
                  className="nav-link"
                  onClick={handleNavClick}
                >
                  Signup
                </Link>
                <Link to="/login" className="nav-link" onClick={handleNavClick}>
                  Login
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="nav-link"
                onClick={handleNavClick}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/contact-us"
              className="nav-link"
              onClick={handleNavClick}
            >
              Contact Us
            </Link>
          </div>
          <div
            className="nav-toggle"
            onClick={toggleNav}
            aria-label="Toggle Navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="hero-section">
          <div className="hero-content">
            <img
              src={logo}
              className="hero-logo"
              alt="Samopz Clinic Logo - Your Health, Our Priority"
            />
            <h1>Welcome to Samopz' Clinic</h1>
            <p>Your Health, Our Priority. Book Your Appointment Today!</p>
            <a href="/contact-us" className="cta-button">
              Get Started
            </a>
          </div>
        </header>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature">
            <i className="fas fa-user-md feature-icon"></i>
            <h3>Expert Doctors</h3>
            <p>
              Our team of highly trained professionals is here to serve you.
            </p>
          </div>
          <div className="feature">
            <i className="fas fa-heartbeat feature-icon"></i>
            <h3>Comprehensive Care</h3>
            <p>
              We provide personalized and compassionate healthcare services.
            </p>
          </div>
          <div className="feature">
            <i className="fas fa-hospital feature-icon"></i>
            <h3>State-of-the-Art Facility</h3>
            <p>
              Experience the best medical care with cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Patients Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>
              "Samopz' Clinic provided exceptional care. The doctors were
              attentive and compassionate."
            </p>
            <h4>- Hannah Badmus</h4>
          </div>
          <div className="testimonial">
            <p>
              "I felt valued and cared for. The staff went above and beyond to
              ensure my comfort."
            </p>
            <h4>- David Douglas</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="privacy-terms">
        <Link
          to="/privacy-policy"
          // className="nav-link"
          onClick={handleNavClick}
        >
          Privacy Policy .
          </Link>
        <Link
          to="/terms-of-service"
          // className="nav-link"
          onClick={handleNavClick}
        >
          Terms of Service
          </Link>
          </div>
        <p>
          &copy; {new Date().getFullYear()} Samopz' Clinic. All rights reserved.
        </p>
        {/* <div className="social-media">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div> */}
      </footer>
    </div>
  );
};

export default Home;