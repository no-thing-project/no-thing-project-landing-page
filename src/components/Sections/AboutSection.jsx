import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";

const AboutSection = ({ lang }) => {
  return (
    <section id="section2" className="page-section second-screen inverting-text" data-section-id="2">
      <div className="section-wrapper left-align second-screen-content">
        <motion.h1 className="second-screen-title" {...fadeInAnimation}>
          {lang("aboutSection.aboutText")}
        </motion.h1>
        <motion.p className="second-screen-description" {...fadeInAnimation({ delay: 0.4 })}>
          {lang("aboutSection.description_1")}
        </motion.p>
        <motion.p className="second-screen-description" {...fadeInAnimation({ delay: 0.6 })}>
          {lang("aboutSection.description_2")}
        </motion.p>
        <motion.p className="second-screen-description" {...fadeInAnimation({ delay: 0.8 })}>
          {lang("aboutSection.description_3")}
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;
