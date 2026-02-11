import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-[60px] w-full p-4 fixed top-0 left-0 z-50 backdrop-blur-md bg-white/70 shadow-md">
      
      
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        
       
        <Link to="/" className="text-2xl font-bold text-accent tracking-wide">
        BEAUTY CARE
        </Link>

        
        <div className="hidden lg:flex items-center gap-8 text-lg font-medium text-gray-700">
          <Link to="/" className="hover:text-accent transition duration-300">
            Home
          </Link>
          <Link to="/products" className="hover:text-accent transition duration-300">
            Products
          </Link>
          <Link to="/contact" className="hover:text-accent transition duration-300">
            Contact
          </Link>
          <Link to="/reviews" className="hover:text-accent transition duration-300">
            Reviews
          </Link>

          <UserData />

          <Link
            to="/cart"
            className="text-2xl hover:scale-110 transition-transform duration-300"
          >
            <BsCart4 />
          </Link>
        </div>

        
        <GiHamburgerMenu
          className="lg:hidden text-3xl text-gray-700 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex">
          <div className="w-[280px] bg-white h-full shadow-lg p-6 flex flex-col gap-6 animate-slideIn">
            
            <GiHamburgerMenu
              className="text-3xl text-gray-700 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            <Link to="/" className="text-lg hover:text-accent transition">
              Home
            </Link>
            <Link to="/products" className="text-lg hover:text-accent transition">
              Products
            </Link>
            <Link to="/contact" className="text-lg hover:text-accent transition">
              Contact
            </Link>
            <Link to="/reviews" className="text-lg hover:text-accent transition">
              Reviews
            </Link>
            <Link to="/cart" className="text-lg hover:text-accent transition">
              Cart
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
