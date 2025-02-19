import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../components/Layouts/Headers";
import Footer from "../components/Layouts/Footer";
import StoriesSection from "../components/Sections/StoriesSection";
import ContactSection from "../components/Sections/ContactSection";
import HeroSection from "../components/Sections/HeroSection";
import WhatIsSection from "../components/Sections/WhatIsSection";
import NothingSection from "../components/Sections/NothingSection";
import DonationSection from "../components/Sections/DonationSection";

const Scene3D = React.lazy(() => import("../components/Scene/Scene3D"));


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

      <motion.div className="main-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="background-container">
          <Suspense fallback={<div>Loading 3D scene...</div>}>
            <Scene3D hdrTexture={hdrTexture} />
          </Suspense>
        </div>

        <HeroSection />
        <WhatIsSection />
        <NothingSection />
        <StoriesSection />
        <DonationSection />
        <ContactSection />

        <Footer />
      </motion.div>
    </>
    </HelmetProvider>
  );
};

export default LandingPage;
