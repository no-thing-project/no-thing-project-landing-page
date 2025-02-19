import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../components/Layouts/Headers";
import Footer from "../components/Layouts/Footer";
import TermsOfUse from "../components/Sections/TermsOfUse";

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

      <motion.div className="landing-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="background-container">
          <Suspense fallback={<div>Loading 3D scene...</div>}>
            <Scene3D hdrTexture={hdrTexture} />
          </Suspense>
        </div>

        <TermsOfUse></TermsOfUse>

        <Footer />
      </motion.div>
    </>
    </HelmetProvider>
  );
};

export default LandingPage;
