import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";
import FancyButton from "../Buttons/FancyButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

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
      window.scrollY === 0 && isHomePage
        ? logoOpacity.set(0)
        : logoOpacity.set(1);
      logoY.set(0);
    }
  }, [isMenuOpen, isHomePage, logoOpacity, logoY]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (!isHomePage) {
      navigate("/");
    } else {
      scrollToSection("section1");
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
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
          {t("header.logoMain")}
          <br />
          <span className="logo-sub">{t("header.logoSub")}</span>
        </h1>
      </motion.a>

      {isHomePage && (
        <>
          {isMobile ? (
            <>
              <div className="header-right">
                {isMenuOpen && (
                  <div className="language-switcher">
                    <select
                      value={i18n.language}
                      onChange={(e) => {
                        changeLanguage(e.target.value);
                        setIsMenuOpen(false);
                      }}
                    >
                      <option value="uk">UA</option>
                      <option value="en">EN</option>
                    </select>
                  </div>
                )}
                <button className="hamburger" onClick={toggleMenu}>
                  {isMenuOpen ? "CLOSE" : "MENU"}
                </button>
              </div>
              <nav className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
                <div className="mobile-nav-footer">
                  <FancyButton />
                </div>
                <ul>
                  <li><a href="#section2" onClick={() => handleNavClick("section2")}>{t("nav.about")}</a></li>
                  <li><a href="#section3" onClick={() => handleNavClick("section3")}>{t("nav.nothing")}</a></li>
                  <li><a href="#section4" onClick={() => handleNavClick("section4")}>{t("nav.stories")}</a></li>
                  <li><a href="#support" onClick={() => handleNavClick("support")}>{t("nav.join")}</a></li>
                  <li><a href="#section6" onClick={() => handleNavClick("section6")}>{t("nav.connect")}</a></li>
                </ul>
              </nav>
            </>
          ) : (
            <nav className="landing-nav">
              <ul>
                <li><a href="#section2" onClick={(e) => {e.preventDefault(); scrollToSection("section2");}}>{t("nav.about")}</a></li>
                <li><a href="#section3" onClick={(e) => {e.preventDefault(); scrollToSection("section3");}}>{t("nav.nothing")}</a></li>
                <li><a href="#section4" onClick={(e) => {e.preventDefault(); scrollToSection("section4");}}>{t("nav.stories")}</a></li>
                <li><a href="#support" onClick={(e) => {e.preventDefault(); scrollToSection("support");}}>{t("nav.join")}</a></li>
                <li><a href="#section6" onClick={(e) => {e.preventDefault(); scrollToSection("section6");}}>{t("nav.connect")}</a></li>
              </ul>
            </nav>
          )}
        </>
      )}

      {!isMobile && (
        <div className="header-right">
          <div className="language-switcher">
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="uk">UA</option>
            </select>
          </div>

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
        </div>
      )}
    </header>
  );
};

export default HeaderSection;
