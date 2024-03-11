import { Link, NavLink } from '@remix-run/react';
import { useState } from 'react';
// import AccountCircle from './icons/AccountCircle';
import ShoppingCartOutlined from './icons/ShoppingCartOutlined';
import Menu from './icons/Menu';
import InstagramIcon from './icons/Instagram';
import FacebookIcon from './icons/Facebook';
import Youtube from './icons/Youtube';
import Close from './icons/Close';

type NavbarProps = {
  cartItemCount: number;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Navbar({
  cartItemCount,
  isCollapsed,
  setIsCollapsed,
}: NavbarProps) {
  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  const iconWidth = 50;

  return (
    <nav className="bg-white py-4 mx-8">
      {/* Top Navigation Bar, always showing */}
      <div className="container h-20 mx-auto flex flex-row items-center justify-between text-black font-serif">
        <div className={`block lg:hidden ${!isCollapsed && 'z-40'}`}>
          <button onClick={toggleMenu} className="text-white">
            {isCollapsed ? (
              <Menu width={iconWidth} />
            ) : (
              <Close width={iconWidth} />
            )}
          </button>
        </div>
        <span className="hidden lg:flex space-x-3 w-3/12">
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
        <div className="flex">
          <Link to="/" className="text-4xl mx-auto italic">
            NoorHadia
          </Link>
        </div>
        <div className="hidden lg:flex w-3/12"></div>
        <Link className="flex lg:hidden" to="/cart">
          <ShoppingCartOutlined />({cartItemCount})
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
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink
              to="products"
              className={({ isActive, isPending }) =>
                isPending ? '' : isActive ? 'underline' : ''
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive, isPending }) =>
                isPending ? '' : isActive ? 'underline' : ''
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive, isPending }) =>
                isPending ? '' : isActive ? 'underline' : ''
              }
            >
              Contact
            </NavLink>
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
            <Link className="flex" to="/cart" prefetch="intent">
              <ShoppingCartOutlined />
              <span className="ml-1">Cart({cartItemCount})</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`lg:hidden h-full flex flex-col items-center justify-center fixed overflow-y-hidden bg-white opacity-90 text-3xl font-serif space-y-5 transition duration-1000 left-0 top-0 bottom-0 z-30 ${
          isCollapsed ? 'w-0' : 'w-full'
        }`}
      >
        <li className="block py-2">
          <NavLink to="/" onClick={() => setIsCollapsed(true)}>
            Home
          </NavLink>
        </li>
        <li className="block py-2">
          <NavLink
            to="/products"
            onClick={() => setIsCollapsed(true)}
            className={({ isActive, isPending }) =>
              isPending ? '' : isActive ? 'underline' : ''
            }
          >
            Shop
          </NavLink>
        </li>
        <li className="block py-2">
          <NavLink
            to="/about"
            onClick={() => setIsCollapsed(true)}
            className={({ isActive, isPending }) =>
              isPending ? '' : isActive ? 'underline' : ''
            }
          >
            About
          </NavLink>
        </li>
        <li className="block py-2">
          <NavLink
            to="/contact"
            onClick={() => setIsCollapsed(true)}
            className={({ isActive, isPending }) =>
              isPending ? '' : isActive ? 'underline' : ''
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
