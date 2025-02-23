import React from "react";
import Section from "./Section";
import Title from "../UI/AnimatedTitle";

const fadeInUp = (delay = 0.2) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
  viewport: { once: true },
});

const WhatIsSection = () => {
  return (
    <Section sectionNumber={2} className="section-whatIs" id="section-whatIs">
      <div className="container-main">
        <Title as="h2" className="section-title-text" motionProps={fadeInUp(0.2)}>
          WHAT IS
        </Title>
        <Title as="p" className="section-description-text glass-overlay" motionProps={fadeInUp(0.4)}>
        No.Thing Project is more than just a concept — it is a movement, a philosophy, and a call to action. It is the art of transforming nothing into everything. Built on the principles of minimalism, creativity, and self-belief, No.Thing is a global platform that empowers individuals to start from scratch and build something meaningful.
        </Title>
      </div>
    </Section>
  );
};

export default WhatIsSection;
