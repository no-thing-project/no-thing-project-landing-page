import React from "react";
import { useNavigate } from "react-router-dom";
import { navLinks } from "../../data/navlinks";

const Navigation = ({ menuOpen, toggleMenu, onNavigate }) => {
  const navigate = useNavigate();

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    navigate("/"); // Редірект на головну
    
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100); // Додаємо затримку, щоб DOM перерендерився

    toggleMenu();
    document.body.style.overflow = "auto";
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
