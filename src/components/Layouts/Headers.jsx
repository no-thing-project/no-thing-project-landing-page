import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useScrollPosition from "../../hooks/useScrollPosition";
import Navigation from "../UI/Navigation";

const Header = ({ showDebugButtons, showHubButton }) => {
  const isScrolled = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? "hidden" : "auto"; 
      return newState;
    });
  };

  // Закриваємо меню та повертаємо скрол при кліку на лінку
  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleLogoClick = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (menuOpen) {
      closeMenu();
    }
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <motion.div
        className={`logo-container ${menuOpen || isScrolled }`}
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      >
        <span className="logo-text">
          no.thing<br />
          <span className="logo-sub">project</span>
        </span>
      </motion.div>

      <div className="menu-container">
        <Navigation menuOpen={menuOpen} toggleMenu={closeMenu} />
        <div className={`menu-toggle ${isScrolled ? "scrolled" : ""}`}>
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
          <motion.div className="header-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <button>Stop</button>
            <button>Continue</button>
            <button>&lt;</button>
            <button>&gt;</button>
          </motion.div>
        )}
        {showHubButton && (
          <motion.div className="header-hub-button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <a href="https://external-resource.com" target="_blank" rel="noopener noreferrer">
              no.thing | HUB
            </a>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
