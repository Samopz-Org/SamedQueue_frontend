import React from "react";

const TestimonialsSection = () => {
  return (
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
  );
};

export default TestimonialsSection;
