// AboutSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";

const AboutSection = () => {
  return (
    <section id="section2" className="page-section second-screen inverting-text" data-section-id="2">
      <div className="section-wrapper left-align second-screen-content">
        <motion.h1
          className="second-screen-title"
          {...fadeInAnimation}
        >
          ABOUT
        </motion.h1>
        <motion.p
          className="second-screen-description"
          {...fadeInAnimation({ delay: 0.4 })}
        >
          No.Thing Project is a movement, a mindset, and a platform for transformation
        </motion.p>
        <motion.p
          className="second-screen-description"
          {...fadeInAnimation({ delay: 0.6 })}
        >
          It is the idea that nothing is not emptiness but a starting point - a space where creativity, innovation, and change can emerge.
        </motion.p>
        <motion.p
          className="second-screen-description"
          {...fadeInAnimation({ delay: 0.8 })}
        >
          We embrace minimalism as a tool for clarity and inspiration, proving that even from nothing, something extraordinary can be built.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;
