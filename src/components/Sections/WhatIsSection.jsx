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
    <Section sectionNumber={2} className="section2" id="section2">
      <div className="section-content glass-overlay">
        <Title as="h2" className="section-title-text" motionProps={fadeInUp(0.2)}>
          WHAT IS
        </Title>
        <Title as="p" className="section-description-text" motionProps={fadeInUp(0.4)}>
          No.Thing Project is a movement, a mindset, and a platform for transformation
        </Title>
        <Title as="p" className="section-description-text" motionProps={fadeInUp(0.6)}>
          It is the idea that nothing is not emptiness but a starting point—a space where creativity, innovation, and change can emerge.
        </Title>
        <Title as="p" className="section-description-text" motionProps={fadeInUp(0.6)}>
          We embrace minimalism as a tool for clarity and inspiration, proving that even from nothing, something extraordinary can be built.
        </Title>
      </div>
    </Section>
  );
};

export default WhatIsSection;
