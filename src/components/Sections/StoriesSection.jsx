// StoriesSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { storiesData } from "../../data/stories";
import { fadeInAnimation } from "../../utils/fadeInAnimation";


const StoriesSection = () => {
  return (
    <section id="section4" className="page-section section4" data-section-id="4">
      <div className="section-wrapper">
        <motion.h1
          className="second-screen-title"
          {...fadeInAnimation({ delay: 0.2 })}
        >
          STORIES
        </motion.h1>
        <div className="stories-container">
          {storiesData.map((story, index) => (
            <div className="story" key={index}>
              <div className="story-content">
                <div className="story-photo">
                  <img src={story.img} alt={story.name} />
                </div>
                <div className="story-text">
                  <h3 className="story-name">{story.name}</h3>
                  <p className="story-description">{story.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
