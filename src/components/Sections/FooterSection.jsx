// FooterSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="landing-footer inverting-text">
      <motion.div
        className="footer-content"
        {...fadeInAnimation({ delay: 0.2 })}
      >
        <p className="footer-links">
          <Link to="/privacy-policy" className="footer-link">
            Privacy Policy
          </Link>{" "}
          ●{" "}
          <Link to="/terms-of-use" className="footer-link">
            Terms & Conditions
          </Link>
        </p>
        <p><span className="brand">no.thing.project</span></p>
        <p>
        Copyright &copy; 2025 . All Rights Reserved
        </p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
