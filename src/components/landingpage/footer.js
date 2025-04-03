import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ handleNavClick }) => {
  return (
    <footer className="home-footer">
      <div className="privacy-terms">
        <Link to="/privacy-policy" onClick={handleNavClick}>
          Privacy Policy
        </Link>
        <Link to="/terms-of-service" onClick={handleNavClick}>
          Terms of Service
        </Link>
      </div>
      <p>
        &copy; {new Date().getFullYear()} Samopz' Clinic. All rights reserved.
      </p>
      <div className="social-media">
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
      </div>
    </footer>
  );
};

export default Footer;
