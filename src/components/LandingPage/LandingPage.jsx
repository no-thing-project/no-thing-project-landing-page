// LandingPage.js
import React, {
  useRef,
  useCallback,
  Suspense,
  useEffect,
  useState,
} from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { wrap } from "popmotion";
import "./LandingPage.css";
import { Helmet } from "react-helmet";
import Scene from "../Scene/Scene3D";

const LandingPage = ({
  hdrTexture,
  showDebugButtons,
  showHubButton,
  isMobile,
}) => {
  const sceneRef = useRef(null);
  const sceneContainerRef = useRef(null);
  const { scrollY } = useViewportScroll();
  // menuOpen та бургер меню прибрано
  // const [menuOpen, setMenuOpen] = useState(false);

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

  const interestingRef = useRef(null);
  const [calcTextWidth, setCalcTextWidth] = useState(1500);
  useEffect(() => {
    if (interestingRef.current) {
      setCalcTextWidth(interestingRef.current.offsetWidth);
    }
  }, []);

  const speedFactor = 0.5;
  const xTrans = useTransform(scrollY, (value) =>
    wrap(0, -calcTextWidth, -value * speedFactor)
  );

  // Функції управління 3D-об'єктами
  const handleStop = () => sceneRef.current?.stopObjects();
  const handleContinue = () => sceneRef.current?.continueObjects();
  const handlePrev = () => sceneRef.current?.showPreviousState();
  const handleNext = () => sceneRef.current?.showNextState();

  function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;
    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, startY + distance * ease);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
  }

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
        {/* Бекграунд у стилі "біле скло" з 3D-сферою */}
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

        {/* Секція 1 – Перший екран */}
        <section
          id="section1"
          className="page-section first-screen"
          data-section-id="1"
        >
          <div className="first-screen-content">
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
            >start with Nothing, create Everything
            </motion.p>
            <motion.p
              className="first-screen-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
            </motion.p>
          </div>
        </section>

        {/* Секція 2 – Who We Are */}
        <section
          id="section2"
          className="page-section second-screen"
          data-section-id="2"
        >
          <div className="second-screen-content">
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
            >It is the idea that nothing is not emptiness but a starting point—a space where creativity, innovation, and change can emerge.
            </motion.p>
            <motion.p
              className="second-screen-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
            >
              We embrace minimalism as a tool for clarity and inspiration, proving that even from nothing, something extraordinary can be built.
            </motion.p>
          </div>
        </section>

        {/* Секція 3 – Великий текст */}
        <section
          id="section3"
          className="page-section section3"
          data-section-id="3"
        >
          <motion.h2
            className="section3-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {"WHAT IS NOTHING FOR YOU?".split(" ").map((word, idx) => (
              <a key={idx} style={{ display: "block" }}>
                {word}
              </a>
            ))}
          </motion.h2>
        </section>

        {/* Секція 4 – Історії */}
        <section
          id="section4"
          className="page-section section4"
          data-section-id="4"
        >
          <div className="stories-container">
            {/* Історія 1 */}
            <div className="story">
              <div className="story-content">
                <div className="story-photo">
                  <img src="/assets/images/someone-photo.png" alt="Someone" />
                </div>
                <div className="story-text">
                  <h3 className="story-name">Someone</h3>
                  <p className="story-description">
                  Nothing is not emptiness.
                  It is a breath before a thought.
                  A space before a step.
                  A silence before a song.
                  
                  Nothing is not absence.
                  It is freedom from what does not matter.
                  It is the weight that was never there.
                  
                  I do not fear nothing.
                  I live in it. I move with it.
                  And in nothing, I find everything.
                  </p>
                </div>
              </div>
            </div>
            {/* Історія 2 */}
            <div className="story">
              <div className="story-content">
                <div className="story-photo">
                  <img src="/assets/images/noone-photo.png" alt="Noone" />
                </div>
                <div className="story-text">
                  <h3 className="story-name">Noone</h3>
                  <p className="story-description">
                  For me, Nothing is not empty.
                  It’s not the absence of meaning, but the space where meaning begins.
                  Nothing is silence before a song, the blank page before a story, the deep breath before the first step.
                  
                  People fear Nothing. They think it’s a void, a dead end. But I see it as freedom.
                  Freedom from expectations. Freedom to create, to reinvent, to become.
                  
                  I am No One.
                  And I’ve built everything from Nothing.
                  </p>
                </div>
              </div>
            </div>
            {/* Історія 3 */}
            {/* <div className="story">
              <div className="story-content">
                <div className="story-photo">
                  <img src="yuliia_date_photo.png" alt="Yuliia" />
                </div>
                <div className="story-text">
                  <h3 className="story-name">Yuliia</h3>
                  <p className="story-description">
                    Lorem ipsum dolor sit amet consectetur. Nunc donec morbi ac
                    tellus. Malesuada tristique tempus quis viverra vivamus a.
                    Mollis facilisi senectus penatibus laoreet neque mauris
                    suscipit tempus vitae. Ultrices ac pharetra ut dui. Maecenas
                    arcu non proin ante facilisis. Tortor a amet et ultricies.
                    Nunc eu felis sit amet nisi porta. Eget magnis eu vestibulum
                    adipiscing tellus pretium augue. Vel sed sit neque enim.
                    Odio nunc enim quisque tellus. Nibh aliquam proin non sapien
                    sed tempus erat pellentesque in. Cursus quis cras morbi leo
                    proin elit ut. At dui dolor porta auctor in nec. Mauris ac
                    pretium nunc feugiat purus.
                  </p>
                </div>
              </div>
            </div> */}
            {/* Історія 4 */}
            {/* <div className="story">
              <div className="story-content">
                <div className="story-photo">
                  <img src="sophia_date_photo.png" alt="Sophia" />
                </div>
                <div className="story-text">
                  <h3 className="story-name">Sophia</h3>
                  <p className="story-description">
                    Lorem ipsum dolor sit amet consectetur. Nunc donec morbi ac
                    tellus. Malesuada tristique tempus quis viverra vivamus a.
                    Mollis facilisi senectus penatibus laoreet neque mauris
                    suscipit tempus vitae. Ultrices ac pharetra ut dui. Maecenas
                    arcu non proin ante facilisis. Tortor a amet et ultricies.
                    Nunc eu felis sit amet nisi porta. Eget magnis eu vestibulum
                    adipiscing tellus pretium augue. Vel sed sit neque enim.
                    Odio nunc enim quisque tellus. Nibh aliquam proin non sapien
                    sed tempus erat pellentesque in. Cursus quis cras morbi leo
                    proin elit ut. At dui dolor porta auctor in nec. Mauris ac
                    pretium nunc feugiat purus.
                  </p>
                </div>
              </div>
            </div> */}
            {/* Історія 5 */}
            {/* <div className="story">
              <div className="story-content">
                <div className="story-photo">
                  <img src="andrii_date_photo.png" alt="Andrii" />
                </div>
                <div className="story-text">
                  <h3 className="story-name">Andrii</h3>
                  <p className="story-description">
                    Lorem ipsum dolor sit amet consectetur. Nunc donec morbi ac
                    tellus. Malesuada tristique tempus quis viverra vivamus a.
                    Mollis facilisi senectus penatibus laoreet neque mauris
                    suscipit tempus vitae. Ultrices ac pharetra ut dui. Maecenas
                    arcu non proin ante facilisis. Tortor a amet et ultricies.
                    Nunc eu felis sit amet nisi porta. Eget magnis eu vestibulum
                    adipiscing tellus pretium augue. Vel sed sit neque enim.
                    Odio nunc enim quisque tellus. Nibh aliquam proin non sapien
                    sed tempus erat pellentesque in. Cursus quis cras morbi leo
                    proin elit ut. At dui dolor porta auctor in nec. Mauris ac
                    pretium nunc feugiat purus.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </section>
        {/* Секція 5 – Interesting */}
        <section
          id="section5"
          className="page-section section5"
          data-section-id="5"
        >
          <div className="interesting-container">
            <motion.div className="interesting-wrapper" style={{ x: xTrans }}>
              <a ref={interestingRef} className="interesting-text">
                INTERESTING?
              </a>
              <a className="interesting-text">INTERESTING?</a>
            </motion.div>
          </div>
        </section>

        {/* Секція 6 – Contacts */}
        <section
          id="section6"
          className="page-section section6"
          data-section-id="6"
        >
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
                <a href="mailto:someone@nothingproject.io">someone@nothingproject.io</a>
              </p>
              <p>
                <a href="mailto:noone@nothingproject.io">noone@nothingproject.io</a>
                {/* Phone: <a href="tel:+380637466673">+380 63 746 66 73</a> */}
              </p>
              <div className="social-icons">
                {/* <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1, color: "#7f44ff" }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                >
                  <i className="fab fa-facebook-f"></i>
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1, color: "#7f44ff" }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                >
                  <i className="fab fa-x-twitter"></i>
                </motion.a> */}
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
              </div>
            </div>
          </div>
        </section>

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
