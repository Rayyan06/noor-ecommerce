import { Link } from '@remix-run/react';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link className="nav-link" to="/">
            Art Shop
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/products">
            Shop All
          </Link>
        </li>
      </ul>
    </nav>
  );
}
