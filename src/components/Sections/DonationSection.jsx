

import React, { useRef, useLayoutEffect } from "react";
import { motion, animate } from "framer-motion";
import Section from "./Section";


const DonationSection = () => {
  const interestingRef = useRef(null);

  useLayoutEffect(() => {
    animate("#infinite-scroll", { x: ["100%", "-100%"] }, { ease: "linear", duration: 6, repeat: Infinity, repeatType: "loop" });
  }, []);


  return (
    <section className="section-donation">
      <div className="container-interesting ">
        <motion.div id="infinite-scroll" className="wrapper-interesting">
          <a ref={interestingRef} className="interesting-text">
            INTERESTING?
          </a>
        </motion.div>
      </div>
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