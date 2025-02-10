// FooterSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";

const FooterSection = () => {
  return (
    <footer className="landing-footer inverting-text">
      <motion.div
        className="footer-content"
        {...fadeInAnimation({ delay: 0.2 })}
      >
        <p>
          &copy; 2025 <span className="brand">no.thing.project</span>
        </p>
        <p className="rights">ALL RIGHTS RESERVED</p>
        <p className="footer-links">
          <a href="/privacy-policy" className="footer-link">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms-of-use" className="footer-link">
            Terms of Use
          </a>
        </p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
