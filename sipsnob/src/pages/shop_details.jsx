import React from "react";
import "./pages.css";
import { Link } from "react-router-dom";

const ShopDetails = () => {
  return (
    <div
      style={{
        backgroundColor: "#5a3e2b",
        minHeight: "100vh",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          backgroundColor: "#5a3e2b",
          color: "#f5e1c8",
          maxWidth: "600px",
          width: "100%",
          borderRadius: "16px",
          fontFamily: "YoungSerif, serif",
          padding: "24px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Back Button */}
        <div style={{ marginBottom: "16px" }}>
          <Link to="/" style={{ color: "#ADD8E6", textDecoration: "none" }}>
            ← Back
          </Link>
        </div>

        {/* Shop Title */}
        <h1 style={{ fontSize: "1.5rem", marginBottom: "6px" }}>Blank Street (71st & Lex)</h1>
        <p style={{ fontSize: "1rem", marginBottom: "16px" }}>Cafe</p>

        {/* Image */}
        <img
          src="https://via.placeholder.com/500x250"
          alt="Cafe"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />

        {/* Address & Hours */}
        <p><strong>Address:</strong> 985 Lexington Ave, New York, NY 10021</p>
        <p style={{ marginBottom: "20px" }}><strong>Hours:</strong> 6:30 AM – 6:00 PM</p>

        {/* Ratings */}
        <div style={{ marginBottom: "24px" }}>
          {["Drink Consistency", "Ambiance", "Customer Service"].map((label, index) => (
            <div key={index} style={{ marginBottom: "12px" }}>
              <label>{label}:</label>
              <div
                style={{
                  backgroundColor: "#d7b899",
                  height: "8px",
                  borderRadius: "8px",
                  marginTop: "4px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#8B5E3C",
                    width: `${Math.floor(Math.random() * 60 + 40)}%`, // Placeholder width
                    height: "100%",
                    borderRadius: "8px",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* + More Stats */}
        <div style={{ marginBottom: "16px" }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: "#f5e1c8",
              fontSize: "0.9rem",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            + more stats
          </button>
        </div>

        {/* Tag Info */}
        <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "0.95rem" }}>
          <li>✓ Alternative Milks Available</li>
          <li>✓ Sugar-Free Syrup Options Available</li>
          <li>✓ Food Items Offered</li>
        </ul>
      </div>
    </div>
  );
};

export default ShopDetails;
