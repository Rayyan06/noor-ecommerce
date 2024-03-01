import { Link } from '@remix-run/react';
import { useState } from 'react';
import AccountCircle from './icons/AccountCircle';
import ShoppingCartOutlined from './icons/ShoppingCartOutlined';
import Menu from './icons/Menu';
import InstagramIcon from './icons/Instagram';

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="bg-white py-4">
      <div className="container h-20 mx-auto flex justify-between items-center text-black font-serif">
        <Link to="https://instagram.com">
          <InstagramIcon width={20} />
        </Link>
        {/*-- Logo Name */}
        <Link to="/" className="text-4xl mx-auto">
          Home Decor Store
        </Link>
      </div>
      <div className="container h-20 mx-auto flex justify-between items-center text-black font-serif">
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            <Menu />
          </button>
        </div>
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

        {/* Mobile Menu */}
        <ul
          className={`lg:hidden ${isCollapsed ? 'hidden' : 'block'} space-x-12`}
        >
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
