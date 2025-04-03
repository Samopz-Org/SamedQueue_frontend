import React from "react";
import { Link, Navigate } from "react-router-dom";

const Navbar = ({ isNavOpen, toggleNav, handleNavClick, authenticated }) => {
  // Redirect unauthenticated users to the login page
  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <nav className="navbar">
      <div className={`nav-links ${isNavOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={handleNavClick}>
          Home
        </Link>
        {authenticated ? (
          <>
            <Link to="/signup" className="nav-link" onClick={handleNavClick}>
              Signup
            </Link>
            <Link to="/login" className="nav-link" onClick={handleNavClick}>
              Login
            </Link>
          </>
        ) : (
          <Link to="/dashboard" className="nav-link" onClick={handleNavClick}>
            Dashboard
          </Link>
        )}
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
