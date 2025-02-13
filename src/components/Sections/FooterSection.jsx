// FooterSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";

const FooterSection = () => {
  return (
    <footer className="landing-footer">
      <motion.div
        className="footer-content"
        {...fadeInAnimation({ delay: 0.2 })}
      >
        <p>
          &copy; 2025 <span className="brand">no.thing.project</span>
        </p>
        <p className="rights">ALL.RIGHTS.RESERVED</p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
