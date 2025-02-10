import React from "react";
import { storiesData } from "../../data/stories";

const StoriesSection = () => {
  return (
    <section id="section4" className="page-section section4" data-section-id="4">
      <div className="section-wrapper">
        <div className="stories-container inverting-text">
          {storiesData.map((story, index) => (
            <div className="story" key={index}>
              <div className="story-content">
                <div className="story-photo">
                  <img src={story.img} alt={story.name} />
                </div>
                <div className="story-text">
                  <h3 className="story-name inverting-text">{story.name}</h3>
                  <p className="story-description inverting-text">{story.text}</p>
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