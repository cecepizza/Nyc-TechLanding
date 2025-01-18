import React, { useState, memo } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { label: "Home", path: "/", key: "Home" },
  { label: "Jobs", path: "/jobs", key: "Jobs" },
  { label: "Events", path: "/events", key: "Events" },
  { label: "Network", path: "/ecosystem", key: "Ecosystem" },
  { label: "FAQ", path: "/about", key: "About" },
];

const NavBar = memo(
  ({
    activeItem,
    onNavigate,
  }: {
    activeItem: string | null;
    onNavigate: (item: string) => void;
  }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
      <nav className={styles.navbar}>
        {/* Logo or Brand */}

        {/* Icons in Top Right Corner */}
        <div className="flex space-x-4">
          <a
            href="https://x.com/fractaltechnyc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-cyan-200 transition-all opacity-70 hover:opacity-100"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a
            href="https://linktr.ee/nyctech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-cyan-200 transition-all opacity-70 hover:opacity-100"
          >
            <FontAwesomeIcon icon={faCode} size="2x" />
          </a>
        </div>

        {/* Hamburger Menu Toggle */}
        <div className={styles.navToggle} onClick={toggleMenu}>
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`${styles.navList} ${menuOpen ? styles.active : ""}`}>
          {navLinks.map((link) => (
            <li
              key={link.key}
              className={`${styles.navItem} ${
                activeItem === link.key ? styles.active : ""
              }`}
            >
              <Link
                href={link.path}
                onClick={() => {
                  onNavigate(link.key);
                  setMenuOpen(false); /* Close menu after clicking a link */
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);

NavBar.displayName = "NavBar";

export default NavBar;
