import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="landing-footer glass-overlay">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} <span className="brand">no.thing.project</span>
        </p>
        <p className="rights">ALL.RIGHTS.RESERVED</p>
        <nav className="footer-links">
          <span className="footer-link" onClick={() => navigate("/privacy-policy")}>Privacy Policy</span>
          <span className="footer-link" onClick={() => navigate("/terms-of-use")}>Terms of Use</span>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
