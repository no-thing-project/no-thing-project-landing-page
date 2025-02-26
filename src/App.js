// App.js
import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "./components/SplashScreen/CodeSplashScreen";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUsePage"));

  // Завантаження HDR текстури
  // useEffect(() => {
  //   async function loadHDR() {
  //     const loader = new RGBELoader();
  //     loader.setPath("hdr_maps/");
  //     try {
  //       const texture = await loader.loadAsync("poly_haven_studio_1k.hdr");
  //       setHdrTexture(texture);
  //     } catch (error) {
  //       console.error("Error loading HDR texture:", error);
  //     }
  //   }
  //   loadHDR();
  // }, []);

// Компонент для маршрутизації із анімацією
const AppRoutes = ({ isMobile, showDebugButtons, showHubButton, showDonateButton }) => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                key="landing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
              >
                <LandingPage
                  showDebugButtons={showDebugButtons}
                  showHubButton={showHubButton}
                  showDonateButton={showDonateButton}
                  isMobile={isMobile}
                />
              </motion.div>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <motion.div
                key="privacy"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <PrivacyPolicy />
              </motion.div>
            }
          />
          <Route
            path="/terms-of-use"
            element={
              <motion.div
                key="terms"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <TermsOfUse />
              </motion.div>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        {/* Рендеримо кастомний курсор лише для десктопу */}
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
            <AppRoutes
              isMobile={isMobile}
              showDebugButtons={false}
              showHubButton={false}
              showDonateButton={true}
            />
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
};

export default App;