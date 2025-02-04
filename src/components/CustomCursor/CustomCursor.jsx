import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import "./CustomCursor.css";

const CustomCursor = ({ size = 8 }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hoveringLink, setHoveringLink] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Округлюємо координати для чіткого позиціонування
      const x = Math.round(e.clientX);
      const y = Math.round(e.clientY);
      cursorX.set(x);
      cursorY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const handleHover = (e) => {
      const isLink = !!e.target.closest("a");
      setHoveringLink(isLink);
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
        x: cursorX,
        y: cursorY,
        width: size,
        height: size,
      }}
      animate={{
        scale: hoveringLink ? 3 : 1,
      }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
      }}
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