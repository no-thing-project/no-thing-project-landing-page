import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import DecryptText from "../DecryptText/DecryptText";

const NothingSection = ({ lang, isMobile }) => {
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              writingMode: "vertical-rl",
              textOrientation: "upright",
              margin: "auto",
              height: "auto",
            }}
          >
            <DecryptText text={lang("nothingSection.nothing")}/>
          </motion.h2>
        </div>
      </section>
    );
  }

  const text = lang("nothingSection.question").split(" ");
  return (
    <section
      id="section3"
      className="page-section section3 inverting-text"
      data-section-id="3"
    >
      <div className="section-wrapper right-align">
        <motion.h2 className="section3-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {text.map((word, idx) => (
            <a key={idx} style={{ display: "flex", justifyContent: "end" }}>
              {word === lang("nothingSection.nothing") ? <DecryptText text={lang("nothingSection.nothing")} /> : word}
            </a>
          ))}
        </motion.h2>
      </div>
    </section>
  );
};

export default NothingSection;