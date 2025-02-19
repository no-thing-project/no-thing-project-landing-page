import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../Layouts/Headers";
import Footer from "../Layouts/Footer";
import StoriesSection from "../Sections/StoriesSection";
import ContactSection from "../Sections/ContactSection";
import HeroSection from "../Sections/HeroSection";
import WhatIsSection from "../Sections/WhatIsSection";
import NothingSection from "../Sections/NothingSection";
import InterestingSection from "../Sections/InterestingSection";
import DonationSection from "../Sections/DonationSection";

const Scene3D = React.lazy(() => import("../Scene/Scene3D"));


const LandingPage = ({ hdrTexture, isMobile }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <HelmetProvider>
    <>
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
      </Helmet>

      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />

      <motion.div className="landing-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="background-container">
          <Suspense fallback={<div>Loading 3D scene...</div>}>
            <Scene3D hdrTexture={hdrTexture} />
          </Suspense>
        </div>

        <HeroSection />
        <WhatIsSection />
        <NothingSection />
        <StoriesSection />
        <InterestingSection />
        <DonationSection />
        <ContactSection />

        <Footer />
      </motion.div>
    </>
    </HelmetProvider>
  );
};

export default LandingPage;
