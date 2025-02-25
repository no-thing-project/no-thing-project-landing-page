import React, { useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

const SupportSection = () => {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current || !buttonRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      // Якщо курсор поза межами секції, знімаємо нахил
      if (
        e.clientX < sectionRect.left ||
        e.clientX > sectionRect.right ||
        e.clientY < sectionRect.top ||
        e.clientY > sectionRect.bottom
      ) {
        tiltX.set(0);
        tiltY.set(0);
        return;
      }
      // Якщо курсор всередині секції – обчислюємо нахил кнопки
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxTilt = 5; // максимальний кут нахилу
      const newTiltX = ((centerY - y) / centerY) * maxTilt;
      const newTiltY = ((x - centerX) / centerX) * maxTilt;
      tiltX.set(newTiltX);
      tiltY.set(newTiltY);
    };

    const handleMouseLeave = () => {
      tiltX.set(0);
      tiltY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [tiltX, tiltY]);

  return (
    <section id="support" className="support-section" ref={sectionRef}>
      <motion.button
        ref={buttonRef}
        className="support-button"
        style={{
          perspective: 1000,
          rotateX: tiltX,
          rotateY: tiltY,
        }}
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        Join the movement
      </motion.button>
    </section>
  );
};

export default SupportSection;
