import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeInUp = (delay = 0.8) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
  viewport: { once: true },
});

const Footer = () => {
  return (
    <footer className="landing-footer glass-overlay">
      <div className="footer-content">
        <nav className="footer-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
        </nav>
        <p>
          &copy; {new Date().getFullYear()} <span className="brand">no.thing.project</span>
        </p>
        <p className="rights">ALL.RIGHTS.RESERVED</p>
      </div>
    </footer>
  );
};

export default Footer;
