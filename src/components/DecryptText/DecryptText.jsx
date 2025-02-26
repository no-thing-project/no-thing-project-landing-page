// DecryptText.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const randomChar = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

const encryptText = (text) => {
  return text
    .split("")
    .map((char) => (char === " " ? " " : randomChar()))
    .join("");
};

const DecryptText = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState(encryptText(text));
  const [iteration, setIteration] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText((prev) => {
          let newText = "";
          for (let i = 0; i < text.length; i++) {
            if (i < iteration) {
              newText += text[i];
            } else {
              newText += text[i] === " " ? " " : randomChar();
            }
          }
          return newText;
        });
        setIteration((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, 200);

    return () => clearTimeout(timeout);
  }, [isInView, iteration, text, speed]);

  return (
    <motion.span ref={ref} style={{ display: "inline-block", verticalAlign: "middle" }}>
      {displayText}
    </motion.span>
  );
};

export default DecryptText;
