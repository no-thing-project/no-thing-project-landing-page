import React from "react";
import { motion } from "framer-motion";
import "./FancyButton.css";

function FancyButton() {
  return (
    <motion.a
      href="https://secure.wayforpay.com/donate/NoThingProject"
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
