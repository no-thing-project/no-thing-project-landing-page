import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { BrowserRouter } from "react-router-dom";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import SplashScreenContainer from "./containers/SplashScreenContainer.jsx";
import LandingPageContainer from "./containers/LandingPageContainer.jsx";
import config from "./config"; // Імпортуємо конфіг

// Динамічне завантаження LandingPage
const LandingPage = lazy(() => import("./components/LandingPage/LandingPage.jsx"));

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hdrTexture, setHdrTexture] = useState(null);
  const [hdrError, setHdrError] = useState(false);
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const loadHDR = async () => {
      try {
        const texture = await new RGBELoader().loadAsync(`${config.PUBLIC_URL}/hdr_maps/poly_haven_studio_1k.hdr`);
        setHdrTexture(texture);
      } catch (error) {
        console.error("Error loading HDR texture:", error);
        setHdrError(true);
      }
    };

    loadHDR();
  }, []);

  return (
    <BrowserRouter basename={config.PUBLIC_URL}>
      <div className="App">
        {!isMobile && <CustomCursor size={12} />}
        <AnimatePresence mode="wait">
          {showSplash ? (
            <SplashScreenContainer onFinish={() => setShowSplash(false)} />
          ) : (
            <LandingPageContainer hdrTexture={hdrTexture} hdrError={hdrError} isMobile={isMobile} />
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
};

export default App;
