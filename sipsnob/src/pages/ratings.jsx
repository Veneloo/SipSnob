import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  setDoc,
  doc,
  updateDoc,
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
  
      try {
        const publicReviewRef = doc(db, "reviews", reviewId);
        await setDoc(publicReviewRef, payload);
        console.log("Public review saved successfully.");
      } catch (publicErr) {
        console.error("Public review write failed:", publicErr.code, publicErr.message);
      }
  
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
  
      setError("");
      setEditingReviewId(null);
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

      <h3>Your Reviews for this Shop:</h3>
      {reviews.map((review) => (
        <div key={review.id}>
          <strong>{review.shopName}</strong>
          {Object.entries(review.ratings || {}).map(([category, value]) => (
            <p key={category}>{category.replace(/([A-Z])/g, " $1")}: {value}/10</p>
          ))}
          <p>Milk Options: {(review.milkOptions || []).join(", ") || "None"}</p>
          <p>Food Available: {review.foodAvailable || "Unknown"}</p>
          <p>Sugar-Free: {review.sugarFree || "Unknown"}</p>
          <p>Comment: {review.comment || "(No comment provided)"}</p>
          <button onClick={() => handleEdit(review)}>Edit</button>
          <button onClick={() => handleDelete(review.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Ratings;
