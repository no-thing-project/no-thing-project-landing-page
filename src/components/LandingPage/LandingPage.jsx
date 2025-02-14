// LandingPage.js
import React, { useRef, useCallback, Suspense, useEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet";
import Scene from "../Scene/Scene3D";
import "./LandingPage.css";

const LandingPage = ({ hdrTexture, showDebugButtons, showHubButton, isMobile }) => {
  // ===== References & State =====
  const sceneRef = useRef(null);
  const interestingRef = useRef(null);
  const { scrollY } = useViewportScroll();
  const [calcTextWidth, setCalcTextWidth] = useState(0);

  // Визначення ширини текстового блоку для анімації секції Interesting
  useEffect(() => {
    if (interestingRef.current) {
      setCalcTextWidth(interestingRef.current.offsetWidth);
    }
  }, []);

  // ===== Scroll Animations =====
  const x = useTransform(
    scrollY,
    [0, 400, 700, 1400, 1800, 2500],
    ["0vw", "0vw", "50vw", "50vw", "10vw", "10vw"]
  );
  const opacity = useTransform(
    scrollY,
    [0, 390, 700, 800, 1510, 1800, 2650, 2700],
    [1, 1, 1, 1, 1, 1, 1, 0]
  );

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
      const ease = progress < 0.5
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

  // ===== Render Component =====
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
        {/* Фон із 3D-сценою */}
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

        {/* ===== Header ===== */}
        <header className="landing-header">
          <motion.a
            className="logo"
            href="#section1"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("section1");
            }}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
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
                  <a
                    href="#section2"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("section2");
                    }}
                  >
                    What is
                  </a>
                </li>
                <li>
                  <a
                    href="#section3"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("section3");
                    }}
                  >
                    Nothing
                  </a>
                </li>
                <li>
                  <a
                    href="#section4"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("section4");
                    }}
                  >
                    For You?
                  </a>
                </li>
                <li>
                  <a
                    href="#section6"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("section6");
                    }}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          )}

          <div className="header-buttons-wrapper">
            {showDebugButtons && (
              <motion.div
                className="header-buttons"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
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
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
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
          </div>
        </header>

        {/* ===== Section 1 – First Screen ===== */}
        <section id="section1" className="page-section first-screen" data-section-id="1">
          <div className="section-wrapper first-screen-content">
            <motion.h1
              className="first-screen-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              No.Thing Project
            </motion.h1>
            <motion.p
              className="first-screen-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              start with Nothing, create Everything
            </motion.p>
          </div>
        </section>

        {/* ===== Section 2 – Who We Are ===== */}
        <section id="section2" className="page-section second-screen" data-section-id="2">
          <div className="section-wrapper left-align second-screen-content">
            <motion.h1
              className="second-screen-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              WHAT IS
            </motion.h1>
            <motion.p
              className="second-screen-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              No.Thing Project is a movement, a mindset, and a platform for transformation
            </motion.p>
            <motion.p
              className="second-screen-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
            >
              It is the idea that nothing is not emptiness but a starting point—a space where creativity, innovation, and change can emerge.
            </motion.p>
            <motion.p
              className="second-screen-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              viewport={{ once: true }}
            >
              We embrace minimalism as a tool for clarity and inspiration, proving that even from nothing, something extraordinary can be built.
            </motion.p>
          </div>
        </section>

        {/* ===== Section 3 – Large Text ===== */}
        <section id="section3" className="page-section section3" data-section-id="3">
          <div className="section-wrapper right-align">
            <motion.h2
              className="section3-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {"NOTHING".split(" ").map((word, idx) => (
                <a key={idx} style={{ display: "block" }}>
                  {word}
                </a>
              ))}
            </motion.h2>
          </div>
        </section>

        {/* ===== Section 4 – Stories ===== */}
        <section id="section4" className="page-section section4" data-section-id="4">
          <div className="section-wrapper">
            <motion.h1
              className="second-screen-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              FOR YOU?
            </motion.h1>
            <div className="stories-container">
              <div className="story">
                <div className="story-content">
                  <div className="story-photo">
                    <img src="assets/images/someone_userphoto_id.png" alt="Someone" />
                  </div>
                  <div className="story-text">
                    <h3 className="story-name">Someone</h3>
                    <p className="story-description">
                      Nothing is not emptiness. It is a breath before a thought. A space before a step. A silence before a song.
                      Nothing is not absence. It is freedom from what does not matter. It is the weight that was never there.
                      I do not fear nothing. I live in it. I move with it. And in nothing, I find everything.
                    </p>
                  </div>
                </div>
              </div>
              <div className="story">
                <div className="story-content">
                  <div className="story-photo">
                    <img src="assets/images/noone_userphoto_id.png" alt="Noone" />
                  </div>
                  <div className="story-text">
                    <h3 className="story-name">Noone</h3>
                    <p className="story-description">
                      For me, Nothing is not empty. It’s not the absence of meaning, but the space where meaning begins.
                      Nothing is silence before a song, the blank page before a story, the deep breath before the first step.
                      People fear Nothing. They think it’s a void, a dead end. But I see it as freedom – freedom from expectations,
                      freedom to create, to reinvent, to become. I am No One. And I’ve built everything from Nothing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Section 5 – Interesting Animation ===== */}
        <section id="section5" className="page-section section5" data-section-id="5">
          <div className="section-wrapper-full">
            <div className="interesting-container">
              <motion.div
                className="interesting-wrapper"
                animate={{ x: -calcTextWidth }}
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <span
                  ref={interestingRef}
                  className="interesting-text"
                  data-text="INTERESTING?"
                >
                  INTERESTING?
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== Section 6 – Contacts ===== */}
        <section id="section6" className="page-section section6" data-section-id="6">
          <div className="section-wrapper left-align">
            <div className="second-screen-content">
              <motion.h1
                className="second-screen-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                CONTACT US
              </motion.h1>
              <div className="contacts">
                <p>
                  <a href="mailto:someone@nothingproject.io">
                    someone@nothingproject.io
                  </a>
                </p>
                <p>
                  <a href="mailto:noone@nothingproject.io">
                    noone@nothingproject.io
                  </a>
                </p>
                <div className="social-icons">
                  <motion.a
                    href="https://t.me/no_thing_project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1, color: "#7f44ff" }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                  >
                    <i className="fab fa-telegram"></i>
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/no.thing.project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1, color: "#7f44ff" }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                  >
                    <i className="fab fa-instagram"></i>
                  </motion.a>
                  <motion.a
                    href="https://x.com/nooneonnothing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1, color: "#7f44ff" }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                  >
                    <i className="fab fa-x-twitter"></i>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/company/no-thing-project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1, color: "#7f44ff" }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                  >
                    <i className="fab fa-linkedin"></i>
                  </motion.a>
                  <motion.a
                    href="https://www.behance.net/nothingproject"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1, color: "#7f44ff" }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                  >
                    <i className="fab fa-behance"></i>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Footer ===== */}
        <footer className="landing-footer">
          <motion.div
            className="footer-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p>
              &copy; 2025 <span className="brand">no.thing.project</span>
            </p>
            <p className="rights">ALL.RIGHTS.RESERVED</p>
          </motion.div>
        </footer>
      </motion.div>
    </>
  );
};

export default LandingPage;