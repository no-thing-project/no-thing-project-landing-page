import React, {
  useRef,
  useCallback,
  useEffect,
  Suspense,
  useLayoutEffect,
  useState,
} from "react";
import { motion, useViewportScroll, useTransform, animate } from "framer-motion";
import { wrap } from "popmotion";
import "./LandingPage.css";
import { Helmet } from "react-helmet";
import Scene from "../Scene/Scene3D";

/* 
 * Анімація "випливання знизу" з параметром затримки (delay)
 */
const fadeInUp = (delay = 0.2) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
  viewport: { once: true },
});

/* 
 * Універсальний компонент заголовків з анімацією
 */
const Title = ({ as: Tag = "h2", className = "", motionProps = {}, children }) => (
  <motion.div {...motionProps}>
    <Tag className={className}>{children}</Tag>
  </motion.div>
);

/* 
 * Компонент секції для спрощення структури
 */
const Section = ({ sectionNumber, id = "", className = "", children, ...rest }) => (
  <section
    id={id || `section${sectionNumber}`}
    className={`page-section ${className}`}
    data-section-id={sectionNumber}
    {...rest}
  >
    {children}
  </section>
);

/* 
 * Дані для меню навігації
 */
const navLinks = [
  { id: "section2", label: "What is" },
  { id: "section3", label: "Nothing" },
  { id: "section4", label: "For You?" },
  { id: "section6", label: "Contact Us" },
];

/* 
 * Дані для історій
 */
const storiesData = [
  {
    name: "Someone",
    img: "assets/images/someone_userphoto_id.png",
    text: `Nothing - It is a breath before a thought.
    A space before a step.
    A silence before a song.
    
    Nothing is not absence.
    It is freedom from what does not matter.
    It is the weight that was never there.
    
    I do not fear nothing.
    I live in it. I move with it.
    And in nothing, I find everything.`,
  },
  {
    name: "Noone",
    img: "assets/images/noone_userphoto_id.png",
    text: `Nothing - is the space where meaning begins.
    Nothing is silence before a song, the blank page before a story, the deep breath before the first step.
    
    People fear Nothing. They think it’s a void, a dead end. But I see it as freedom.
    Freedom from expectations. Freedom to create, to reinvent, to become.
`,
  },
];

const LandingPage = ({ hdrTexture, showDebugButtons, showHubButton, isMobile }) => {
  const interestingRef = useRef(null); // Додано useRef
  const menuRef = useRef(null);

  const sceneRef = useRef(null);
  const { scrollY } = useViewportScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useViewportScroll();

  const logoScale = useTransform(scrollYProgress, [0, 0.2], [1.2, 0.8]);
  const logoX = useTransform(scrollYProgress, [0, 0.2], ["0%", "-30vw"]);
  const logoY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-20vh"]);

  const x = useTransform(scrollY, [0, 400, 700, 1400, 1800, 2500], ["0vw", "0vw", "50vw", "50vw", "10vw", "10vw"]);
  const opacity = useTransform(scrollY, [0, 390, 700, 800, 1510, 1800, 2650, 2700], [1, 1, 1, 1, 1, 1, 1, 0]);
  const [calcTextWidth, setCalcTextWidth] = useState(1500);
  const xTrans = useTransform(scrollY, (value) => wrap(0, -calcTextWidth, -value * 0.5));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };



  useLayoutEffect(() => {
    animate("#infinite-scroll", { x: ["0%", "-100%"] }, { ease: "linear", duration: 9, repeat: Infinity, repeatType: "loop" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
      </Helmet>
      
     <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <motion.div
          className={`logo-container ${(menuOpen || isScrolled )}`}
          // Коли лого велике (скрол маленький) – керуємо scale, x, y через framer-motion
          // style={isScrolled ? {} : { scale: logoScale, x: logoX, y: logoY }}
        >
          <a href="#section1" className="logo-text">
            no.thing<br/>
            <span className="logo-sub">project</span>
          </a>
        </motion.div>

        <div className="menu-container">
          <nav className={`landing-nav ${menuOpen ? "open" : ""}`}>
          <ul>
            {navLinks.map(({ id, label }) => (
              <li key={id} className="menu-item">
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    
                      setMenuOpen(false);
                  }}
                >
          {label}
        </a>
      </li>
    ))}
  </ul>
          </nav>
          
          <div className={`menu-toggle  ${isScrolled ? "scrolled" : ""}`}>
            <input
              type="checkbox"
              className="menu-checkbox"
              id="menu-checkbox"
              checked={menuOpen}
              onChange={toggleMenu}
            />
            <label className="menu-icon" htmlFor="menu-checkbox">
              <span className="hamburger"></span>
            </label>
          </div>
        </div>
        <div className="donation-header-button">
          <motion.a 
            href="https://www.paypal.com/donate/?hosted_button_id=FFPAVCYLTSZV6" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="donation-button"
          >
            Donate
          </motion.a>
        </div>
        <div className="header-buttons-wrapper">
          {showDebugButtons && (
            <motion.div className="header-buttons" {...fadeInUp(0.7)}>
              <button>Stop</button>
              <button>Continue</button>
              <button>&lt;</button>
              <button>&gt;</button>
            </motion.div>
          )}
          {showHubButton && (
            <motion.div className="header-hub-button" {...fadeInUp(0.7)}>
              <a href="https://external-resource.com" target="_blank" rel="noopener noreferrer">
                no.thing | HUB
              </a>
            </motion.div>
          )}
        </div>
      </header>
      
      <motion.div className="landing-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        {/* {!isMobile && ( */}
          <div className="background-container">
            <Suspense fallback={<div>Loading 3D scene...</div>}>
              <div className="scene-wrapper">
                <Scene ref={sceneRef} hdrTexture={hdrTexture} showDebugButtons={showDebugButtons} isMobile={isMobile} />
              </div>
            </Suspense>
          </div>
        {/* )} */}

        {/* Sections */}
        <Section sectionNumber={1} className="first-screen">
          <motion.div className="first-screen-content glass-overlay">
            {!isScrolled && (
                        <motion.div 
                          className={`first-screen-title ${(menuOpen || isScrolled) ? "in-header" : ""}`}
                          style={isScrolled ? {} : { scale: logoScale, x: logoX, y: logoY }}
                          >
                            <a href="#section1" className="logo-text">no.thing<br/>
                            <span className="logo-sub">project</span>
                            </a>
                        </motion.div>
            )}
              <Title className="first-screen-description" as="p">
                Start with Nothing - create Everything
              </Title>
          </motion.div>
      </Section>

           {/* Секція 2 – Who We Are */}
        <Section sectionNumber={2} className="section2" id="section2">
          <div className="section-content glass-overlay">
            <Title
              as="h2"
              className="section-title-text "
              motionProps={fadeInUp(0.2)}
            >
              WHAT IS
            </Title>
            <Title
              as="p"
              className="section-description-text" 
              motionProps={fadeInUp(0.4)}
            >
              No.Thing Project is a movement, a mindset, and a platform for transformation
            </Title>
            <Title
              as="p"
              className="section-description-text"
              motionProps={fadeInUp(0.6)}
            >
              It is the idea that nothing is not emptiness but a starting point—a space where creativity, innovation, and change can emerge.
            </Title>
            <Title
              as="p"
              className="section-description-text"
              motionProps={fadeInUp(0.6)}
            >
              We embrace minimalism as a tool for clarity and inspiration, proving that even from nothing, something extraordinary can be built.
            </Title>
          </div>
        </Section>

        {/* Секція 3 – Великий текст */}
        <Section sectionNumber={3} className="section3" id="section3">
          <motion.h2 className="section-title-text" {...fadeInUp(0.2)}>
            {"NOTHING".split(" ").map((word, idx) => (
              <a key={idx} style={{ display: "block" }}>
                {word}
              </a>
            ))}
          </motion.h2>
        </Section>


        <Section sectionNumber={4} className="section-stories">
          <div className="stories-container glass-overlay">
            <Title as="h2" className="section-title-text" motionProps={fadeInUp(0.2)}>FOR YOU</Title>
            {storiesData.map((story, i) => (
              <motion.div key={i} {...fadeInUp(0.2 + i * 0.2)}>
                <div className="story glass-overlay">
                  <div className="story-content">
                      <div className="story-photo">
                        <img src={story.img} alt={story.name} />
                      </div>
                    <div className="story-text">
                      <h3 className="story-title-text">{story.name}</h3>
                      <p className="story-description-text">{story.text}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Секція 5 – Interesting */}
        <Section sectionNumber={5} className="section5" id="section5">
          <div className="interesting-container glass-overlay">
            <motion.div id="infinite-scroll" className="interesting-wrapper">
              <a ref={interestingRef} className="interesting-text">
                INTERESTING?
              </a>
              <a className="interesting-text">INTERESTING?</a>
            </motion.div>
          </div>
        </Section>

        {/* Секція 6 – Contacts */}
        <Section sectionNumber={6} className="section6" id="section6">
          <div className="section-content glass-overlay">
            <Title
              as="h2"
              className="contacts-title-text"
              motionProps={fadeInUp(0.2)}
            >
              CONTACT US
            </Title>
          <div className="contacts-container">
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
                {/* Phone: <a href="tel:+380637466673">+380 63 746 66 73</a> */}
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
        </Section>

        {/* Футер */}
        <footer className="landing-footer glass-overlay">
          <motion.div className="footer-content" {...fadeInUp(0.8)}>
            <p>&copy; 2025 <span className="brand">no.thing.project</span></p>
            <p className="rights">ALL.RIGHTS.RESERVED</p>
          </motion.div>
        </footer>

      </motion.div>
    </>
  );
};

export default LandingPage;
