// SplashScreen.js
import React, { useEffect } from "react";
import "./CodeSplashScreen.css";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container">
      <video className="splash-video" autoPlay muted playsInline>
        <source src="assets/animations/nothingTypeAnimation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SplashScreen;