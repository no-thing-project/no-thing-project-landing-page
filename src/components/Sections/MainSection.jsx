// MainSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";

const MainSection = () => {
  return (
    <section id="section1" className="page-section first-screen" data-section-id="1">
      <div className="section-wrapper first-screen-content">
        <motion.h1
          className="first-screen-title"
          {...fadeInAnimation(0.2)}
        >
          No.Thing Project
        </motion.h1>
        <motion.p
          className="first-screen-description"
          {...fadeInAnimation(0.4)}
        >
          Start with Nothing. Create Everything
        </motion.p>
      </div>
    </section>
  );
};

export default MainSection;
