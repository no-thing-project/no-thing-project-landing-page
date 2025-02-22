import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import SplashScreenContainer from "./containers/SplashScreenContainer";
import LandingPageContainer from "./containers/LandingPageContainer";
import config from "./config";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUsePage"));

const App = () => {
  const [showSplash, setShowSplash] = useState(true); // temporary disable
  const [hdrTexture, setHdrTexture] = useState(null);
  const [hdrError, setHdrError] = useState(false);
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const loadHDR = async () => {
      try {
        const texture = await new RGBELoader().loadAsync(
          `${config.PUBLIC_URL}/hdr_maps/poly_haven_studio_1k.hdr`
        );
        setHdrTexture(texture);
      } catch (error) {
        console.error("Error loading HDR texture:", error);
        setHdrError(true);
      }
    };
    loadHDR();
  }, []);

  return (
    <Router>
      <div className="App">
        {!isMobile && <CustomCursor size={12} />}
        <AnimatePresence mode="wait">
          {showSplash ? (
            <SplashScreenContainer onFinish={() => setShowSplash(false)} />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <LandingPageContainer
                    hdrTexture={hdrTexture}
                    hdrError={hdrError}
                    isMobile={isMobile}
                    key="home"
                  />
                }
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy key="privacy" />} />
              <Route path="/terms-of-use" element={<TermsOfUse key="terms" />} />
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
