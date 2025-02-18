import React from "react";
import { motion } from "framer-motion";

const fadeInUp = (delay = 0.8) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
  viewport: { once: true },
});

const Footer = () => {
  return (
    <footer className="landing-footer glass-overlay">
      <motion.div className="footer-content" {...fadeInUp(0.8)}>
        <p>
          &copy; {new Date().getFullYear()} <span className="brand">no.thing.project</span>
        </p>
        <p className="rights">ALL.RIGHTS.RESERVED</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
