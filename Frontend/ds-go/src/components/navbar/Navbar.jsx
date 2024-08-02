import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Navbar.css"; // Assuming we have a CSS file for styling

const Navbar = ({ logo, links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        {logo ? <img src={logo} alt="Logo" /> : <span>DS-GO</span>}
      </div>
      <div className={`navbar__links ${isMenuOpen ? "open" : ""}`}>
        {links && links.length > 0 ? (
          links.map((link) => (
            <a key={link.name} href={link.url}>
              {link.name}
            </a>
          ))
        ) : (
          <p>No links available</p>
        )}
      </div>
      <button className="navbar__toggle" onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
};

Navbar.propTypes = {
  logo: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navbar;
