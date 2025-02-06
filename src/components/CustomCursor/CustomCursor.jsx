import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./CustomCursor.css";

const CustomCursor = ({ size = 8 }) => {
  // Початкові значення для позиціонування
  const motionX = useMotionValue(-100);
  const motionY = useMotionValue(-100);

  // Стан для перевірки наведення на інтерактивні елементи (лінки або кнопки)
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = Math.round(e.clientX);
      const y = Math.round(e.clientY);
      motionX.set(x);
      motionY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [motionX, motionY]);

  useEffect(() => {
    const handleHover = (e) => {
      // Перевірка, чи є найближчий елемент a або button
      const isInteractive = e.target.closest("a, button");
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
      animate={{
        scale: hoveringInteractive ? 3 : 1,
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
