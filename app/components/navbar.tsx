import { Link } from '@remix-run/react';
import { useState } from 'react';
// import AccountCircle from './icons/AccountCircle';
import ShoppingCartOutlined from './icons/ShoppingCartOutlined';
import Menu from './icons/Menu';
import InstagramIcon from './icons/Instagram';
import FacebookIcon from './icons/Facebook';
import Youtube from './icons/Youtube';

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="bg-white py-4 mx-8">
      {/* Top Navigation Bar, always showing */}
      <div className="container h-20 mx-auto flex justify-between items-center text-black font-serif">
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            <Menu />
          </button>
        </div>
        <span className="flex space-x-3">
          <Link className="hidden lg:block" to="https://instagram.com">
            <InstagramIcon width={25} />
          </Link>
          <Link className="hidden lg:block" to="https://facebook.com">
            <FacebookIcon filter="grayscale(100%)" width={25} />
          </Link>
          <Link
            className="hidden lg:block self-center"
            to="https://youtube.com"
          >
            <Youtube className="fill-red-300" width={25} />
          </Link>
        </span>
        {/*-- Logo Name */}
        <Link to="/" className="text-4xl mx-auto italic">
          NoorHadia
        </Link>
        <Link className="flex lg:hidden" to="/cart">
          <ShoppingCartOutlined />
        </Link>
      </div>

      {/* Subnavigation, hidden on mobile */}
      <div className="container h-20 mx-auto hidden lg:flex justify-between items-center text-black font-serif">
        {/* Navigation links */}
        <ul
          className={`hidden lg:flex space-x-12 ${
            isCollapsed ? 'block' : 'hidden'
          }`}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="products" className="">
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

        {/* Mobile Menu */}
        <ul className={`lg:hidden h-screen ${isCollapsed ? 'hidden' : 'flex'}`}>
          <li className="block py-2">
            <Link to="/">Home</Link>
          </li>
          <li className="block py-2">
            <Link to="/products" className="">
              Shop
            </Link>
          </li>
          <li className="block py-2">
            <Link to="/about" className="">
              About
            </Link>
          </li>
          <li className="block py-2">
            <Link to="/contact" className="">
              Contact
            </Link>
          </li>
        </ul>

        {/* Login & Cart */}
        <ul className="hidden lg:flex space-x-12">
          {/* <li className="space-x-1 flex">
            <Link className="flex" to="/login">
              <AccountCircle />

              <span className="ml-1">Login</span>
            </Link>
          </li> */}
          <li className="flex space-x-1">
            <Link className="flex" to="/cart">
              <ShoppingCartOutlined />
              <span className="ml-1">Cart</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
