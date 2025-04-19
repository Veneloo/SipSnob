import React from "react";
import "./pages.css";

const ShopDetails = () => {
  return (
    <div
      className="page-container"
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        borderRadius: "16px",
        backgroundColor: "#5a3e2b",
        color: "#f5e1c8",
        padding: "24px",
        fontFamily: "YoungSerif, serif",
      }}
    >
      {/* Back button */}
      <div style={{ marginBottom: "12px" }}>
        <a href="/discover" style={{ color: "#ADD8E6", textDecoration: "none" }}>
          ← Back
        </a>
      </div>

      {/* Shop Title */}
      <h1 style={{ fontSize: "1.5rem", marginBottom: "8px" }}>Blank Street (71st & Lex)</h1>

      {/* Google Maps Image */}
      <img
        src="https://via.placeholder.com/400x200"
        alt="Cafe"
        style={{
          borderRadius: "12px",
          width: "100%",
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />

      {/* Address */}
      <p style={{ marginBottom: "6px" }}>
        <strong>Address:</strong> 985 Lexington Ave, New York, NY 10021
      </p>

      {/* Operating Hours */}
      <p style={{ marginBottom: "20px" }}>
        <strong>Hours:</strong> 6:30 AM – 6:00 PM
      </p>

      {/* Ratings Preview */}
      <div style={{ marginBottom: "20px" }}>
        {["Drink Consistency", "Ambiance", "Customer Service"].map((label, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
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
                  width: `${Math.random() * 100}%`, // placeholder
                  height: "100%",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for "More Stats" */}
      <div>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#f5e1c8",
            fontSize: "0.9rem",
            marginBottom: "12px",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          + more stats
        </button>
      </div>

      {/* Tags for options */}
      <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "0.95rem" }}>
        <li>✔ Alternative Milks Available</li>
        <li>✔ Sugar-Free Syrup Options Available</li>
        <li>✔ Food Items Offered</li>
      </ul>
    </div>
  );
};

export default ShopDetails;
