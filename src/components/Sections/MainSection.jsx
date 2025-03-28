import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";
import HintBadge from "../HintBadge/HintBagde";

const MainSection = ({ lang }) => {

  return (
    <section
      id="section1"
      className="page-section first-screen inverting-text"
      data-section-id="1"
    >
      <div
        className="section-wrapper first-screen-content"
        style={{ isolation: "isolate", position: "relative" }}
      >
        <motion.h1 className="first-screen-title" {...fadeInAnimation(0.2)}>
          {lang("mainSection.title")}
        </motion.h1>
        <motion.p className="first-screen-description" {...fadeInAnimation(0.4)}>
          {lang("mainSection.description")}
        </motion.p>
      </div>
      <HintBadge />
    </section>
  );
};

export default MainSection;