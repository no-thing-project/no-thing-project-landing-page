import React from "react";
import { motion } from "framer-motion";
import "./FancyButton.css";

function FancyButton() {
  return (
    <motion.a
      href="https://www.paypal.com/donate/?hosted_button_id=FFPAVCYLTSZV6"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className="fancy-button">
        Contribute <span>→</span>
      </button>
    </motion.a>
  );
}

export default FancyButton;
