// ConnectSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../utils/fadeInAnimation";

const ConnectSection = () => {
  return (
    <section id="section6" className="page-section section6" data-section-id="6">
      <div className="section-wrapper left-align">
        <div className="second-screen-content">
          <motion.h1
            className="second-screen-title"
            {...fadeInAnimation({ delay: 0.2 })}
          >
            CONNECT
          </motion.h1>
          <div className="contacts">
            <p>
              <a href="mailto:someone@nothingproject.io">someone@nothingproject.io</a>
            </p>
            <p>
              <a href="mailto:noone@nothingproject.io">noone@nothingproject.io</a>
            </p>
            <div className="social-icons">
              <motion.a
                href="https://t.me/no_thing_project"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ scale: 1, color: "#7f44ff" }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
              >
                <i className="fab fa-telegram"></i>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/no.thing.project"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ scale: 1, color: "#7f44ff" }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
              >
                <i className="fab fa-instagram"></i>
              </motion.a>
              <motion.a
                href="https://x.com/nooneonnothing"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ scale: 1, color: "#7f44ff" }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
              >
                <i className="fab fa-x-twitter"></i>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/no-thing-project"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ scale: 1, color: "#7f44ff" }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
              >
                <i className="fab fa-linkedin"></i>
              </motion.a>
              <motion.a
                href="https://www.behance.net/nothingproject"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ scale: 1, color: "#7f44ff" }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
              >
                <i className="fab fa-behance"></i>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
