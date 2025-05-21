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
  getDoc,
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

  const ratingLabels = {
    drinkConsistency: "☕️ Drink Consistency",
    ambiance: "🪑 Ambiance",
    waitTime: "⏱️ Wait Time",
    pricing: "💸 Pricing",
    customerService: "🤝 Customer Service"
  };

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
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!shop?.name || !currentUser?.uid) return;

    const q = query(
      collection(db, "users", currentUser.uid, "reviews"),
      where("shopId", "==", shop.place_id)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const fetchedReviews = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          let displayName = data.userId;

          try {
            const userDoc = await getDoc(doc(db, "users", data.userId));
            if (userDoc.exists()) {
              displayName = userDoc.data().username || data.userId;
            }
          } catch (e) {
            console.error("Failed to fetch display name:", e);
          }

          return {
            id: data.id,
            displayName,
            timestamp: data.timestamp,
            ...data,
          };
        })
      );

      setReviews(fetchedReviews);
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

      const publicReviewRef = doc(db, "reviews", reviewId);
      await setDoc(publicReviewRef, payload);

      setError("");
      alert(editingReviewId ? "Review updated!" : "Rating submitted!");
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
      console.error("Delete error:", err.message);
      setError("Something went wrong. Try again.");
    }
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="page-container" style={{ fontFamily: "YoungSerif", color: "#5a3e2b" }}>
      <h1 className="rating-header">{editingReviewId ? "Edit Review" : "Rate Shop"}</h1>
      <button
        onClick={() => navigate("/discover")}
        style={{
          backgroundColor: "#A2845E",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "8px",
          marginBottom: "1rem",
          cursor: "pointer"
        }}
      >
        ← Back to Discover
      </button>

      <h2>{shop.name}</h2>


      {Object.entries(ratings).map(([category, value]) => (
  <div key={category} style={{ marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
    {/* Left side: Label */}
    <label style={{ flex: "1", fontWeight: "bold", color: "#5a3e2b", whiteSpace: "nowrap" }}>
      {ratingLabels[category] || category}:
    </label>

    {/* Middle: Slider */}
    <input
      type="range"
      min="1"
      max="10"
      value={value}
      onChange={(e) => handleRatingChange(e, category)}
      style={{
        flex: "3",
        height: "6px",
        borderRadius: "4px",
        background: `linear-gradient(to right, #8B5E3C ${value * 10}%, #f2e3d5 ${value * 10}%)`,
        appearance: "none",
        outline: "none",
        accentColor: "#8B5E3C",
        cursor: "pointer"
      }}
    />

    {/* Right side: Number */}
    <span style={{ flex: "0", fontWeight: "bold", color: "#5a3e2b", minWidth: "30px", textAlign: "right" }}>
      {value}/10
    </span>
  </div>
))}


    <div style={{ marginTop: "1rem", width: "100%" }}>
      <label style={{ 
        fontWeight: "bold", 
        fontSize: "1.1rem", 
        color: "#5a3e2b", 
        marginBottom: "8px", 
        display: "block" 
      }}>
        Leave a comment:
      </label>
      
    <textarea
      placeholder="Share your thoughts about this coffee shop..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      style={{
        width: "100%",
        height: "140px",
        marginTop: "16px",
        padding: "14px",
        borderRadius: "10px",
        border: "2px solid #b79c83",
        fontFamily: "inherit",
        fontSize: "1rem",
        backgroundColor: "#fffaf5",
        color: "#5a3e2b",
        resize: "vertical",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08)"
      }}
    />

  <div style={{ 
    textAlign: "right", 
    fontSize: "0.85rem", 
    marginTop: "6px", 
    color: comment.length >= 400 ? "#b22222" : "#8B5E3C" 
  }}>
    {comment.length}/400 characters
  </div>
</div>

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
              {" " + option}
            </label>
          ))}
        </div>
      </div>
      

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <label>Food Items Available:</label>
        <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "32px",
                marginTop: "6px",
                marginBottom: "8px",
                flexWrap: "wrap"
              }}>
          {["Yes", "No"].map((val) => (
            <label key={val}>
              <input
                type="radio"
                name="food"
                checked={foodAvailable === val}
                onChange={() => setFoodAvailable(val)}
              />
              {" " + val}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <label>Sugar-Free Syrup Options Available:</label>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "4px" }}>
          {["Yes", "No"].map((val) => (
            <label key={val}>
              <input
                type="radio"
                name="sugarFree"
                checked={sugarFree === val}
                onChange={() => setSugarFree(val)}
              />
              {" " + val}
            </label>
          ))}
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
  onClick={handleSubmit}
  style={{
    backgroundColor: "#5a3e2b",
    color: "#fffaf5",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    marginTop: "1rem",
    fontFamily: "inherit",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    transition: "all 0.2s ease-in-out"
  }}
>
  {editingReviewId ? "Update Review" : "Submit Rating"}
</button>

      <h3 style={{ marginTop: "2rem" }}>Your Reviews for this Shop:</h3>
      {reviews.length === 0 && <p>No reviews yet. Be the first to rate this coffee shop!</p>}

      {(expanded ? reviews : reviews.slice(0, 2)).map((review) => (
        <div
        key={review.id}
        style={{
          border: "1px solid #8B5E3C",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "24px",
          backgroundColor: "#fcf8f3",
          boxShadow: "0 4px 10px rgba(90, 62, 43, 0.1)",
          animation: "fadeIn 0.4s ease-in"
        }}
      >
          <strong style={{ fontSize: "0.9rem", color: "#5a3e2b" }}>{review.displayName}</strong>
          <div style={{ fontSize: "0.8rem", color: "#888", marginBottom: "8px" }}>
            Reviewed on {formatDate(review.timestamp)}
          </div>
          <p style={{
              fontStyle: "italic",
              color: "#5a3e2b",
              backgroundColor: "#f5e8dc",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "8px"
            }}>
              {review.comment || " "}
              
            </p>

            {review.milkOptions?.length > 0 && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
            {review.milkOptions.map((milk, idx) => (
              <span key={idx} style={{
                padding: "4px 8px",
                backgroundColor: "#e8d6c3",
                borderRadius: "12px",
                fontSize: "0.85rem",
                color: "#5a3e2b"
              }}>{milk}</span>
            ))}
          </div>
        )}

          <div style={{ fontSize: "0.9rem", marginTop: "8px" }}>
            {Object.entries(review.ratings || {}).map(([key, val]) => (
              <p key={key} style={{ margin: "2px 0" }}>
                <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {val}/10
              </p>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
            <button onClick={() => handleEdit(review)} style={actionBtn}>Edit</button>
            <button onClick={() => handleDelete(review.id)} style={deleteBtn}>Delete</button>
          </div>
        </div>
      ))}

      {reviews.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ marginBottom: "2rem", marginTop: "8px" }}
        >
          {expanded ? "Show Less" : "Show More Reviews"}
        </button>
      )}
    </div>
  );
};

const actionBtn = {
  backgroundColor: "#d7b898",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};

const deleteBtn = {
  backgroundColor: "#A2845E",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};

<style>
{`
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`}
</style>

export default Ratings;
