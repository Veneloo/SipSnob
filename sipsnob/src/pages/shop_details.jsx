import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./pages.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrows
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        display: "block",
        background: "#8B5E3C",
        padding: "10px",
        borderRadius: "50%",
        position: "absolute",
        right: "-25px",
        top: "40%",
        zIndex: 2,
        cursor: "pointer",
        color: "white",
        fontSize: "18px",
      }}
      onClick={onClick}
    >
      ❯
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        display: "block",
        background: "#8B5E3C",
        padding: "10px",
        borderRadius: "50%",
        position: "absolute",
        left: "-25px",
        top: "40%",
        zIndex: 2,
        cursor: "pointer",
        color: "white",
        fontSize: "18px",
      }}
      onClick={onClick}
    >
      ❮
    </div>
  );
};

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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

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
          fontWeight: "bold",
        }}
      >
        ← Back to Discover
      </button>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        shop && (
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <h2>{shop.name}</h2>
            <p><strong>Rating:</strong> {shop.rating ?? "N/A"} ⭐</p>

            {shop.photos?.length > 0 && (
              <Slider {...sliderSettings}>
                {shop.photos.map((photo, index) => (
                  <div key={index}>
                    <img
                      src={`https://sip-snob-backend.onrender.com/api/photo?ref=${photo.photo_reference}`}
                      alt={`${shop.name} ${index + 1}`}
                      style={{
                        width: "100%",
                        borderRadius: "12px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        marginBottom: "1rem",
                        maxHeight: "400px",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                ))}
              </Slider>
            )}

            {shop.formatted_address && (
              <p>
                <strong>Address:</strong> {shop.formatted_address}
              </p>
            )}

            {shop.formatted_phone_number && (
              <p>
                <strong>Phone:</strong> {shop.formatted_phone_number}
              </p>
            )}

            {shop.opening_hours?.weekday_text && (
              <div style={{ marginTop: "1rem" }}>
                <strong>Opening Hours:</strong>
                <ul style={{ listStyleType: "none", paddingLeft: 0, marginTop: "0.5rem" }}>
                  {shop.opening_hours.weekday_text.map((line, index) => (
                    <li key={index} style={{ fontStyle: "italic" }}>{line}</li>
                  ))}
                </ul>
              </div>
            )}

            {shop.reviews?.length > 0 && (
              <div style={{ marginTop: "1.5rem", textAlign: "left" }}>
                <strong>Recent Reviews:</strong>
                <ul style={{ marginTop: "0.5rem", paddingLeft: 0 }}>
                  {shop.reviews.slice(0, 3).map((review, index) => (
                    <li key={index} style={{ marginBottom: "1rem", listStyle: "none" }}>
                      <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
                        {review.author_name} ({review.rating}⭐)
                      </p>
                      <p style={{ fontStyle: "italic", color: "#5a3e2b" }}>
                        {review.text || "No review text provided."}
                      </p>
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
