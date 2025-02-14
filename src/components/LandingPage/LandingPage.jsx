// LandingPage.jsx
import React, {
  useRef,
  useCallback,
  Suspense,
  useEffect,
  useState,
} from "react";
import { motion, useViewportScroll, useTransform, animate } from "framer-motion";
import { wrap } from "popmotion";
import "./LandingPage.css";
import { Helmet } from "react-helmet";
import Scene from "../Scene/Scene3D";
import "./LandingPage.css";

/* 
 * Єдиний об'єкт/функція для повторюваних анімацій «випливання знизу»
 * Якщо потрібно інший delay, можна додати параметр:
 *   {...fadeInUp(0.4)}
 */
const fadeInUp = (delay = 0.2) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
  viewport: { once: true },
});

/*
 * Уніфікований компонент для заголовків.
 * Параметр as дозволяє обирати тег (h1, h2, h3 тощо).
 * motionProps – додаткові пропи анімації, якщо треба дати інший delay або viewport.
 */
const Title = ({ 
  as: Tag = "h2", 
  className = "", 
  motionProps = {}, 
  children 
}) => (
  <motion.div {...fadeInUp()} {...motionProps}>
    <Tag className={className}>{children}</Tag>
  </motion.div>
);

/*
 * Уніфікований компонент для секцій.
 * Просто «обгортка», що дозволяє не дублювати id, data-section-id, className.
 */
const Section = ({
  sectionNumber,
  id = "",
  className = "",
  children,
  ...rest
}) => {
  const sectionId = id || `section${sectionNumber}`;
  return (
    <section
      id={sectionId}
      className={`page-section ${className}`}
      data-section-id={sectionNumber}
      {...rest}
    >
      {children}
    </section>
  );
};

/*
 * Дані для меню – щоб не дублювати <li> вручну.
 * Якщо захочемо змінити назву чи додати пункт – достатньо додати об'єкт сюди.
 */
const navLinks = [
  { id: "section2", label: "What is" },
  { id: "section3", label: "Nothing" },
  { id: "section4", label: "For You?" },
  { id: "section6", label: "Contact Us" },
];

/*
 * Дані для історій. Якщо треба додати нову історію, достатньо додати об'єкт.
 * Закоментовані історії теж можна залишити у цьому ж масиві, просто 
 * поставити поле 'disabled: true', але «логіку» не видаляємо.
 */
const storiesData = [
  {
    name: "Someone",
    img: "assets/images/someone_userphoto_id.png",
    text: `Nothing is not emptiness.
It is a breath before a thought.
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
    text: `For me, Nothing is not empty.
It’s not the absence of meaning, but the space where meaning begins.
Nothing is silence before a song, the blank page before a story, the deep breath before the first step.

People fear Nothing. They think it’s a void, a dead end. But I see it as freedom.
Freedom from expectations. Freedom to create, to reinvent, to become.

I am No One.
And I’ve built everything from Nothing.`,
  },

  // Нижче – коментарі з оригіналу, залишаємо, не видаляючи логіку:
  /*
  {
    name: "Yuliia",
    img: "yuliia_date_photo.png",
    text: `Lorem ipsum dolor sit amet...`,
  },
  {
    name: "Sophia",
    img: "sophia_date_photo.png",
    text: `Lorem ipsum dolor sit amet...`,
  },
  {
    name: "Andrii",
    img: "andrii_date_photo.png",
    text: `Lorem ipsum dolor sit amet...`,
  },
  */
];

const LandingPage = ({
  hdrTexture,
  showDebugButtons,
  showHubButton,
  isMobile,
}) => {
  const sceneRef = useRef(null);
  const { scrollY } = useViewportScroll();
  const [calcTextWidth, setCalcTextWidth] = useState(1500);
  const interestingRef = useRef(null);

  // Анімаційні змінні
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

  const speedFactor = 0.5;
  const xTrans = useTransform(scrollY, (value) =>
    wrap(0, -calcTextWidth, -value * speedFactor)
  );

  useEffect(() => {
    animate(
      "#infinite-scroll", 
      { x: ["0%", "-166%"] }, 
      { ease: "linear", duration: 9, repeat: Infinity, repeatType: "loop" }
    );
  }, []);


  // Кнопки керування 3D-об'єктами
  const handleStop = () => sceneRef.current?.stopObjects();
  const handleContinue = () => sceneRef.current?.continueObjects();
  const handlePrev = () => sceneRef.current?.showPreviousState();
  const handleNext = () => sceneRef.current?.showNextState();

  // Плавний скрол до секцій
  function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // простенька ease-in-out
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
        {/* Фонова 3D-сцена */}
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
            {...fadeInUp(0.0)} // без затримки
          >
            <h1 className="logo-text">
              no.thing
              <br />
              <span className="logo-sub">project</span>
            </h1>
          </motion.a>

          {/* Навігація (тільки для десктопу) */}
          {!isMobile && (
            <nav className="landing-nav">
              <ul>
                {navLinks.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(id);
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="header-buttons-wrapper">
            {showDebugButtons && (
              <motion.div className="header-buttons" {...fadeInUp(0.7)}>
                <button onClick={handleStop}>Stop</button>
                <button onClick={handleContinue}>Continue</button>
                <button onClick={handlePrev}>&lt;</button>
                <button onClick={handleNext}>&gt;</button>
              </motion.div>
            )}
            {showHubButton && (
              <motion.div
                className="header-hub-button"
                {...fadeInUp(0.7)}
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
        <Section sectionNumber={1} className="first-screen" id="section1">
          <div className="first-screen-content glass-overlay">
            <Title
              as="h2"
              className="first-screen-title"
              motionProps={fadeInUp(0.2)}
            >
              No.Thing Project
            </Title>
            <Title
              as="p"
              className="first-screen-description"
              motionProps={fadeInUp(0.4)}
            >
              start with Nothing, create Everything
            </Title>
            <Title
              as="p"
              className="first-screen-description"
              motionProps={fadeInUp(0.4)}
            >
              {/* залишено порожній <p> для збереження верстки */}
            </Title>
          </div>
        </Section>

        {/* Секція 2 – Who We Are */}
        <Section sectionNumber={2} className="second-screen" id="section2">
          <div className="second-screen-content glass-overlay">
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
          <motion.h2 className="section-title-text glass-overlay" {...fadeInUp(0.2)}>
            {"NOTHING".split(" ").map((word, idx) => (
              <a key={idx} style={{ display: "block" }}>
                {word}
              </a>
            ))}
          </motion.h2>
        </Section>

        {/* Секція 4 – Історії */}
        <Section sectionNumber={4} className="section4" id="section4">
          <div className="stories-container">
            <motion.h2
              className="section-title-text glass-overlay"
              {...fadeInUp(0.2)}
            >
              FOR YOU
            </motion.h2>

            {/* Виводимо усі історії з масиву storiesData */}
            {storiesData.map((story, i) => (
              <motion.div key={i} {...fadeInUp(0.2 + i * 0.2)}>
                <div className="story  glass-overlay">
                  <div className="story-content">
                    <div className="story-photo">
                      <img src={story.img} alt={story.name} />
                    </div>
                    <div className="story-text ">
                      <h3 className="story-name">{story.name}</h3>
                      <p className="section-description-text">{story.text}</p>
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
          <div className="second-screen-content glass-overlay">
            <Title
              as="h2"
              className="section-title-text"
              motionProps={fadeInUp(0.2)}
            >
              CONTACT US
            </Title>
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
                {/*
                  Збережено всі посилання соц.мереж; логіка не змінена.
                  Додаємо Motion, щоби не дублювати анімацію – можна теж
                  винести в мапу, але лишаємо як є, щоби "не видаляти нічого".
                */}
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
        </Section>

        {/* Футер */}
        <footer className="landing-footer">
          <motion.div
            className="footer-content"
            {...fadeInUp(0.8)}
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