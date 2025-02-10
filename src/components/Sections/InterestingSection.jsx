// InterestingSection.jsx
import React, { useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue, AnimatePresence } from "framer-motion";

const InterestingSection = ({ calcTextWidth, interestingRef }) => {
  const controls = useAnimation();
  const x = useMotionValue(-calcTextWidth);

  const speed = calcTextWidth / 20;

  const startAutoAnimation = (fromX = x.get()) => {
    const remainingDistance = Math.abs(-calcTextWidth - fromX);
    const remainingDuration = remainingDistance / speed;
    controls.start({
      x: -calcTextWidth,
      transition: {
        duration: remainingDuration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  useEffect(() => {
    startAutoAnimation();
  }, [calcTextWidth]);

  const handleDragStart = () => {
    controls.stop();
  };

  const handleDragEnd = (event, info) => {
    startAutoAnimation(x.get());
  };

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  return (
    <section
      id="section5"
      className="page-section section5 inverting-text"
      data-section-id="5"
    >
      <div className="section-wrapper-full">
        <div className="interesting-container">
          <motion.div
            className="interesting-wrapper"
            drag="x"
            dragConstraints={{ left: -calcTextWidth, right: 0 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ x }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onMouseMove={(e) =>
              setTooltipPos({ x: e.clientX + 20, y: e.clientY + 10 })
            }
          >
            <span
              ref={interestingRef}
              className="interesting-text"
              data-text="INTERESTING?"
            >
              INTERESTING?
            </span>
          </motion.div>
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="drag-tooltip"
                style={{
                  position: "fixed",
                  left: tooltipPos.x,
                  top: tooltipPos.y,
                  pointerEvents: "none",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Swipe
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default InterestingSection;