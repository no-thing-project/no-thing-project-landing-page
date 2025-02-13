import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";

const NothingSection = () => {
  return (
    <section id="section3" className="page-section section3" data-section-id="3">
      <div className="section-wrapper right-align">
        <motion.h2
          className="section3-title"
          {...fadeInAnimation(0.2)}
        >
          {"WHAT IS NOTHING FOR YOU?".split(" ").map((word, idx) => (
            <a key={idx} style={{ display: "block" }}>
              {word}
            </a>
          ))}
        </motion.h2>
      </div>
    </section>
  );
};

export default NothingSection;
