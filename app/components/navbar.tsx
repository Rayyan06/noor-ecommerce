import { Link } from '@remix-run/react';
import { ShoppingCartOutlined, LoginOutlined } from '@mui/icons-material';

export default function Navbar() {
  return (
    <nav className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center text-black font-serif">
        {/*-- Logo Name */}
        <Link to="/" className="text-2xl">
          NoorHadiaArts
        </Link>

        {/* Navigation links */}
        <ul className="flex space-x-12">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products" className="">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className="">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="">
              Contact
            </Link>
          </li>
        </ul>

        {/* Login & Cart */}
        <ul className="flex space-x-12">
          <li className="space-x-1">
            <LoginOutlined />
            <Link to="/login">Login</Link>
          </li>
          <li className="space-x-1">
            <ShoppingCartOutlined />
            <Link className="ml-1" to="/cart">
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
