import React from "react";
import { navLinks } from "../../data/navlinks";

const Navigation = ({ menuOpen, toggleMenu }) => {
  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Закриваємо меню та повертаємо скрол
      toggleMenu();
      document.body.style.overflow = "auto";
    }
  };

  return (
    <nav className={`landing-nav ${menuOpen ? "open" : ""}`}>
      <ul>
        {navLinks.map(({ id, label }) => (
          <li key={id} className="menu-item">
            <a href={`#${id}`} onClick={(e) => handleLinkClick(e, id)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
