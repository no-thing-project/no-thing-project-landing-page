import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <footer className="section-footer">
      <div className="container-footer glass-overlay">
        <nav className="footer-links">
          <span className="footer-link" onClick={() => navigate("/privacy-policy")}>
            {t("footer.privacyPolicy")}
          </span>
          <span className="footer-link" onClick={() => navigate("/terms-of-use")}>
            {t("footer.termsConditions")}
          </span>
        </nav>
        <p className="footer-brand-text">{t("footer.brand")}</p>
        <p>
          &copy; {new Date().getFullYear()} <span className="footer-rights-text">{t("footer.allRightsReserved")}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;