import React from "react";
import { motion } from "framer-motion";
import AnimatedTitle from "../UI/AnimatedTitle";
import useScrollPosition from "../../hooks/useScrollPosition";
import Section from "./Section";

const HeroSection = () => {
  const isScrolled = useScrollPosition();

  return (
    <Section sectionNumber={1} className="section-first-screen" id="hero">
      <motion.div className="container-first-screen glass-overlay">
        {/* Логотип відображається лише, якщо не відбулося скролінгу */}
        {!isScrolled && (
          <motion.div 
            className="first-screen-title-text"
            initial={{ opacity: 1, scale: 1.2 }}
            animate={{ opacity: isScrolled ? 0 : 1, scale: isScrolled ? 0 : 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <a className="logo-text">
              no.thing<br />
              <span className="logo-sub">project</span>
            </a>
          </motion.div>
        )}

        <AnimatedTitle as="p" className="first-screen-description-text">
          Start with Nothing - create Everything
        </AnimatedTitle>
      </motion.div>
    </Section>
  );
};

export default HeroSection;
