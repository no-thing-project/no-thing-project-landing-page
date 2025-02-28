import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FooterSection = ({ lang }) => {
  return (
    <footer className="landing-footer inverting-text">
      <motion.div
        className="footer-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="footer-links">
          <Link to="/privacy-policy" className="footer-link">
            {lang("footer.privacyPolicy")}
          </Link>{" "}
          ●{" "}
          <Link to="/terms-of-use" className="footer-link">
            {lang("footer.termsConditions")}
          </Link>
        </p>
        <p><span className="brand">{lang("footer.brand")}</span></p>
        <p>
          Copyright &copy; {new Date().getFullYear()} {lang("footer.allRightsReserved")}
        </p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
