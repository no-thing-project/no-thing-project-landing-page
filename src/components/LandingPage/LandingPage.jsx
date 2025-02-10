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

// Використовуємо React.lazy для завантаження 3D-сцени
const Scene = React.lazy(() => import("../Scene/Scene3D"));

const LandingPage = ({ hdrTexture, showDebugButtons, showHubButton }) => {
  const sceneRef = useRef(null);
  const sceneContainerRef = useRef(null);
  const { scrollY } = useViewportScroll();

  const x = useTransform(
    scrollY,
    [0, 400, 700, 1400, 1800, 2500],
    ["0vw", "0vw", "50vw", "50vw", "10vw", "10vw"]
  );
  const opacity = useTransform(
    scrollY,
    [0, 390, 700, 800, 1510, 1800, 3000, 3600],
    [1, 1, 1, 1, 1, 1, 1, 0]
  );

  // Налаштування для секції Interesting
  // Використовуємо ref для вимірювання реальної ширини блоку тексту
  const interestingRef = useRef(null);
  const [calcTextWidth, setCalcTextWidth] = useState(1500);
  useEffect(() => {
    if (interestingRef.current) {
      setCalcTextWidth(interestingRef.current.offsetWidth);
    }
  }, []);

  const speedFactor = 0.5;
  // Використовуємо wrap для безшовного циклічного ефекту із розрахунком за виміряною шириною
  const xTrans = useTransform(scrollY, (value) =>
    wrap(0, -calcTextWidth, -value * speedFactor)
  );

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
    <motion.div
      className="landing-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Suspense fallback={<div>Loading 3D scene...</div>}>
        <motion.div
          ref={sceneContainerRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "50vw",
            height: "100vh",
            pointerEvents: "none",
            x: x,
            opacity: opacity,
            zIndex: 5,
          }}
        >
          <Scene ref={sceneRef} hdrTexture={hdrTexture} />
        </motion.div>
      </Suspense>

      <header className="landing-header">
        <motion.a
          className="logo"
          href="#home"
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
        <nav className="landing-nav">
          <ul>
            <li>
              <a
                href="#section1"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("section1");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#section2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("section2");
                }}
              >
                About
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
                Noting
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
                Histories
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
                Our Projects
              </a>
            </li>
            <li>
              <a
                href="#section7"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("section7");
                }}
              >
                Contacts
              </a>
            </li>
          </ul>
        </nav>
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

      {/* Секція 1 */}
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
            Lorem ipsum dolor sit amet consectetur.
          </motion.h1>
          <motion.p
            className="first-screen-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Lorem ipsum dolor sit amet consectetur. Enim leo et blandit in.
            Volutpat blandit egestas ac convallis viverra consequat risus erat.
          </motion.p>
          <motion.p
            className="first-screen-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Volutpat blandit egestas ac convallis viverra consequat risus erat.
            Viverra porttitor quam enim risus vitae integer dui feugiat. Lectus
            orci quam mi eget vestibulum enim sed laoreet viverra.
          </motion.p>
        </div>
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        >
          KEEP SCROLLING
        </motion.div>
      </section>

      {/* Секція 2 */}
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
            WHO WE ARE
          </motion.h1>
          <motion.p
            className="second-screen-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Lorem ipsum dolor sit amet consectetur. Ac ultricies lorem nunc
            libero mauris. Blandit vitae adipiscing mattis purus est est
            suspendisse. Velit scelerisque dignissim ac commodo massa. Eu tempor
            est vestibulum convallis purus risus adipiscing cursus eget. Leo
            gravida ut dignissim nec sollicitudin aliquet viverra. Imperdiet a
            nibh non elementum suspendisse pretium in ultrices.
          </motion.p>
          <motion.p
            className="second-screen-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            At posuere consectetur duis id. Amet morbi fermentum euismod
            tristique ornare diam leo. Feugiat mi in platea egestas nisl vel
            blandit dictumst ligula.
          </motion.p>
          <motion.p
            className="second-screen-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Lacus mauris placerat mus maecenas nunc magnis purus in. Eu sit
            porttitor enim non tincidunt vulputate massa. Augue tortor enim
            vitae dui sed pharetra blandit consequat. Egestas lacus sed nec
            facilisis tempus gravida. Leo aliquam justo nam felis diam gravida
            in sed ipsum. Sit pretium est quam malesuada iaculis.
          </motion.p>
        </div>
      </section>

      {/* Секція 3 */}
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
          WHAT IS NOTHING FOR YOU?
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
                <img src="/photo1.png" alt="Oleksandr" />
              </div>
              <div className="story-text">
                <h3 className="story-name">Oleksandr</h3>
                <p className="story-description">
                  Lorem ipsum dolor sit amet consectetur. Nunc donec morbi ac
                  tellus. Malesuada tristique tempus quis viverra vivamus a.
                  Mollis facilisi senectus penatibus laoreet neque mauris
                  suscipit tempus vitae. Ultrices ac pharetra ut dui. Maecenas
                  arcu non proin ante facilisis. Tortor a amet et ultricies.
                  Nunc eu felis sit amet nisi porta. Eget magnis eu vestibulum
                  adipiscing tellus pretium augue. Vel sed sit neque enim. Odio
                  nunc enim quisque tellus. Nibh aliquam proin non sapien sed
                  tempus erat pellentesque in. Cursus quis cras morbi leo proin
                  elit ut. At dui dolor porta auctor in nec. Mauris ac pretium
                  nunc feugiat purus.
                </p>
              </div>
            </div>
          </div>
          {/* Історія 2 */}
          <div className="story">
            <div className="story-content">
              <div className="story-photo">
                <img src="/photo2.png" alt="Andrii" />
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
                  adipiscing tellus pretium augue. Vel sed sit neque enim. Odio
                  nunc enim quisque tellus. Nibh aliquam proin non sapien sed
                  tempus erat pellentesque in. Cursus quis cras morbi leo proin
                  elit ut. At dui dolor porta auctor in nec. Mauris ac pretium
                  nunc feugiat purus.
                </p>
              </div>
            </div>
          </div>
          {/* Історія 3 */}
          <div className="story">
            <div className="story-content">
              <div className="story-photo">
                <img src="/photo3.png" alt="Sophia" />
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
                  adipiscing tellus pretium augue. Vel sed sit neque enim. Odio
                  nunc enim quisque tellus. Nibh aliquam proin non sapien sed
                  tempus erat pellentesque in. Cursus quis cras morbi leo proin
                  elit ut. At dui dolor porta auctor in nec. Mauris ac pretium
                  nunc feugiat purus.
                </p>
              </div>
            </div>
          </div>
          {/* Історія 4 */}
          <div className="story">
            <div className="story-content">
              <div className="story-photo">
                <img src="/photo4.png" alt="Yulia" />
              </div>
              <div className="story-text">
                <h3 className="story-name">Yulia</h3>
                <p className="story-description">
                  Lorem ipsum dolor sit amet consectetur. Nunc donec morbi ac
                  tellus. Malesuada tristique tempus quis viverra vivamus a.
                  Mollis facilisi senectus penatibus laoreet neque mauris
                  suscipit tempus vitae. Ultrices ac pharetra ut dui. Maecenas
                  arcu non proin ante facilisis. Tortor a amet et ultricies.
                  Nunc eu felis sit amet nisi porta. Eget magnis eu vestibulum
                  adipiscing tellus pretium augue. Vel sed sit neque enim. Odio
                  nunc enim quisque tellus. Nibh aliquam proin non sapien sed
                  tempus erat pellentesque in. Cursus quis cras morbi leo proin
                  elit ut. At dui dolor porta auctor in nec. Mauris ac pretium
                  nunc feugiat purus.
                </p>
              </div>
            </div>
          </div>
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
            {/* Один екземпляр тексту для вимірювання ширини */}
            <div ref={interestingRef} className="interesting-text">
              INTERESTING?
            </div>
            <div className="interesting-text">INTERESTING?</div>
          </motion.div>
        </div>
      </section>

      {/* Секція 6 – our projects */}
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
            OUR PROJECTS
          </motion.h1>
        </div>
      </section>

      {/* Секція 7 – Контакти */}
      <section
        id="section7"
        className="page-section section7"
        data-section-id="7"
      >
        <div className="second-screen-content">
          <motion.h1
            className="second-screen-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            CONTACTS
          </motion.h1>
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
  );
};

export default LandingPage;
