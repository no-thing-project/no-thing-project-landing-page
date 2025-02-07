// App.js
import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "./components/SplashScreen/CodeSplashScreen";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const LandingPage = lazy(() => import("./components/LandingPage/LandingPage"));

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hdrTexture, setHdrTexture] = useState(null);

  // Асинхронно завантажуємо HDR карту
  useEffect(() => {
    async function loadHDR() {
      const loader = new RGBELoader();
      loader.setPath('hdr_maps/');
      try {
        const texture = await loader.loadAsync('poly_haven_studio_1k.hdr');
        setHdrTexture(texture);
      } catch (error) {
        console.error("Error loading HDR texture:", error);
      }
    }
    loadHDR();
  }, []);

  return (
    <div className="App">
      <CustomCursor size={12} />
      <AnimatePresence exitBeforeEnter>
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <SplashScreen onFinish={() => setShowSplash(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
          >
            <Suspense fallback={null}>
              {/* Передаємо завантажену HDR карту як пропс */}
              <LandingPage hdrTexture={hdrTexture} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
