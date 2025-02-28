import React from "react";
import { motion, useMotionValue } from "framer-motion";
import { Helmet } from "react-helmet";
import HeaderSection from "../components/Sections/HeaderSection";
import FooterSection from "../components/Sections/FooterSection";
import "../index.css";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const logoOpacity = useMotionValue(1);
  const logoY = useMotionValue(0);
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Privacy Policy - no.thing.project</title>
        <meta name="description" content="Privacy Policy of no.thing.project" />
      </Helmet>
      <motion.div
        className="landing-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeaderSection 
          lang={t}
          scrollToSection={() => {}}
          logoOpacity={logoOpacity}
          logoY={logoY}
          isMobile={false}
          showDebugButtons={false}
          showHubButton={false}
          showDonateButton={false}
        />

        {/* Основний контент сторінки */}
        <div className="section-wrapper">
          <div className="privacy-policy-content">
            <h2>Privacy Policy</h2>
            <p>
              At No.Thing Project, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website.
            </p>

            <h3>Information We Collect</h3>
            <p>
              We collect minimal data necessary to improve our website, such as analytics and contact information you voluntarily provide.
            </p>

            <h3>How We Use Your Data</h3>
            <p>
              Your data helps us enhance the No.Thing experience, ensuring a seamless and engaging platform.
            </p>

            <h3>Data Protection</h3>
            <p>
              We implement industry-standard security measures to protect your data from unauthorized access.
            </p>

            <h3>Your Rights</h3>
            <p>
              You have the right to access, modify, or delete your personal data. Contact us at{" "}
              <a href="mailto:someone@nothingproject.io">
                someone@nothingproject.io
              </a>{" "}
              for any privacy concerns.
            </p>
          </div>
        </div>

        <FooterSection lang={t}/>
      </motion.div>
    </>
  );
};

export default PrivacyPolicy;
