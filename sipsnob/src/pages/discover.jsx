import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./pages.css";
import { db, auth } from "../fireBaseConfig";
import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Discover = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState("");
  const [bookmarkedShops, setBookmarkedShops] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load user and their bookmarks
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await loadBookmarks(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch user-specific bookmarks
  const loadBookmarks = async (uid) => {
    try {
      const snapshot = await getDocs(collection(db, `users/${uid}/bookmarks`));
      const bookmarks = snapshot.docs.map((doc) => doc.data());
      setBookmarkedShops(bookmarks);
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
    }
  };

  // Add or remove bookmark in Firestore
  const toggleBookmark = async (shop) => {
    if (!currentUser) return;

    const ref = doc(db, `users/${currentUser.uid}/bookmarks`, shop.place_id);
    const isBookmarked = bookmarkedShops.some((s) => s.place_id === shop.place_id);

    try {
      if (isBookmarked) {
        await deleteDoc(ref);
        setBookmarkedShops((prev) =>
          prev.filter((s) => s.place_id !== shop.place_id)
        );
      } else {
        await setDoc(ref, {
          ...shop,
          user_id: currentUser.uid,
          place_id: shop.place_id,
        });
        setBookmarkedShops((prev) => [...prev, shop]);
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  const fetchShops = async (lat, lng) => {
    setLoading(true);
    setGeoError("");

    try {
      const response = await axios.get(
        `https://sip-snob-backend.onrender.com/api/coffee-shops?lat=${lat}&lng=${lng}`
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

      {geoError && (
        <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>{geoError}</p>
      )}

      {loading && (
        <p style={{ textAlign: "center", color: "#5a3e2b" }}>
          Finding the best cafés near you...
        </p>
      )}

      <div style={{ marginTop: "1rem" }}>
        {!loading && shops.length === 0 && !geoError ? (
          <p style={{ textAlign: "center", color: "#5a3e2b" }}>
            No coffee shops found.
          </p>
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
              <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => {
                    localStorage.setItem("selectedShop", JSON.stringify(shop));
                    navigate(`/shop_details/${shop.place_id}`, { state: { shop } });
                  }}
                  style={{
                    backgroundColor: "#5a3e2b",
                    color: "#fff",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "0.25rem",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontFamily: "'Young Serif', serif",
                    flex: 1,
                  }}
                >
                  Shop Details
                </button>

                <button
                  onClick={() => navigate(`/ratings/${shop.place_id}`, { state: { shop } })}
                  style={{
                    backgroundColor: "#8B5E3C",
                    color: "#fff",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "0.25rem",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontFamily: "'Young Serif', serif",
                    flex: 1,
                  }}
                >
                  Rate
                </button>

                <button
                  onClick={() => toggleBookmark(shop)}
                  style={{
                    backgroundColor: bookmarkedShops.some(
                      (s) => s.place_id === shop.place_id
                    )
                      ? "#b03e2f"
                      : "#A67B5B",
                    color: "#fff",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "0.25rem",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontFamily: "'Young Serif', serif",
                    flex: 1,
                  }}
                >
                  {bookmarkedShops.some((s) => s.place_id === shop.place_id)
                    ? "Bookmarked"
                    : "Bookmark"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Discover;
