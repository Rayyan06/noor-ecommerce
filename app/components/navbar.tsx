import { Link } from '@remix-run/react';

export default function Navbar() {
  return (
    <nav className="bg-white max-w-screen-xl flex flex-wrap flex-col items-center justify-between mx-auto p-4">
      <div className="flex">
        <Link to="/">NoorHadiaArts</Link>
      </div>
      <ul className="flex flex-row justify-between">
        <li className="px-3">
          <Link className="" to="/products">
            Shop
          </Link>
        </li>
        <li className="px-3">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
