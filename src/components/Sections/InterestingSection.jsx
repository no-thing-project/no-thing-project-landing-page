// InterestingSection.jsx
import React from "react";
import { motion } from "framer-motion";

const InterestingSection = ({ calcTextWidth, interestingRef }) => {
  return (
    <section id="section5" className="page-section section5" data-section-id="5">
      <div className="section-wrapper-full">
        <div className="interesting-container">
          <motion.div
            className="interesting-wrapper"
            animate={{ x: -calcTextWidth }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <span
              ref={interestingRef}
              className="interesting-text"
              data-text="INTERESTING?"
            >
              INTERESTING?
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InterestingSection;
