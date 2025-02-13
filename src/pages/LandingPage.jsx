import { motion, useTransform, useViewportScroll } from "framer-motion";
import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Scene from "../components/Scene/Scene3D";
import "../index.css";
import AboutSection from "../components/Sections/AboutSection";
import ConnectSection from "../components/Sections/ConnectSection";
import FooterSection from "../components/Sections/FooterSection";
import HeaderSection from "../components/Sections/HeaderSection";
import InterestingSection from "../components/Sections/InterestingSection";
import MainSection from "../components/Sections/MainSection";
import NothingSection from "../components/Sections/NothingSection";
import StoriesSection from "../components/Sections/StoriesSection";

const LandingPage = ({
  hdrTexture,
  showDebugButtons,
  showHubButton,
  showDonateButton,
  isMobile,
}) => {
  // ===== References & State =====
  const sceneRef = useRef(null);
  const { scrollY } = useViewportScroll();
  const [calcTextWidth, setCalcTextWidth] = useState(0);
  const interestingRef = useRef(null);

  // Розрахунок ширини текстового блоку для анімації в Section5
  useEffect(() => {
    if (interestingRef.current) {
      setCalcTextWidth(interestingRef.current.offsetWidth);
    }
  }, []);

  // Анімація логотипа
  const logoOpacity = useTransform(scrollY, [0, 700], [0, 1]);
  const logoY = useTransform(scrollY, [0, 700], [-50, 0]);

  // ===== 3D Object Controls =====
  const handleStop = () => sceneRef.current?.stopObjects();
  const handleContinue = () => sceneRef.current?.continueObjects();
  const handlePrev = () => sceneRef.current?.showPreviousState();
  const handleNext = () => sceneRef.current?.showNextState();

  // ===== Smooth Scrolling =====
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
        {/* 3D фон */}
        {!isMobile && (
          <div className="background-container">
            <Suspense fallback={<div>Loading 3D scene...</div>}>
              <div className="scene-wrapper">
                <Scene
                  ref={sceneRef}
                  hdrTexture={hdrTexture}
                  showDebugButtons={showDebugButtons}
                  isMobile={isMobile}
                />
              </div>
            </Suspense>
            <div className="glass-overlay"></div>
          </div>
        )}

        {/* Header */}
        <HeaderSection 
          scrollToSection={scrollToSection}
          logoOpacity={logoOpacity}
          logoY={logoY}
          isMobile={isMobile}
          showDebugButtons={showDebugButtons}
          handleStop={handleStop}
          handleContinue={handleContinue}
          handlePrev={handlePrev}
          handleNext={handleNext}
          showHubButton={showHubButton}
          showDonateButton={showDonateButton}
        />

        {/* Секції */}
        <MainSection scrollToSection={scrollToSection} />
        <AboutSection />
        <NothingSection />
        <StoriesSection />
        <InterestingSection calcTextWidth={calcTextWidth} interestingRef={interestingRef} />
        <ConnectSection />
        <FooterSection />
      </motion.div>
    </>
  );
};

export default LandingPage;
