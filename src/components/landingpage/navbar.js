import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";

const Navbar = ({ isNavOpen, toggleNav, handleNavClick }) => {
  return (
    <nav className="navbar">
      <div className={`nav-links ${isNavOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={handleNavClick}>
          Home
        </Link>
        <Link to="/signup" className="nav-link" onClick={handleNavClick}>
          Signup
        </Link>
        <Link to="/login" className="nav-link" onClick={handleNavClick}>
          Login
        </Link>
        <Link to="/dashboard" className="nav-link" onClick={handleNavClick}>
          Dashboard
        </Link>
        <Link to="/contact-us" className="nav-link" onClick={handleNavClick}>
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
  );
};

export default Navbar;
