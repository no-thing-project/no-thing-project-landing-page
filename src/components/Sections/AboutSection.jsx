import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { fadeInAnimation } from "../../utils/fadeInAnimation";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="section2" className="page-section second-screen inverting-text" data-section-id="2">
      <div className="section-wrapper left-align second-screen-content">
        <motion.h1 className="second-screen-title" {...fadeInAnimation}>
          {t("aboutSection.aboutText")}
        </motion.h1>
        <motion.p className="second-screen-description" {...fadeInAnimation({ delay: 0.4 })}>
          {t("aboutSection.description_1")}
        </motion.p>
        <motion.p className="second-screen-description" {...fadeInAnimation({ delay: 0.6 })}>
          {t("aboutSection.description_2")}
        </motion.p>
        <motion.p className="second-screen-description" {...fadeInAnimation({ delay: 0.8 })}>
          {t("aboutSection.description_3")}
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;
