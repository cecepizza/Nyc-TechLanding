import React, { memo } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", path: "/", key: "Home" },
  { label: "Jobs", path: "/jobs", key: "Jobs" },
  { label: "Events", path: "/events", key: "Events" },
  { label: "Network", path: "/ecosystem", key: "Ecosystem" },
];

const NavBar = memo(
  ({
    activeItem,
    onNavigate,
  }: {
    activeItem: string | null;
    onNavigate: (item: string) => void;
  }) => (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {navLinks.map((link) => (
          <li
            key={link.key}
            className={`${styles.navItem} ${
              activeItem === link.key ? styles.active : ""
            }`}
          >
            <Link href={link.path} onClick={() => onNavigate(link.key)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
);

NavBar.displayName = "NavBar"; // set explicit name to help React DevTools identify the component

export default NavBar;
