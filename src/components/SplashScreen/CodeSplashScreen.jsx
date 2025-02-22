import React, { useEffect, useRef } from "react";
import "./SplashScreen.css";

const SplashScreen = ({ onFinish }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // Запасний таймер на випадок, якщо відео не грає

    const handleVideoEnd = () => {
      clearTimeout(timer); // Очистити таймер, якщо відео закінчилося
      onFinish();
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      clearTimeout(timer);
      if (videoRef.current) {
        videoRef.current.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [onFinish]);

  return (
    <div className="splash-container">
      <video
        ref={videoRef}
        className="splash-video"
        autoPlay
        muted
        playsInline
      >
        <source src="assets/animations/splash_animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SplashScreen;
