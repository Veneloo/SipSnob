import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./pages.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ShopDetails = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://sip-snob-backend.onrender.com/api/shop-details/${shopId}`);
        const data = await response.json();
        if (data && data.name) {
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
  }, [shopId]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  if (!shop && !error) return null;

  return (
    <div className="page-container">
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

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        shop && (
          <div className="shop-details-container responsive-details">
            <h2>{shop.name}</h2>
            <p><strong>Rating:</strong> {shop.rating ?? "N/A"} ⭐</p>

            {/* Carousel */}
            {shop.photos?.length > 0 && (
              <Slider {...sliderSettings}>
                {shop.photos.slice(0, 10).map((photo, index) => (
                  <div key={index}>
                    <img
                      src={`https://sip-snob-backend.onrender.com/api/photo?ref=${photo.photo_reference}`}
                      alt={`Shop View ${index + 1}`}
                      style={{
                        borderRadius: "12px",
                        maxHeight: "400px",
                        width: "100%",
                        objectFit: "cover",
                        margin: "0 auto"
                      }}
                    />
                  </div>
                ))}
              </Slider>
            )}

            {/* Info */}
            {shop.formatted_address && (
              <p style={{ marginTop: "1rem" }}>
                <strong>Address:</strong> {shop.formatted_address}
              </p>
            )}

            {shop.formatted_phone_number && (
              <p>
                <strong>Phone:</strong> {shop.formatted_phone_number}
              </p>
            )}

            {shop.opening_hours?.weekday_text && (
              <div>
                <strong>Opening Hours:</strong>
                <ul style={{ marginTop: "0.5rem", listStyle: "none", paddingLeft: 0 }}>
                  {shop.opening_hours.weekday_text.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
            )}

            {shop.reviews?.length > 0 && (
              <div style={{ marginTop: "1.5rem" }}>
                <strong>Recent Reviews:</strong>
                <ul style={{ marginTop: "0.5rem", paddingLeft: 0, listStyle: "none" }}>
                  {shop.reviews.slice(0, 3).map((review, index) => (
                    <li key={index} style={{ marginBottom: "0.75rem" }}>
                      <p style={{ marginBottom: "0.25rem" }}>
                        <strong>{review.author_name}</strong> ({review.rating} ⭐)
                      </p>
                      <p style={{ fontStyle: "italic", color: "#5a3e2b" }}>{review.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ShopDetails;
