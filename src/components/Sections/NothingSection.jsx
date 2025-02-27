// NothingSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";
import DecryptText from "../DecryptText/DecryptText";

const NothingSection = ({ isMobile }) => {
  if (isMobile) {
    return (
      <section
        id="section3"
        className="page-section section3 inverting-text"
        data-section-id="3"
      >
        <div className="section-wrapper">
          <motion.h2
            className="section3-title"
            {...fadeInAnimation(0.2)}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              margin: "auto",
              height: "auto", // Забезпечуємо auto-розмір
            }}
          >
            <DecryptText text="NOTHING" />
          </motion.h2>
        </div>
      </section>
    );
  }

  const text = "WHAT IS NOTHING FOR YOU?";
  return (
    <section
      id="section3"
      className="page-section section3 inverting-text"
      data-section-id="3"
    >
      <div className="section-wrapper right-align">
        <motion.h2 className="section3-title" {...fadeInAnimation(0.2)}>
          {text.split(" ").map((word, idx) => (
            <a key={idx} style={{ display: "flex", justifyContent: "end" }}>
              {word === "NOTHING" ? <DecryptText text="NOTHING" /> : word}
            </a>
          ))}
        </motion.h2>
      </div>
    </section>
  );
};

export default NothingSection;