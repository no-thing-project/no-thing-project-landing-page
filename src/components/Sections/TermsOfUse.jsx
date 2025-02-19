import React from "react";
import Section from "./Section";

const TermsOfUse = () => {
  return (
    <Section id="terms-of-use" className="policy-section">
      <div className="policy-container glass-overlay">
        <h2 className="policy-title">Terms of Use</h2>
        <p className="policy-text">Welcome to No.Thing Project. By using our website, you agree to these terms.</p>
        
        <h3>Use of Content</h3>
        <p>All content on this site is for informational purposes only. Unauthorized use or duplication without consent is prohibited.</p>
        
        <h3>User Responsibilities</h3>
        <p>Users must respect community guidelines and refrain from harmful activities, including spamming and illegal use.</p>
        
        <h3>Liability Disclaimer</h3>
        <p>No.Thing Project is not responsible for any direct or indirect damages arising from the use of this site.</p>
        
        <h3>Policy Updates</h3>
        <p>These terms may be updated periodically. Continued use of the site signifies acceptance of changes.</p>
      </div>
    </Section>
  );
};

export default TermsOfUse;
