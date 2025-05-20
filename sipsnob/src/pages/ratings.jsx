import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
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
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    if (!shop?.name || !currentUser?.uid) return;

    const q = query(
      collection(db, "users", currentUser.uid, "reviews"),
      where("shopId", "==", shop.place_id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map((doc) => ({
        id: doc.data().id,
        firestoreId: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, [shop, currentUser]);

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

    const reviewId = editingReviewId || uuidv4();

    const payload = {
      id: reviewId,
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
      const userReviewRef = doc(db, "users", currentUser.uid, "reviews", reviewId);
      await setDoc(userReviewRef, payload);
      console.log("Saved to user subcollection");

      const publicReviewRef = doc(db, "reviews", reviewId);
      await setDoc(publicReviewRef, payload);
      console.log("Public review saved successfully.");

      setError("");
      alert(editingReviewId ? "Review updated!" : "Rating submitted successfully!");
      setEditingReviewId(null);
      navigate("/home");
    } catch (err) {
      console.error("Submission error:", err.message);
      setError("Something went wrong. Try again.");
    }
  };

  const handleEdit = (review) => {
    setEditingReviewId(review.id);
    setRatings(review.ratings);
    setMilkOptions(review.milkOptions || []);
    setFoodAvailable(review.foodAvailable);
    setSugarFree(review.sugarFree);
    setComment(review.comment || "");
    setError("");
  };

  const handleDelete = async (reviewId) => {
    try {
      const userReviewRef = doc(db, "users", currentUser.uid, "reviews", reviewId);
      await deleteDoc(userReviewRef);

      const publicReviewRef = doc(db, "reviews", reviewId);
      await deleteDoc(publicReviewRef);

      setEditingReviewId(null);
      setError("");
      setRatings({
        drinkConsistency: 5,
        ambiance: 5,
        waitTime: 5,
        pricing: 5,
        customerService: 5,
      });
      setMilkOptions([]);
      setFoodAvailable(null);
      setSugarFree(null);
      setComment("");
    } catch (err) {
      console.error("Error deleting review:", err.message);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="page-container">
      <h1 className="rating-header">{editingReviewId ? "Edit Review" : "Rate Shop"}</h1>
      <button onClick={() => navigate("/discover")}>← Back to Discover</button>

      <h2>{shop.name}</h2>

      {Object.entries(ratings).map(([category, value]) => (
        <div key={category}>
          <label>{category.replace(/([A-Z])/g, " $1")}:</label>
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => handleRatingChange(e, category)}
          />
          <span>{value}</span>
        </div>
      ))}

      <textarea
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div style={{ marginTop: "1rem" }}>
        <label>Alternative Milk Options:</label>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "4px" }}>
          {["Oat", "Almond", "Coconut", "Soy", "Skim"].map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={milkOptions.includes(option)}
                onChange={handleCheckboxChange}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Food Items Available:</label>
        <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
          {["Yes", "No"].map((val) => (
            <label key={val}>
              <input
                type="radio"
                name="food"
                checked={foodAvailable === val}
                onChange={() => setFoodAvailable(val)}
              />
              {val}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Sugar-Free Syrup Options Available:</label>
        <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
          {["Yes", "No"].map((val) => (
            <label key={val}>
              <input
                type="radio"
                name="sugarFree"
                checked={sugarFree === val}
                onChange={() => setSugarFree(val)}
              />
              {val}
            </label>
          ))}
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSubmit}>
        {editingReviewId ? "Update Review" : "Submit Rating"}
      </button>

      <h3 style={{ marginTop: "2rem" }}>Recent Reviews:</h3>
      {reviews.map((review) => (
        <div
          key={review.id}
          style={{
            border: "1px solid #8B5E3C",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "16px",
            backgroundColor: "#fffaf5",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <strong style={{ fontSize: "0.9rem", color: "#5a3e2b" }}>{review.userId}</strong>
          <p style={{ marginTop: "8px", fontStyle: "italic" }}>
            {review.comment || "(No comment provided)"}
          </p>

          <div style={{ fontSize: "0.9rem", marginTop: "8px" }}>
            {Object.entries(review.ratings || {}).map(([key, val]) => (
              <p key={key} style={{ margin: "2px 0" }}>
                <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {val}/10
              </p>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
            <button
              onClick={() => handleEdit(review)}
              style={{
                backgroundColor: "#d7b899",
                color: "#5a3e2b",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #5a3e2b",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(review.id)}
              style={{
                backgroundColor: "#f3c4b4",
                color: "#5a3e2b",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #5a3e2b",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ratings;
