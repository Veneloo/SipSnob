import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pages.css";

const Discover = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState("");

  const fetchShops = async (lat, lng) => {
    setLoading(true);
    setGeoError("");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/coffee-shops?lat=${lat}&lng=${lng}`
      );
      setShops(response.data);
    } catch (error) {
      console.error("Error fetching coffee shops", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserLocationAndFetch = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchShops(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        setGeoError("Unable to retrieve your location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Run once on component mount
  useEffect(() => {
    getUserLocationAndFetch();
  }, []);

  return (
    <div className="page-container">
      <h1 style={{ fontSize: "1.875rem", color: "#5a3e2b", marginBottom: "1rem" }}>
        Discover Coffee Shops
      </h1>

      <button
        onClick={getUserLocationAndFetch}
        style={{
          backgroundColor: "#5a3e2b",
          color: "#fff",
          padding: "0.4rem 1rem",
          borderRadius: "0.25rem",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          maxWidth: "200px",
          margin: "10px auto",
          display: "block",
          fontFamily: "'Young Serif', serif",
        }}
      >
        Refresh Selection
      </button>

      {/* Errors */}
      {geoError && (
        <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>{geoError}</p>
      )}

      {/* Loading */}
      {loading && (
        <p style={{ textAlign: "center", color: "#5a3e2b" }}>Finding the best cafés near you...</p>
      )}

      {/* Coffee Shop List */}
      <div style={{ marginTop: "1rem" }}>
        {!loading && shops.length === 0 && !geoError ? (
          <p style={{ textAlign: "center", color: "#5a3e2b" }}>No coffee shops found.</p>
        ) : (
          shops.map((shop) => (
            <div
              key={shop.place_id}
              style={{
                backgroundColor: "#d7b899",
                padding: "1rem",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                margin: "0.75rem auto",
                maxWidth: "400px",
              }}
            >
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                {shop.name}
              </h2>
              <p style={{ fontSize: "0.875rem" }}>{shop.address}</p>
              <p style={{ fontSize: "0.875rem" }}>Rating: {shop.rating ?? "N/A"} ⭐</p>
              <button
                style={{
                  marginTop: "0.5rem",
                  backgroundColor: "#5a3e2b",
                  color: "#fff",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "0.25rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontFamily: "'Young Serif', serif",
                }}
              >
                Shop Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Discover;
