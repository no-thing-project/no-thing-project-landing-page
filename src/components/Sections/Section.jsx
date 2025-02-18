import React from "react";

const Section = ({ sectionNumber, id = "", className = "", children, ...rest }) => (
  <section
    id={id || `section${sectionNumber}`}
    className={`page-section ${className}`}
    data-section-id={sectionNumber}
    {...rest}
  >
    {children}
  </section>
);

export default Section;
