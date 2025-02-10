// HintBadge.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HintBadge = () => {
  const [visible, setVisible] = useState(false);

  // Затримка появи на 1 секунду
  useEffect(() => {
    const timerShow = setTimeout(() => {
      setVisible(true);
    }, 2000);
    return () => clearTimeout(timerShow);
  }, []);

  // Приховування через 8 секунд після появи
  useEffect(() => {
    if (visible) {
      const timerHide = setTimeout(() => {
        setVisible(false);
      }, 8000);
      return () => clearTimeout(timerHide);
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            top: "90%",
            right: "0%",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "20px",
            fontSize: "1rem",
            zIndex: 1001,
            pointerEvents: "none"
          }}
        >
          Press and hold to create Everything!
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HintBadge;
