import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";

const fadeInUp = (delay = 0.2) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
  viewport: { once: true },
});

const NothingSection = () => {
  return (
    <Section sectionNumber={3} className="section-nothing" id="section-nothing">
      <motion.h2 className="section-title-text" {...fadeInUp(0.2)}>
        {"NOTHING".split(" ").map((word, idx) => (
          <a key={idx} style={{ display: "block" }}>
            {word}
          </a>
        ))}
      </motion.h2>
    </Section>
  );
};

export default NothingSection;
