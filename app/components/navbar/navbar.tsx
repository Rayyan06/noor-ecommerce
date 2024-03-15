import { Link } from '@remix-run/react';
// import AccountCircle from './icons/AccountCircle';
import ShoppingCartOutlined from '../icons/ShoppingCartOutlined';
import Menu from '../icons/Menu';
import InstagramIcon from '../icons/Instagram';
import FacebookIcon from '../icons/Facebook';
import Youtube from '../icons/Youtube';
import Close from '../icons/Close';
import NavItem from './NavItem';

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

  const iconWidth = 24;

  return (
    <nav>
      {/* Top Navigation Bar, always showing */}
      <div className="h-16 lg:h-28 px-4 md:px-8 flex flex-row items-center justify-between text-black font-serif">
        <div className={`flex lg:hidden ${!isCollapsed && 'z-40'}`}>
          <button onClick={toggleMenu} className="text-white">
            {isCollapsed ? (
              <Menu width={iconWidth} />
            ) : (
              <Close className="fixed top-7" width={iconWidth} />
            )}
          </button>
        </div>
        <span className="hidden lg:flex space-x-3 bg-none">
          <Link className="hidden lg:block" to="https://instagram.com">
            <InstagramIcon strokeOpacity={0} width={25} />
          </Link>
          <Link className="hidden lg:block bg-none" to="https://facebook.com">
            <FacebookIcon
              strokeOpacity={0}
              filter="grayscale(100%)"
              width={25}
            />
          </Link>
          <Link className="hidden lg:flex my-auto" to="https://youtube.com">
            <Youtube strokeOpacity={0} className="fill-red-300 " width={25} />
          </Link>
        </span>

        {/*-- Logo Name */}
        <div className="flex absolute mx-auto w-48 py-3 left-0 right-0">
          <Link
            to="/"
            className="text-3xl lg:text-4xl mx-auto italic hover:text-violet-500"
          >
            NoorHadia
          </Link>
        </div>
        <Link
          className="flex justify-end text-lg md:text-xl items-center hover:text-violet-500 hover:fill-violet-500"
          to="/cart"
        >
          <ShoppingCartOutlined />
          <span className="hidden md:block ml-1 ">Cart({cartItemCount})</span>
        </Link>
      </div>

      <hr />

      {/* Subnavigation, hidden on mobile */}
      <div className="container h-20 mx-auto hidden lg:flex justify-center items-center text-black text-xl font-serif">
        {/* Navigation links */}
        <ul
          className={`hidden lg:flex space-x-12 ${
            isCollapsed ? 'block' : 'hidden'
          }`}
        >
          <NavItem to="/">Home</NavItem>
          <NavItem to="/products">Shop</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </ul>

        {/* Login & Cart */}
        <ul className="hidden lg:flex space-x-12">
          {/* <li className="space-x-1 flex">
            <Link className="flex" to="/login">
              <AccountCircle />

              <span className="ml-1">Login</span>
            </Link>
          </li> 
          <li className="flex space-x-1">
            <Link className="flex" to="/cart" prefetch="intent">
              <ShoppingCartOutlined />
              <span className="ml-1">Cart({cartItemCount})</span>
            </Link>
          </li>
          */}
        </ul>
      </div>
      {/* Mobile Menu */}
      <ul
        className={`lg:hidden h-full gap-y-5 flex flex-col items-center justify-center fixed bg-white opacity-90 text-3xl font-serif space-y-5 transition duration-1000 left-0 top-0 bottom-0 z-30 ${
          isCollapsed ? 'hidden' : 'w-full'
        }`}
      >
        <NavItem to="/" onClick={() => setIsCollapsed(true)}>
          Home
        </NavItem>
        <NavItem to="/products" onClick={() => setIsCollapsed(true)}>
          Shop
        </NavItem>
        <NavItem to="/contact" onClick={() => setIsCollapsed(true)}>
          Contact
        </NavItem>
        <div className="flex flex-row">
          <span className="flex space-x-3 w-3/12">
            <Link to="https://instagram.com">
              <InstagramIcon width={25} />
            </Link>
            <Link to="https://facebook.com">
              <FacebookIcon filter="grayscale(100%)" width={25} />
            </Link>
            <Link to="https://youtube.com" className="my-auto">
              <Youtube className="fill-red-300" width={25} />
            </Link>
          </span>
        </div>
      </ul>
    </nav>
  );
}
