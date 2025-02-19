import React from "react";
import { motion } from "framer-motion";


const DonationSection = () => {
  return (
    <section className="section-donation">
      <div className="container-donation">
        <div className="donation-button-section">
        <motion.a
          href="https://www.paypal.com/donate/?hosted_button_id=FFPAVCYLTSZV6"
          target="_blank"
          rel="noopener noreferrer"
          className="button-donation-section"
        >Support Our Mission
        </motion.a>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;