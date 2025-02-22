import React from "react";
import Section from "./Section";

const PrivacyPolicy = () => {
  return (
    <Section id="privacy-policy" className="section-policy">
      <div className="container-policy glass-overlay">
        <h2 className="policy-title-text">Privacy Policy</h2>
        <p className="policy-description-tex">At No.Thing Project, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website.</p>
        
        <h3>Information We Collect</h3>
        <p>We collect minimal data necessary to improve our website, such as analytics and contact information you voluntarily provide.</p>
        
        <h3>How We Use Your Data</h3>
        <p>Your data helps us enhance the No.Thing experience, ensuring a seamless and engaging platform.</p>
        
        <h3>Data Protection</h3>
        <p>We implement industry-standard security measures to protect your data from unauthorized access.</p>
        
        <h3>Your Rights</h3>
        <p>You have the right to access, modify, or delete your personal data. Contact us at <a href="mailto:someone@nothingproject.io">someone@nothingproject.io</a> for any privacy concerns.</p>
      </div>
    </Section>
  );
};

export default PrivacyPolicy;
