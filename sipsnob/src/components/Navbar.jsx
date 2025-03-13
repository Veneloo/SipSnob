import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import for navigation
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#f5e1c8] text-[#5a3e2b] p-4 flex justify-between items-center relative shadow-md"
      style={{
        top: "0",
        position: "fixed",
        width: "100%",
        padding: "2px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 2px rgb(0,0,0,0.1)",
        zIndex: "1000"

      }}>
      <p 
      style={{
        fontSize: "24px",
        margin: "12px",
        textShadow: "0 2px 2px rgb(0,0,0,0.2)"
      }}>SipSnob</p>

      {/* Hamburger Button */}
      <button onClick={toggleMenu} style={{
        backgroundColor: "transparent",
        fontSize: "24px",
        color: "#5a3e2b",
        margin: "12px",
        border: "0"
      }}>
        ☰
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div 
        onChange={{toggleMenu}}
        style={{
          position: "absolute",
          marginRight: "50px",
          padding: "10px",
          right: "10px",
          display: "inline-block",
          minWidth: "160px",
          border: "0"
        }}className="absolute right-4 mt-2 w-48 bg-[#8B5E3C] rounded-md shadow-lg z-50">
          <Link to="/home" className="block px-4 py-2 text-white hover:bg-[#5a3e2b]" 
          onClick={{toggleMenu}}
          style={{border: "0",
          padding: "5px 10px",
          boxShadow: location.pathname === "/home" ? "0 1px 2px rgb(0,0,0,0.2)" : "2 2px 2px rgb(0,0,0,0.2)" ,
          color: "#5a3e2b",
 }}>Home</Link>
          <Link to="/discover" className="block px-4 py-2 text-white hover:bg-[#5a3e2b]" 
          onClick={{toggleMenu}}
          style={{border: "0", 
          padding: "5px 10px", 
          boxShadow: location.pathname === "/discover" ? "0 2px 2px rgb(0,0,0,0.2)" : "2 2px 2px rgb(0,0,0,0.2)" ,
          color: "#5a3e2b",
 }}>Discover & Search</Link>
          <Link to="/ratings" className="block px-4 py-2 text-white hover:bg-[#5a3e2b]" 
          onClick={{toggleMenu}}
          style={{ padding: "5px 10px", 
          boxShadow: location.pathname === "/ratings" ? "0 2px 2px rgb(0,0,0,0.2)" : "2 2px 2px rgb(0,0,0,0.2)" ,
          color: "#5a3e2b",
 }}>Rate Coffee Shops</Link>
          <Link to="/profile" className="block px-4 py-2 text-white hover:bg-[#5a3e2b]" 
          onClick={{toggleMenu}}
          style={{ padding: "5px 10px", 
          boxShadow: location.pathname === "/profile" ? "0 2px 2px rgb(0,0,0,0.2)" : "2 2px 2px rgb(0,0,0,0.2)" ,
          color: "#5a3e2b",
 }}>Your Profile</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
