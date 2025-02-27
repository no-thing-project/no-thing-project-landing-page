import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FooterSection = () => {
  const { t } = useTranslation();

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
            {t("footer.privacyPolicy")}
          </Link>{" "}
          ●{" "}
          <Link to="/terms-of-use" className="footer-link">
            {t("footer.termsConditions")}
          </Link>
        </p>
        <p><span className="brand">{t("footer.brand")}</span></p>
        <p>
          Copyright &copy; {new Date().getFullYear()} {t("footer.allRightsReserved")}
        </p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
