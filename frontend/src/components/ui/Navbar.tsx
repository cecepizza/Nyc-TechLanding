import React, { useState, memo } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navLinks = [
  { label: "Home", path: "/", key: "Home" },
  { label: "Jobs", path: "/jobs", key: "Jobs" },
  { label: "Events", path: "/events", key: "Events" },
  { label: "Network", path: "/network", key: "Network" },
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

        {/* Hamburger Menu Toggle */}
        <div className={styles.navToggle} onClick={toggleMenu}>
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`${styles.navList} ${menuOpen ? styles.active : ""}`}>
          {navLinks.map((link) => (
            <li key={link.key} className={styles.navItem}>
              <Link
                href={link.path}
                onClick={() => {
                  onNavigate(link.key);
                  setMenuOpen(false); /* Close menu after clicking a link */
                }}
                className={activeItem === link.key ? styles.active : ""}
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
