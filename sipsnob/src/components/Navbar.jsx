import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Mobile_Menu = ({ toggleMenu }) => {
  const location = useLocation();

  return (
    <div
      onChange={toggleMenu}
      style={{
        border: "0",
        height: "95vh",
        width: "100vw",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifySelf: "center",
        alignItems: "center",
        backgroundColor: "#d7b898"
      }}
    >
      <Link to="/home" onClick={toggleMenu} style={linkStyle(location.pathname === "/home")}>
        Home
      </Link>
      <Link to="/discover" onClick={toggleMenu} style={linkStyle(location.pathname === "/discover")}>
        Discover & Search
      </Link>
      <Link to="/profile" onClick={toggleMenu} style={linkStyle(location.pathname === "/profile")}>
        My Profile
      </Link>
    </div>
  );
};

const linkStyle = (isActive) => ({
  border: "0",
  padding: "5px 10px",
  margin: "12px",
  boxShadow: isActive ? "0 1px 2px rgb(0,0,0,0.2)" : "2 2px 2px rgb(0,0,0,0.2)",
  color: "#5a3e2b",
  flexWrap: "nowrap"
});

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setMobileMenu] = useState(window.matchMedia('(max-width: 768px)').matches);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const toggleMobileMenu = () => {
      setMobileMenu(window.matchMedia('(max-width: 800px)').matches);
    };
    window.addEventListener('resize', toggleMobileMenu);
    return () => window.removeEventListener('resize', toggleMobileMenu);
  }, []);

  return (
    <nav
      className="bg-[#f5e1c8] text-[#5a3e2b] p-4 flex justify-between items-center relative shadow-md"
      style={{
        top: "0",
        position: "fixed",
        width: "100%",
        padding: "2px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        backgroundColor: "#d7b898",
        boxShadow: "0 2px 2px rgb(0,0,0,0.1)",
        zIndex: "1000"
      }}
    >
      <div style={{ display: "flex", zIndex: "1001", alignItems: "center" }}>
        {/* ✅ Clickable Logo */}
        <Link to="/home" style={{ textDecoration: "none" }}>
          <p
            style={{
              fontSize: "24px",
              margin: "12px",
              paddingRight: "100px",
              textShadow: "0 2px 2px rgb(0,0,0,0.2)",
              color: "#5a3e2b",
              fontWeight: "bold",
              fontFamily: "YoungSerif"
            }}
          >
            SipSnob
          </p>
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          style={{
            backgroundColor: "transparent",
            fontSize: "24px",
            color: "#5a3e2b",
            margin: "12px",
            border: "0",
            position: "absolute",
            right: "0"
          }}
        >
          ☰
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpen &&
        (isMobile ? (
          <Mobile_Menu toggleMenu={toggleMenu} />
        ) : (
          <div
            onChange={toggleMenu}
            className="absolute right-4 mt-2 w-48 bg-[#8B5E3C] rounded-md shadow-lg z-50"
            style={{
              position: "relative",
              marginRight: "50px",
              padding: "10px",
              right: "10px",
              display: "inline-block",
              border: "0"
            }}
          >
            <Link to="/home" onClick={toggleMenu} style={linkStyle(location.pathname === "/home")}>
              Home
            </Link>
            <Link to="/discover" onClick={toggleMenu} style={linkStyle(location.pathname === "/discover")}>
              Discover & Search
            </Link>
            <Link to="/profile" onClick={toggleMenu} style={linkStyle(location.pathname === "/profile")}>
              My Profile
            </Link>
          </div>
        ))}
    </nav>
  );
};

export default Navbar;
