import React from "react";
import { useNavigate } from "react-router-dom";
import "./pages.css";

function Launch() {
  const navigate = useNavigate();

  return (
    <div className="launch-wrapper">
      {/* Animated Coffee Pour Background */}
      <svg className="coffee-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          d="M0,224 C480,320 960,160 1440,256 L1440,320 L0,320 Z"
          fill="#4a2c1a"
        >
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values="
              M0,224 C480,320 960,160 1440,256 L1440,320 L0,320 Z;
              M0,240 C480,280 960,180 1440,240 L1440,320 L0,320 Z;
              M0,224 C480,320 960,160 1440,256 L1440,320 L0,320 Z"
          />
        </path>
      </svg>

      {/* Page Content */}
      <div className="launch-content fade-in-content">
        <p>Welcome to</p>
        <h1>SipSnob</h1>
        <p className="tagline">
          Your guide to the best brews, powered by coffee enthusiasts like you.
        </p>
        <div className="button-row">
          <button className="button" onClick={() => navigate("/login")}>
            Log In
          </button>
          <button className="button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>

          
        </div>
      </div>
    </div>
  );
}

export default Launch;
