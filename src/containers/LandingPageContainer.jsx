import React, { Suspense } from "react";
import { motion } from "framer-motion";
import LandingPage from "../components/LandingPage/LandingPage";

const LandingPageContainer = ({ hdrTexture, hdrError, isMobile }) => (
  <motion.div
    key="landing"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
  >
    <Suspense fallback={<div>Loading...</div>}>
      {hdrError ? (
        <div className="hdr-error-message">⚠️ HDR texture could not be loaded.</div>
      ) : (
        <LandingPage hdrTexture={hdrTexture} showDebugButtons={false} showHubButton={false} isMobile={isMobile} />
      )}
    </Suspense>
  </motion.div>
);

export default LandingPageContainer;
