import React, { useState } from "react";
import "@fortawesome/fontawesome-free";
import Navbar from "../landingpage/navbar";
import HeroSection from "../landingpage/heroSection";
import FeaturesSection from "../landingpage/featuresSection";
import TestimonialsSection from "./testimonialSection";
import Footer from "../landingpage/footer";
import "../../styling/home.css";

const Home = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  // Testimonials data
  const testimonials = [
    {
      text: "Samopz' Clinic provided exceptional care. The doctors were attentive and compassionate.",
      author: "Hannah Abraham",
    },
    {
      text: "I felt valued and cared for. The staff went above and beyond to ensure my comfort.",
      author: "David Peter",
    },
    {
      text: "The clinic's queue system is efficient, and I didn't have to wait long for my appointment.",
      author: "Grace Johnson",
    },
  ];

  return (
    <div>
      <div className="img-container">
        <Navbar
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
          handleNavClick={handleNavClick}
        />
        <HeroSection />
      </div>
      <FeaturesSection />
      <TestimonialsSection testimonials={testimonials} />
      <Footer handleNavClick={handleNavClick} />
    </div>
  );
};

export default Home;
