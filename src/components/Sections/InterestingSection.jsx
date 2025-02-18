import React, { useRef, useLayoutEffect } from "react";
import { motion, animate } from "framer-motion";
import Section from "./Section";

const InterestingSection = () => {
  const interestingRef = useRef(null);

  useLayoutEffect(() => {
    animate("#infinite-scroll", { x: ["0%", "-100%"] }, { ease: "linear", duration: 9, repeat: Infinity, repeatType: "loop" });
  }, []);

  return (
    <Section sectionNumber={5} className="section5" id="section5">
      <div className="interesting-container glass-overlay">
        <motion.div id="infinite-scroll" className="interesting-wrapper">
          <a ref={interestingRef} className="interesting-text">
            INTERESTING?
          </a>
          <a className="interesting-text">INTERESTING?</a>
        </motion.div>
      </div>
    </Section>
  );
};

export default InterestingSection;
