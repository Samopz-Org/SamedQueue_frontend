import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

const TestimonialsSection = ({ testimonials }) => {
  return (
    <section className="testimonials-section" aria-label="Testimonials">
      <h2>What Our Patients Say</h2>
      <div className="testimonials-grid">
        {testimonials.length > 0 ? (
          testimonials.map((testimonial, index) => (
            <div className="testimonial" key={index}>
              <i className="fas fa-quote-left"></i>
              <p>"{testimonial.text}"</p>
              <h4>- {testimonial.author}</h4>
            </div>
          ))
        ) : (
          <p>No testimonials available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
