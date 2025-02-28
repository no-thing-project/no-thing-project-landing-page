import React from "react";
import { motion, useMotionValue } from "framer-motion";
import { Helmet } from "react-helmet";
import HeaderSection from "../components/Sections/HeaderSection";
import FooterSection from "../components/Sections/FooterSection";
import "../index.css";
import { useTranslation } from "react-i18next";

const TermsOfUse = () => {
  const logoOpacity = useMotionValue(1);
  const logoY = useMotionValue(0);
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Terms of Use - no.thing.project</title>
        <meta name="description" content="Terms of Use of no.thing.project" />
      </Helmet>
      <motion.div
        className="landing-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeaderSection
          lang={t}
          scrollToSection={() => {}}
          logoOpacity={logoOpacity}
          logoY={logoY}
          isMobile={false}
          showDebugButtons={false}
          showHubButton={false}
          showDonateButton={false}
        />

        {/* Основний контент сторінки */}
        <div className="section-wrapper">
          <div className="terms-of-use-content">
            <h2>Terms and Conditions</h2>
            <h3>1. General Terms</h3>
            <p>
              Welcome to <strong>No.Thing Project</strong> – a global movement
              that transforms simplicity, minimalism, and "nothing" into a
              powerful catalyst for change. By supporting our initiative through
              voluntary donations, you agree to these terms. If you do not
              agree, please refrain from making a contribution.
            </p>

            <h3>2. No Sales, Only Voluntary Donations</h3>
            <p>
              No.Thing Project does not sell products or services. Our
              initiative is fully supported by voluntary donations from
              individuals who believe in our mission.
            </p>
            <ul>
              <li>
                All contributions are made voluntarily and without any
                expectation of goods, services, or financial returns.
              </li>
              <li>
                Donations are used exclusively for the development, expansion,
                and sustainability of No.Thing Project, including content
                creation, community programs, and operational costs.
              </li>
              <li>
                We provide full transparency on how funds are allocated, with
                regular financial reports available on our website.
              </li>
            </ul>

            <h3>3. Donation Processing</h3>
            <p>
              All donations are securely processed through trusted third-party
              payment providers to ensure safety and transparency.
            </p>
            <ul>
              <li>
                Accepted payment methods: credit/debit cards, PayPal, and bank
                transfers.
              </li>
              <li>
                Donors receive an electronic receipt confirming their
                contribution.
              </li>
              <li>
                All donations are recorded and managed according to
                international financial transparency standards.
              </li>
            </ul>

            <h3>5. Allocation of Donations</h3>
            <p>
              All funds received are used to sustain and develop No.Thing
              Project. Allocation is structured as follows:
            </p>
            <ul>
              <li>
                <strong>Content Creation & Media:</strong> Production of videos,
                educational materials, and global outreach efforts.
              </li>
              <li>
                <strong>Community Growth & Engagement:</strong> Support for
                initiatives such as workshops, online discussions, and physical
                meetups.
              </li>
              <li>
                <strong>Operational Costs:</strong> Website maintenance,
                administrative expenses, and project management.
              </li>
              <li>
                <strong>Social Impact Initiatives:</strong> Support for creative
                individuals, educational programs, and projects promoting global
                awareness.
              </li>
            </ul>

            <h3>6. Transparency & Financial Accountability</h3>
            <p>
              No.Thing Project is committed to financial transparency and
              accountability. We provide periodic reports detailing:
            </p>
            <ul>
              <li>Total donations received.</li>
              <li>How funds were allocated and utilized.</li>
              <li>Future project budgets and funding goals.</li>
            </ul>
            <p>
              Donors can access financial statements on our website or request
              detailed reports by contacting us.
            </p>

            <h3>7. Community Guidelines</h3>
            <ul>
              <li>
                By engaging with No.Thing Project, donors and community members
                agree to uphold a respectful and inclusive environment.
              </li>
              <li>
                Hate speech, discrimination, or any form of harassment will not
                be tolerated.
              </li>
              <li>
                We reserve the right to remove any content or restrict
                participation of individuals violating these guidelines.
              </li>
            </ul>

            <h3>8. Limitation of Liability</h3>
            <p>
              No.Thing Project is not liable for any indirect, incidental, or
              consequential damages resulting from engagement with our platform.
              Donations are made at the sole discretion of the contributor.
            </p>

            <h3>9. Amendments to Terms</h3>
            <p>
              No.Thing Project reserves the right to update these terms at any
              time. Changes will be communicated through our official website
              and other channels.
            </p>

            <h3>10. Contact Information</h3>
            <p>
              For any questions regarding donations, refunds, or financial
              reports, please contact us:
            </p>
            <ul>
              <li>
                <strong>Organization:</strong> No.Thing Project
              </li>
              <li>
                <strong>Tax ID:</strong> 3565700550
              </li>
              <li>
                <strong>Registered Address:</strong> 1111B S Governors Ave STE
                26941 Dover, DE 19904
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@nothingproject.io">
                  support@nothingproject.io
                </a>
              </li>
            </ul>

            <p>
              By making a donation, you acknowledge that you have read and
              understood these terms and conditions.
            </p>
          </div>
        </div>

        <FooterSection lang={t} />
      </motion.div>
    </>
  );
};

export default TermsOfUse;
