import React, { useState, Suspense, lazy, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "./components/SplashScreen/CodeSplashScreen";
import CustomCursor from "./components/CustomCursor/CustomCursor";

// Динамічне завантаження LandingPage
const LandingPage = lazy(() => import("./components/LandingPage/LandingPage"));

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Опціонально: можна додати попереднє завантаження даних/ресурсів тут
  useEffect(() => {
    // preloadData().then(...);
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
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: 0.2
            }}
          >
            <Suspense fallback={null}>
              <LandingPage />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
