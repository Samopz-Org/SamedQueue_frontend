import React, { useState } from "react";
import Navbar from "../landingpage/navbar";
import HeroSection from "../landingpage/heroSection";
import FeaturesSection from "../landingpage/featuresSection";
import TestimonialsSection from "./testimonialSection";
import Footer from "../landingpage/footer";
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
        <Navbar
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
          handleNavClick={handleNavClick}
          authenticated={authenticated}
        />
        <HeroSection />
      </div>
      <FeaturesSection />
      <TestimonialsSection />
      <Footer handleNavClick={handleNavClick} />
    </div>
  );
};

export default Home;
