import { Link } from '@remix-run/react';

import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to="/">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}
