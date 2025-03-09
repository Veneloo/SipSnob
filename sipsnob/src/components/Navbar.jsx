import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import for navigation

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#f5e1c8] text-[#5a3e2b] p-4 flex justify-between items-center relative shadow-md">
      <h1 className="text-xl font-bold">SipSnob</h1>

      {/* Hamburger Button */}
      <button onClick={toggleMenu} className="text-2xl">
        ☰
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-4 mt-2 w-48 bg-[#8B5E3C] rounded-md shadow-lg z-50">
          <Link to="/" className="block px-4 py-2 text-white hover:bg-[#5a3e2b]">Home</Link>
          <Link to="/profile" className="block px-4 py-2 text-white hover:bg-[#5a3e2b]">Your Profile</Link>
          <Link to="/discover" className="block px-4 py-2 text-white hover:bg-[#5a3e2b]">Discover & Search</Link>
          <Link to="/ratings" className="block px-4 py-2 text-white hover:bg-[#5a3e2b]">Rate Coffee Shops</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
