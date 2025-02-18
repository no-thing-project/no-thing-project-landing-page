import React from "react";
import { motion } from "framer-motion";
import SplashScreen from "../components/SplashScreen/CodeSplashScreen";

const SplashScreenContainer = ({ onFinish }) => (
  <motion.div
    key="splash"
    initial={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
  >
    <SplashScreen onFinish={onFinish} />
  </motion.div>
);

export default SplashScreenContainer;
