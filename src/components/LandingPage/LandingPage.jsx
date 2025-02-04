// src/LandingPage.jsx
import React, { useRef } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import Scene from '../Scene/Scene3D'; // ваш компонент 3D-сцени
import './LandingPage.css';

const LandingPage = () => {
  const sceneRef = useRef(null);
  const sceneContainerRef = useRef(null);

  // Використовуємо useViewportScroll для відстеження scrollY
  const { scrollY } = useViewportScroll();
  // Наприклад, коли scrollY від 0 до 2000, сцена переміщується від 0 до 100vw
  const x = useTransform(scrollY, [0, 1000, 2000], ['0vw', '50vw', '-5vw']);

  const handleStop = () => {
    sceneRef.current?.stopObjects();
  };

  const handleContinue = () => {
    sceneRef.current?.continueObjects();
  };

  const handlePrev = () => {
    sceneRef.current?.showPreviousState();
  };

  const handleNext = () => {
    sceneRef.current?.showNextState();
  };

  // Функція плавного скролу
  function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      // Простий easing (easeInOutQuad)
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, startY + distance * ease);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  // Функція для плавного скролу до секції за ID
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Отримуємо відстань від верху сторінки до елемента
      const targetY = element.getBoundingClientRect().top + window.scrollY;
      smoothScrollTo(targetY, 1000); // 1000 мс - тривалість скролу (можна регулювати)
    }
  };

  return (
    <motion.div
      className="landing-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Контейнер для 3D-сцени */}
      <motion.div
        ref={sceneContainerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '50vw',
          height: '100vh',
          pointerEvents: 'none',
          x: x,
          zIndex: 5,
        }}
      >
        <Scene ref={sceneRef} />
      </motion.div>

      {/* Хедер із логотипом, навігацією та кнопками */}
      <header className="landing-header">
        <motion.a
          className="logo"
          href="#home"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="logo-text">
            no.thing<br />
            <span className="logo-sub">project</span>
          </h1>
        </motion.a>

        {/* Навігаційне меню з якорями */}
        <nav className="landing-nav">
          <ul>
            <li>
              <a
                href="#section1"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('section1');
                }}
              >
                Section 1
              </a>
            </li>
            <li>
              <a
                href="#section2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('section2');
                }}
              >
                Section 2
              </a>
            </li>
            <li>
              <a
                href="#section3"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('section3');
                }}
              >
                Section 3
              </a>
            </li>
          </ul>
        </nav>

        <motion.div
          className="header-buttons"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleContinue}>Continue</button>
          <button onClick={handlePrev}>&lt;</button>
          <button onClick={handleNext}>&gt;</button>
        </motion.div>
      </header>

      {/* Секції для скролу */}
      <section
        id="section1"
        className="page-section"
        data-section-id="1"
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa'
        }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Section 1
        </motion.h2>
      </section>

      <section
        id="section2"
        className="page-section"
        data-section-id="2"
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0'
        }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Section 2
        </motion.h2>
      </section>

      <section
        id="section3"
        className="page-section"
        data-section-id="3"
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#eaeaea'
        }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Section 3
        </motion.h2>
      </section>

      <footer className="landing-footer">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          &copy; 2025 NO.THING.PROJECT. All rights reserved.
        </motion.div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
