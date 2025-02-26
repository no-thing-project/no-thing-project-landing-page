import React from "react";
import { motion, useMotionValue } from "framer-motion";
import { Helmet } from "react-helmet";
import HeaderSection from "../components/Sections/HeaderSection";
import FooterSection from "../components/Sections/FooterSection";
import "../index.css";

const TermsOfUse = () => {
  const logoOpacity = useMotionValue(1);
  const logoY = useMotionValue(0);

  return (
    <>
      <Helmet>
        <title>Terms of Use - no.thing.project</title>
        <meta name="description" content="Terms of Use of no.thing.project" />
      </Helmet>
      <motion.div
        className="landing-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeaderSection 
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
          <div className="terms-of-use-content">
            <h2>Terms of Use</h2>
            <p>
              Welcome to No.Thing Project. By using our website, you agree to these terms.
            </p>

            <h3>Use of Content</h3>
            <p>
              All content on this site is for informational purposes only.
              Unauthorized use or duplication without consent is prohibited.
            </p>

            <h3>User Responsibilities</h3>
            <p>
              Users must respect community guidelines and refrain from harmful
              activities, including spamming and illegal use.
            </p>

            <h3>Liability Disclaimer</h3>
            <p>
              No.Thing Project is not responsible for any direct or indirect
              damages arising from the use of this site.
            </p>

            <h3>Policy Updates</h3>
            <p>
              These terms may be updated periodically. Continued use of the site
              signifies acceptance of changes.
            </p>
          </div>
        </div>

        <FooterSection />
      </motion.div>
    </>
  );
};

export default TermsOfUse;
