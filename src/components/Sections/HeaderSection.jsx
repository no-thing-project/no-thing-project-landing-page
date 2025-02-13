// HeaderSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";
import FancyButton from "../Buttons/FancyButton";

const HeaderSection = ({
  scrollToSection,
  logoOpacity,
  logoY,
  isMobile,
  showDebugButtons,
  handleStop,
  handleContinue,
  handlePrev,
  handleNext,
  showHubButton,
  showDonateButton
}) => {
  return (
    <header className="landing-header">
      <motion.a
        className="logo"
        href="#section1"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("section1");
        }}
        style={{ opacity: logoOpacity, y: logoY }}
      >
        <h1 className="logo-text">
          no.thing
          <br />
          <span className="logo-sub">project</span>
        </h1>
      </motion.a>

      {!isMobile && (
        <nav className="landing-nav">
          <ul>
            <li>
              <a href="#section2" onClick={(e) => { e.preventDefault(); scrollToSection("section2"); }}>
                About
              </a>
            </li>
            <li>
              <a href="#section3" onClick={(e) => { e.preventDefault(); scrollToSection("section3"); }}>
                Nothing
              </a>
            </li>
            <li>
              <a href="#section4" onClick={(e) => { e.preventDefault(); scrollToSection("section4"); }}>
                Stories
              </a>
            </li>
            <li>
              <a href="#section6" onClick={(e) => { e.preventDefault(); scrollToSection("section6"); }}>
                Connect
              </a>
            </li>
          </ul>
        </nav>
      )}

      <div className="header-buttons-wrapper">
        {showDebugButtons && (
          <motion.div
            className="header-buttons"
            {...fadeInAnimation({ opacityY: -50, duration: 0.7 })}
          >
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleContinue}>Continue</button>
            <button onClick={handlePrev}>&lt;</button>
            <button onClick={handleNext}>&gt;</button>
          </motion.div>
        )}
        {showHubButton && (
          <motion.div
            className="header-hub-button"
            {...fadeInAnimation({ opacityY: -50, duration: 0.7 })}
          >
            <a
              href="https://external-resource.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              no.thing | HUB
            </a>
          </motion.div>
        )}
        {showDonateButton && <FancyButton />}
      </div>
    </header>
  );
};

export default HeaderSection;
