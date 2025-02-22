import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="section-footer">
      <div className="container-footer glass-overlay">
        <nav className="footer-links">
          <span className="footer-link" onClick={() => navigate("/privacy-policy")}>Privacy Policy</span>
          <span className="footer-link" onClick={() => navigate("/terms-of-use")}>Terms of Use</span>
        </nav>
        <p className="footer-brand-text"> no.thing.project</p>
        <p>
          &copy; {new Date().getFullYear()} <span className="footer-rights-text">ALL.RIGHTS.RESERVED</span>
        </p>

      </div>
    </footer>
  );
};

export default Footer;
