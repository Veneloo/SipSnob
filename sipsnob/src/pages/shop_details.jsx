import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./pages.css";

const ShopDetails = () => {
  const { shopId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [shop, setShop] = useState(location.state?.shop || null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shop && shopId) {
      const fetchDetails = async () => {
        try {
          const response = await fetch(`https://sip-snob-backend.onrender.com/api/shop-details/${shopId}`);
          const data = await response.json();
          if (data) {
            setShop(data);
          } else {
            setError("No details found for this shop.");
          }
        } catch (err) {
          console.error("Error fetching shop details:", err);
          setError("Failed to fetch shop details.");
        }
      };

      fetchDetails();
    }
  }, [shop, shopId]);

  if (!shop && !error) return null;

  return (
    <div className="page-container">
      <h1 style={{ fontSize: "1.875rem", color: "#5a3e2b", marginBottom: "1rem" }}>
        Shop Details
      </h1>
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

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        shop && (
          <>
            <h2 style={{ textAlign: "center" }}>{shop.name}</h2>
            <p style={{ textAlign: "center" }}>Rating: {shop.rating ?? "N/A"} ⭐</p>

            <div style={{ maxWidth: 400, margin: "1rem auto" }}>
              {shop.photos?.[0]?.photo_reference && (
                <img
                  src={`https://sip-snob-backend.onrender.com/api/photo?ref=${shop.photos[0].photo_reference}`}
                  alt={shop.name}
                  style={{ width: "100%", borderRadius: 8 }}
                />
              )}
              <p style={{ marginTop: "1rem" }}><strong>Address:</strong> {shop.vicinity || shop.formatted_address}</p>

              {shop.opening_hours?.weekday_text && (
                <div>
                  <strong>Opening Hours:</strong>
                  <ul style={{ marginTop: "0.5rem" }}>
                    {shop.opening_hours.weekday_text.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
              )}

              {shop.reviews && (
                <div style={{ marginTop: "1.5rem" }}>
                  <strong>Recent Reviews:</strong>
                  <ul style={{ marginTop: "0.5rem" }}>
                    {shop.reviews.slice(0, 3).map((review, index) => (
                      <li key={index}>
                        <p><strong>{review.author_name}</strong> ({review.rating}⭐): {review.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default ShopDetails;
