import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "./components/SplashScreen/CodeSplashScreen";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { BrowserRouter } from "react-router-dom";

const LandingPage = lazy(() => import("./components/LandingPage/LandingPage"));

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hdrTexture, setHdrTexture] = useState(null);
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const loadHDR = async () => {
      try {
        const texture = await new RGBELoader().setPath("hdr_maps/").loadAsync("poly_haven_studio_1k.hdr");
        setHdrTexture(texture);
      } catch (error) {
        console.error("Error loading HDR texture:", error);
      }
    };
    loadHDR();
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        {!isMobile && <CustomCursor size={12} />}
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
                <LandingPage hdrTexture={hdrTexture} showDebugButtons={false} showHubButton={false} isMobile={isMobile} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
};

export default App;
