import React from "react";
import { motion } from "framer-motion";


const DonationSection = () => {
  return (
    <section className="donation-section">
      <div className="donation-section-container glass-overlay">
        <h2 className="donation-title-text">Support Our Mission</h2>
        <p className="donation-description-text">
          Your contribution helps us continue our work and make a difference.
        </p>
        <div className="donation-button-section">
        <motion.a
          href="https://www.paypal.com/donate/?hosted_button_id=FFPAVCYLTSZV6"
          target="_blank"
          rel="noopener noreferrer"
          className="donation-section-button"
        >Donate Now
        </motion.a>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;