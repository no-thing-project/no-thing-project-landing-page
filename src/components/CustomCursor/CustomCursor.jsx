// CustomCursor.js
import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import "./CustomCursor.css";

const CustomCursor = ({ size = 8 }) => {
  const motionX = useMotionValue(-100);
  const motionY = useMotionValue(-100);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      // Використання requestAnimationFrame для оптимізації частоти оновлень
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        motionX.set(e.clientX);
        motionY.set(e.clientY);
        const isInteractive = e.target.closest("a, button, img");
        setHoveringInteractive(!!isInteractive);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [motionX, motionY]);

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
      <circle
        cx="50%"
        cy="50%"
        r="50%"
        fill="white"
        shapeRendering="geometricPrecision"
      />
    </motion.svg>
  );
};

export default CustomCursor;
