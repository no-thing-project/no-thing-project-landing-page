import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import AnimatedTitle from "../UI/AnimatedTitle";

const fadeInUp = (delay = 0.2) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
  viewport: { once: true },
});

const ContactSection = () => {
  return (
    <Section sectionNumber={6} className="contacts-section" id="contacts-section">
      <div className="section-content">
        <AnimatedTitle as="h2" className="contacts-title-text" motionProps={fadeInUp(0.2)}>
          CONTACT US
        </AnimatedTitle>
        <div className="contacts-container">
          <div className="contacts glass-overlay">
            <motion.p {...fadeInUp(0.3)}>
              <a href="mailto:someone@nothingproject.io">
                someone@nothingproject.io
              </a>
            </motion.p>
            <motion.p {...fadeInUp(0.4)}>
              <a href="mailto:noone@nothingproject.io">
                noone@nothingproject.io
              </a>
            </motion.p>
            <div className="social-icons">
              {[
                { href: "https://t.me/no_thing_project", icon: "fab fa-telegram" },
                { href: "https://www.instagram.com/no.thing.project", icon: "fab fa-instagram" },
                { href: "https://x.com/nooneonnothing", icon: "fab fa-x-twitter" },
                { href: "https://www.linkedin.com/company/no-thing-project", icon: "fab fa-linkedin" },
                { href: "https://www.behance.net/nothingproject", icon: "fab fa-behance" },
              ].map(({ href, icon }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.1, color: "#7f44ff" }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <i className={icon}></i>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;
