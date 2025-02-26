import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";
import FancyButton from "../Buttons/FancyButton";
import { useLocation, useNavigate } from "react-router-dom";

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
  showDonateButton,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Перемикання стану меню
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Закриття меню після вибору пункту навігації
  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  // Закриття меню при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest(".mobile-nav") &&
        !event.target.closest(".hamburger")
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
      logoOpacity.set(1);
      logoY.set(0);
    } else {
      document.body.classList.remove("menu-open");
      window.scrollY === 0 && isHomePage ? logoOpacity.set(0) : logoOpacity.set(1);
      logoY.set(0);
    }
  }, [isMenuOpen, isHomePage, logoOpacity, logoY]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    // Якщо не на головній сторінці, переходимо на головну
    if (!isHomePage) {
      navigate("/");
    } else {
      scrollToSection("section1");
    }
  };

  return (
    <header className={`landing-header ${isMenuOpen ? "menu-open" : ""}`}>
      <motion.a
        className="logo"
        href="#section1"
        onClick={handleLogoClick}
        style={{ opacity: logoOpacity, y: logoY }}
      >
        <h1 className="logo-text">
          no.thing
          <br />
          <span className="logo-sub">project</span>
        </h1>
      </motion.a>

      {/* Показуємо навігацію тільки на головній сторінці */}
      {isHomePage && (
        <>
          {isMobile ? (
            <>
              <button className="hamburger" onClick={toggleMenu}>
                {isMenuOpen ? "CLOSE" : "MENU"}
              </button>
              <nav className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
                <div className="mobile-nav-footer">
                  <FancyButton />
                </div>
                <ul>
                  <li>
                    <a href="#section2" onClick={() => handleNavClick("section2")}>
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#section3" onClick={() => handleNavClick("section3")}>
                      Nothing
                    </a>
                  </li>
                  <li>
                    <a href="#section4" onClick={() => handleNavClick("section4")}>
                      Stories
                    </a>
                  </li>
                  <li>
                    <a href="#support" onClick={() => handleNavClick("support")}>
                      Join the movement
                    </a>
                  </li>
                  <li>
                    <a href="#section6" onClick={() => handleNavClick("section6")}>
                      Connect
                    </a>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
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
                    Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#support"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("support");
                    }}
                  >
                    Join the movement
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
                    Connect
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}

      <div className="header-buttons-wrapper">
        {showDebugButtons && (
          <motion.div
            className="header-buttons"
            {...fadeInAnimation({ opacityY: -50, duration: 0.7 })}
          >
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleContinue}>Continue</button>
            <button onClick={handlePrev}>{"<"}</button>
            <button onClick={handleNext}>{">"}</button>
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
