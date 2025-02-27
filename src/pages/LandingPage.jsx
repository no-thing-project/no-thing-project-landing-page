// LandingPage.jsx
import { motion, useTransform, useViewportScroll } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import MetaBallsCanvas from "../components/MetaBalls/MetaBallsCanvas";
import "../index.css";
import HeaderSection from "../components/Sections/HeaderSection";
import MainSection from "../components/Sections/MainSection";
import AboutSection from "../components/Sections/AboutSection";
import NothingSection from "../components/Sections/NothingSection";
import StoriesSection from "../components/Sections/StoriesSection";
import InterestingSection from "../components/Sections/InterestingSection";
import ConnectSection from "../components/Sections/ConnectSection";
import FooterSection from "../components/Sections/FooterSection";
import SupportSection from "../components/Sections/SupportSection";

const LandingPage = ({
  showDebugButtons,
  showHubButton,
  showDonateButton,
  isMobile,
}) => {
  const { scrollY } = useViewportScroll();
  const [calcTextWidth, setCalcTextWidth] = useState(0);
  const interestingRef = useRef(null);

  useEffect(() => {
    if (interestingRef.current) {
      setCalcTextWidth(interestingRef.current.offsetWidth);
    }
  }, []);

  const logoOpacity = useTransform(scrollY, [0, 700], [0, 1]);
  const logoY = useTransform(scrollY, [0, 700], [-50, 0]);

  const smoothScrollTo = (targetY, duration = 800) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, startY + distance * ease);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetY = element.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(targetY, 1000);
    }
  }, []);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
      </Helmet>

      <motion.div
        className="landing-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="background-container">
          <MetaBallsCanvas isMobile={isMobile} />
        </div>

        <HeaderSection
          scrollToSection={scrollToSection}
          logoOpacity={logoOpacity}
          logoY={logoY}
          isMobile={isMobile}
          showDebugButtons={showDebugButtons}
          showHubButton={showHubButton}
          showDonateButton={showDonateButton}
        />

        {/* Обгортка для основних секцій */}
        <div className="sections-wrapper">
          <MainSection/>
          <AboutSection />
          <NothingSection
            isMobile={isMobile}
          />
          <StoriesSection />
          <InterestingSection
            calcTextWidth={calcTextWidth}
            interestingRef={interestingRef}
          />
          <SupportSection />
          <ConnectSection />
          <FooterSection />
        </div>
      </motion.div>
    </>
  );
};

export default LandingPage;