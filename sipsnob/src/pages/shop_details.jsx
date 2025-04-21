
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pages.css";

const ShopDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const shop = location.state?.shop;

  if (!shop) {
    return (
      <div className="page-container" style={{ padding: "20px", textAlign: "center" }}>
        <h2>No shop details found.</h2>
        <button onClick={() => navigate("/discover")} className="button" style={{ marginTop: "20px" }}>
          ← Back to Discover
        </button>
      </div>
    );
  }

  const photoUrl = shop.photos?.[0]?.photo_reference
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${shop.photos[0].photo_reference}&key=AIzaSyBHH5HtHRJl1eKFe67hWuCOqzAXncPWtTw`
    : "https://via.placeholder.com/500x250";

  return (
    <div className="page-container" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ fontSize: "2rem", color: "#5a3e2b" }}>{shop.name}</h1>
      <img
        src={photoUrl}
        alt="Shop"
        style={{ width: "100%", borderRadius: "12px", objectFit: "cover", marginBottom: "20px" }}
      />
      <div style={{ backgroundColor: "#f5e1c8", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <p><strong>Address:</strong> {shop.address || "Not available"}</p>
        <p><strong>Rating:</strong> {shop.rating ? `${shop.rating} ⭐` : "No rating available"}</p>
        <p><strong>User Ratings Count:</strong> {shop.user_ratings_total ?? "N/A"}</p>
        <p><strong>Hours:</strong> {shop.hours || "Not available"}</p>
        {shop.website && (
          <p><strong>Website:</strong> <a href={shop.website} target="_blank" rel="noopener noreferrer">{shop.website}</a></p>
        )}
      </div>

      <button
        className="button"
        onClick={() => navigate("/ratings", { state: { shop } })}
        style={{ marginTop: "20px", backgroundColor: "#8B5E3C", color: "white", fontWeight: "bold" }}
      >
        Rate This Shop
      </button>
    </div>
  );
};

export default ShopDetails;
