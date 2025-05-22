import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./pages.css";
import { motion } from "framer-motion";
import RatingItem from "../components/RatingItem";

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
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (!shop && !error) return null;

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{paddingBlock: "12px"}}
    >
      <motion.h1
        style={{ fontSize: "1.875rem", color: "#5a3e2b", marginBottom: "1rem" }}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Shop Details
      </motion.h1>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
      </motion.button>

      {error ? (
        <motion.p style={{ color: "red" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error}
        </motion.p>
      ) : (
        shop && (
          <motion.div
            className="shop-details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2 style={{ textAlign: "center" }}>{shop.name}</motion.h2>
            <p style={{ textAlign: "center" }}>
              <strong>Rating:</strong> {shop.rating ?? "N/A"} ⭐
            </p>

            {shop.photos?.length > 0 && (
              <motion.div
                style={{ maxWidth: "500px", margin: "1rem auto"}}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Slider {...sliderSettings}>
                  {shop.photos.slice(0, 10).map((photo, index) => (
                    <div key={index}>
                      <img
                        src={`https://sip-snob-backend.onrender.com/api/photo?ref=${photo.photo_reference}`}
                        alt={`Photo ${index + 1}`}
                        style={{
                          width: "100%",
                          maxHeight: "250px",
                          overflowY: "clip",
                          objectFit: "cover",
                          borderRadius: 8
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ display: "flex", flexWrap: "wrap", marginBlock: "32px", justifyContent: "center"}}
            >
              {shop.formatted_address && (
                <p style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", marginBottom: "0", paddingBottom: "0"}}><strong style={{ padding: "6px 12px",
                backgroundColor: "#5a3e2b",
                borderRadius: "12px",
                color: "#e8d6c3", margin: "12px"}}>Address:</strong> {shop.formatted_address}</p>
              )}
              {shop.formatted_phone_number && (
                <p style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", marginTop: "0", paddingTop: "0"}}><strong style={{ padding: "6px 12px",
                backgroundColor: "#5a3e2b",
                borderRadius: "12px",
                color: "#e8d6c3", margin: "12px"}}>Phone:</strong> {shop.formatted_phone_number}</p>
              )}
            </motion.div>

            {shop.opening_hours?.weekday_text && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3><strong>Opening Hours:</strong></h3>
                <ul style={{ marginTop: "0.5rem", paddingInlineStart: "20px", textAlign: "left", backgroundColor: "#f5e1c8", padding: "12px 42px", borderRadius: "24px", minWidth: "fit-content" }}>
                  {shop.opening_hours.weekday_text.map((line, index) => (
                    <li style={{marginBlock: "5px"}} key={index}>{line}</li>
                  ))}
                </ul>
              </motion.div>
            )}

              {shop.reviews.length === 0 && <p>No reviews yet. Be the first to rate this coffee shop!</p>}


          </motion.div>
        )
      )}
    </motion.div>
  );
};

export default ShopDetails;
