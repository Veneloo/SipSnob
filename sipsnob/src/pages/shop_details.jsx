import React, { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./pages.css";

const ShopDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { shopId } = useParams();
  const shop = location.state?.shop || JSON.parse(localStorage.getItem("selectedShop"));


  useEffect(() => {
    if (!shop) {
      navigate("/discover");
    }
  }, [shop, navigate]);

  if (!shop) return null;

  return (
    <div
      className="page-container"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        borderRadius: "12px",
        border: "2px solid #8B5E3C",
        padding: "40px",
        backgroundColor: "#f5e1c8",
        color: "#5a3e2b",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>{shop.name}</h1>

      <img
        src={
          shop.photos?.[0]?.photo_reference
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${shop.photos[0].photo_reference}&key=YOUR_GOOGLE_API_KEY`
            : "https://via.placeholder.com/400x200"
        }
        alt="Shop Visual"
        style={{
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #8B5E3C",
          marginBottom: "1.5rem",
        }}
      />

      <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
        <strong>Address:</strong> {shop.address || "N/A"}
      </p>
      <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
        <strong>Rating:</strong> {shop.rating ?? "N/A"} ⭐
      </p>
      <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
        <strong>Price Level:</strong> {shop.price_level ?? "N/A"}
      </p>
      <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
        <strong>Open Now:</strong> {shop.open_now ? "Yes" : "No"}
      </p>

      <button
        onClick={() => navigate("/discover")}
        style={{
          marginTop: "1rem",
          backgroundColor: "#5a3e2b",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Young Serif', serif",
        }}
      >
        ← Back to Discover
      </button>
    </div>
  );
};

export default ShopDetails;
