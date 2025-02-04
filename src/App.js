// src/App.js
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import LandingPage from "./components/LandingPage/LandingPage";
import CustomCursor from "./components/CustomCursor/CustomCursor";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <div className="App">
      <CustomCursor size={12} />
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      </AnimatePresence>
      {!showSplash && <LandingPage />}
    </div>
  );
}

export default App;