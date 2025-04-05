import React from "react";
import logo from "../../logo.svg";
import "@fortawesome/fontawesome-free/css/all.css";

const HeroSection = () => {
  return (
    <header className="hero-section">
      <div className="hero-content">
        <img
          src={logo}
          className="hero-logo"
          alt="Samopz Clinic Logo - Your Health, Our Priority"
        />
        <h1>Samopz' Clinic</h1>
        <p>Your Health, Our Priority. Book Your Appointment Today!</p>
        <a href="/signup" className="cta-button">
          Get Started
        </a>
      </div>
    </header>
  );
};

export default HeroSection;
