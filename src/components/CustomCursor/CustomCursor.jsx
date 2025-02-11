// CustomCursor.js
import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import "./CustomCursor.css";

const CustomCursor = ({ size = 8 }) => {
  const motionX = useMotionValue(-100);
  const motionY = useMotionValue(-100);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      motionX.set(Math.round(e.clientX));
      motionY.set(Math.round(e.clientY));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [motionX, motionY]);

  useEffect(() => {
    const handleHover = (e) => {
      const isInteractive = e.target.closest("a, button, img");
      setHoveringInteractive(!!isInteractive);
    };

    document.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseout", handleHover);
    return () => {
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mouseout", handleHover);
    };
  }, []);

  return (
    <motion.svg
      className="custom-cursor"
      style={{
        x: motionX,
        y: motionY,
        width: size,
        height: size,
      }}
      animate={{ scale: hoveringInteractive ? 3 : 1 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
    >
      <circle cx="50%" cy="50%" r="50%" fill="white" shapeRendering="geometricPrecision" />
    </motion.svg>
  );
};

export default CustomCursor;
