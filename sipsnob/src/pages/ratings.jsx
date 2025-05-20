import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { db } from "../firebaseConfig";
import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import "./pages.css";

const Ratings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const shop = location.state?.shop || {};
  const { currentUser } = useContext(AuthContext);

  const [ratings, setRatings] = useState({
    drinkConsistency: 5,
    ambiance: 5,
    waitTime: 5,
    pricing: 5,
    customerService: 5,
  });
  const [milkOptions, setMilkOptions] = useState([]);
  const [foodAvailable, setFoodAvailable] = useState(null);
  const [sugarFree, setSugarFree] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!shop?.name) {
      navigate("/discover");
    }

    const unsubscribe = onSnapshot(doc(db, "users", currentUser?.uid || ""), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userReviews = (data.reviews || []).filter(
          (r) => r.shopId === shop.place_id
        );
        setReviews(userReviews);
      }
    });

    return () => unsubscribe();
  }, [shop, navigate, currentUser]);

  const handleRatingChange = (e, category) => {
    setRatings({ ...ratings, [category]: parseInt(e.target.value) });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setMilkOptions(
      checked ? [...milkOptions, value] : milkOptions.filter((item) => item !== value)
    );
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      setError("You must be logged in to submit a review.");
      return;
    }

    const payload = {
      shopId: shop.place_id,
      shopName: shop.name,
      ratings,
      milkOptions,
      foodAvailable,
      sugarFree,
      comment,
      timestamp: new Date().toISOString(),
      userId: currentUser.uid,
    };

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        reviews: arrayUnion(payload),
      });

      alert("Rating submitted successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Error submitting rating:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: "700px", margin: "2rem auto", padding: "2rem", backgroundColor: "#f5e1c8", borderRadius: "12px", border: "2px solid #8B5E3C", minHeight: "100vh", boxSizing: "border-box" }}>
      <h1 className="rating-header">Rate Shop</h1>
      <button onClick={() => navigate("/discover")} style={{ backgroundColor: "#d7b899", border: "1px solid #5a3e2b", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Young Serif', serif", marginBottom: "1rem", color: "#5a3e2b", fontWeight: "bold" }}>
        ← Back to Discover
      </button>

      <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>{shop.name}</h2>

      {shop.photos?.[0]?.photo_reference && (
        <img
          src={`https://sip-snob-backend.onrender.com/api/photo?ref=${shop.photos[0].photo_reference}`}
          alt="Coffee Shop"
          style={{ width: "100%", borderRadius: "8px", border: "1px solid #8B5E3C", marginBottom: "2rem" }}
        />
      )}

      {Object.entries(ratings).map(([category, value]) => (
        <div key={category} style={{ marginBottom: "1.5rem", textAlign: "left" }}>
          <label className="rating-label">{category.replace(/([A-Z])/g, " $1")}:</label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input type="range" min="1" max="10" value={value} onChange={(e) => handleRatingChange(e, category)} />
            <span>{value}</span>
          </div>
        </div>
      ))}

      <textarea
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ width: "100%", height: "80px", marginBottom: "1rem" }}
      />

      {/* Milk Options */}
      <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
        <label className="rating-label">Alternative Milk Options:</label>
        <div className="row-container" style={{ gap: "16px", marginTop: "8px" }}>
          {["Oat", "Almond", "Coconut", "Soy", "Skim"].map((option) => (
            <label key={option}>
              <input type="checkbox" value={option} checked={milkOptions.includes(option)} onChange={handleCheckboxChange} /> {option}
            </label>
          ))}
        </div>
      </div>

      {/* Food Options */}
      <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
        <label className="rating-label">Food Items Available:</label>
        <div className="row-container" style={{ gap: "16px", marginTop: "8px" }}>
          {["Yes", "No"].map((val) => (
            <label key={val}>
              <input type="radio" name="food" checked={foodAvailable === val} onChange={() => setFoodAvailable(val)} /> {val}
            </label>
          ))}
        </div>
      </div>

      {/* Sugar Free */}
      <div style={{ marginBottom: "2rem", textAlign: "left" }}>
        <label className="rating-label">Sugar-Free Syrup Options Available:</label>
        <div className="row-container" style={{ gap: "16px", marginTop: "8px" }}>
          {["Yes", "No"].map((val) => (
            <label key={val}>
              <input type="radio" name="sugarFree" checked={sugarFree === val} onChange={() => setSugarFree(val)} /> {val}
            </label>
          ))}
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="button" style={{ backgroundColor: "#8B5E3C", color: "white", fontWeight: "bold" }} onClick={handleSubmit}>
        Submit Rating
      </button>

      {/* Display Real-Time Reviews */}
      <h3 style={{ marginTop: "2rem" }}>Recent Reviews:</h3>
      {reviews.map((review, idx) => (
        <div key={idx} style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>
          <strong>{review.userId}</strong>
          <p>{review.comment || "(No comment provided)"}</p>
        </div>
      ))}
    </div>
  );
};

export default Ratings;
