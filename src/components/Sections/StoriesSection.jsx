import React from "react";
import { motion } from "framer-motion";
import { storiesData } from "../../data/stories";
import AnimatedTitle from "../UI/AnimatedTitle";
import Section from "./Section";

const fadeInUp = (delay = 0.2) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
  viewport: { once: true },
});

const StoriesSection = () => {
  return (
    <Section sectionNumber={4} className="section-stories" id="section4">
      <div className="stories-container glass-overlay">
        <AnimatedTitle as="h2" className="section-title-text" delay={0.2}>
          FOR YOU
        </AnimatedTitle>
        {storiesData.map((story, i) => (
          <motion.div key={i} {...fadeInUp(0.2 + i * 0.2)}>
            <div className="story glass-overlay">
              <div className="story-content">
                <div className="story-photo">
                  <img src={story.img} alt={story.name} />
                </div>
                <div className="story-text">
                  <h3 className="story-title-text">{story.name}</h3>
                  <p className="story-description-text">{story.text}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default StoriesSection;
