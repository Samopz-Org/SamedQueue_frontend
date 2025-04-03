import React from "react";

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2>Why Choose Us?</h2>
      <div className="features-grid">
        <div className="feature">
          <i className="fas fa-user-md feature-icon"></i>
          <h3>Expert Doctors</h3>
          <p>Our team of highly trained professionals is here to serve you.</p>
        </div>
        <div className="feature">
          <i className="fas fa-heartbeat feature-icon"></i>
          <h3>Comprehensive Care</h3>
          <p>We provide personalized and compassionate healthcare services.</p>
        </div>
        <div className="feature">
          <i className="fas fa-hospital feature-icon"></i>
          <h3>State-of-the-Art Facility</h3>
          <p>Experience the best medical care with cutting-edge technology.</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
