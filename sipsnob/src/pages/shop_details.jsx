import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pages.css";

const ShopDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const shop = location.state?.shop;

  if (!shop) {
    return (
      <div className="page-container">
        <h2 style={{ color: "#5a3e2b" }}>No shop data found</h2>
        <button
          onClick={() => navigate("/discover")}
          style={{
            marginTop: "1rem",
            backgroundColor: "#5a3e2b",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            fontSize: "1rem",
            fontFamily: "'Young Serif', serif",
          }}
        >
          ← Back to Discover
        </button>
      </div>
    );
  }

  const photoUrl = shop.photos?.[0]?.photo_reference
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${shop.photos[0].photo_reference}&key=YOUR_GOOGLE_API_KEY`
    : "https://via.placeholder.com/400x200";

  return (
    <div className="page-container" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#5a3e2b", marginBottom: "1rem" }}>
        {shop.name}
      </h1>

      <img
        src={photoUrl}
        alt="Shop Preview"
        style={{
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "1rem",
        }}
      />

      <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
        📍 <strong>Address:</strong> {shop.address || "N/A"}
      </p>

      <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
        ⭐ <strong>Rating:</strong> {shop.rating ?? "Not yet rated"}
      </p>

      {shop.types?.length > 0 && (
        <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          🏷️ <strong>Categories:</strong> {shop.types.join(", ")}
        </p>
      )}

      {shop.user_ratings_total && (
        <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
          🧾 <strong>Total Ratings:</strong> {shop.user_ratings_total}
        </p>
      )}

      <button
        onClick={() => navigate("/discover")}
        style={{
          backgroundColor: "#5a3e2b",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          fontSize: "1rem",
          fontFamily: "'Young Serif', serif",
        }}
      >
        ← Back to Discover
      </button>
    </div>
  );
};

export default ShopDetails;
