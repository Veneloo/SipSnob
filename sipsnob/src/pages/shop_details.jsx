import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./pages.css";

const ShopDetails = () => {
  const { shopId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Try to get shop from location state, otherwise fallback to localStorage
  const shop = location.state?.shop || JSON.parse(localStorage.getItem("selectedShop"));

  if (!shop) {
    return (
      <div className="page-container">
        <h1 style={{ color: "#5a3e2b" }}>Shop Details</h1>
        <p style={{ textAlign: "center", color: "#5a3e2b" }}>No shop data found.</p>
        <button
          onClick={() => navigate("/discover")}
          style={{
            marginTop: "1rem",
            backgroundColor: "#5a3e2b",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer",
            fontFamily: "'Young Serif', serif",
          }}
        >
          ← Back to Discover
        </button>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ paddingBottom: "2rem" }}>
      <h1 style={{ fontSize: "1.875rem", color: "#5a3e2b", marginBottom: "1rem" }}>Shop Details</h1>
      <button
        onClick={() => navigate("/discover")}
        style={{
          backgroundColor: "#d7b899",
          border: "1px solid #5a3e2b",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          fontFamily: "'Young Serif', serif",
          marginBottom: "1rem",
          color: "#5a3e2b",
          fontWeight: "bold"
        }}
      >
        ← Back to Discover
      </button>

      <h2 style={{ fontSize: "1.25rem", color: "#5a3e2b", marginBottom: "0.5rem" }}>{shop.name}</h2>
      <p style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>{shop.address}</p>
      <p style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>Rating: {shop.rating ?? "N/A"} ⭐</p>

      <img
        src={
          shop.photos?.[0]?.photo_reference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${shop.photos[0].photo_reference}&key=YOUR_GOOGLE_API_KEY`
            : "https://upload.wikimedia.org/wikipedia/commons/e/ec/No_image_available.svg"
        }
        alt={shop.name}
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "0.5rem",
          marginBottom: "1.5rem",
          border: "1px solid #ccc"
        }}
      />

      <div style={{ textAlign: "left", color: "#5a3e2b" }}>
        <p><strong>Place ID:</strong> {shop.place_id}</p>
        <p><strong>Latitude:</strong> {shop.geometry?.location?.lat ?? "N/A"}</p>
        <p><strong>Longitude:</strong> {shop.geometry?.location?.lng ?? "N/A"}</p>
        {/* Add more info if needed */}
      </div>
    </div>
  );
};

export default ShopDetails;
