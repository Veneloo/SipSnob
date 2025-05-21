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
import { motion, AnimatePresence } from "framer-motion";
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
      await setDoc(userReviewRef, payload, { merge: true });

      const publicReviewRef = doc(db, "reviews", reviewId);
      await setDoc(publicReviewRef, payload, { merge: true });
  
      alert(editingReviewId ? "Review updated!" : "Rating submitted!");
      setEditingReviewId(null);
      setError("");
      navigate("/home");
  
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
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
    <motion.div
      className="page-container"
      style={{ fontFamily: "YoungSerif", color: "#5a3e2b" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h1 className="rating-header" initial={{ y: -10 }} animate={{ y: 0 }}>
        {editingReviewId ? "Edit Review" : "Rate Shop"}
      </motion.h1>

      <motion.button
        onClick={() => navigate("/discover")}
        whileHover={{ scale: 1.05 }}
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
      </motion.button>

      <motion.h2 initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>
        {shop.name}
      </motion.h2>

      {Object.entries(ratings).map(([category, value]) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px"
          }}
        >
          <label style={{ flex: "1", fontWeight: "bold", whiteSpace: "nowrap" }}>
            {ratingLabels[category] || category}:
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => handleRatingChange(e, category)}
            style={{
              flex: "3",
              height: "6px",
              background: `linear-gradient(to right, #8B5E3C ${value * 10}%, #f2e3d5 ${value * 10}%)`,
              borderRadius: "4px",
              appearance: "none",
              outline: "none",
              accentColor: "#8B5E3C",
              cursor: "pointer"
            }}
          />
          <span style={{ flex: "0", fontWeight: "bold", minWidth: "30px", textAlign: "right" }}>
            {value}/10
          </span>
        </motion.div>
      ))}

      {/* You can apply motion.div to other sections like comments, checkboxes, etc., similarly if desired */}

      {error && <motion.p style={{ color: "red" }} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>{error}</motion.p>}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
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
      </motion.button>

      <h3 style={{ marginTop: "2rem" }}>Your Reviews for this Shop:</h3>

      <AnimatePresence>
        {(expanded ? reviews : reviews.slice(0, 2)).map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            style={{
              border: "1px solid #8B5E3C",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
              backgroundColor: "#fcf8f3",
              boxShadow: "0 4px 10px rgba(90, 62, 43, 0.1)",
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
          </motion.div>
        ))}
      </AnimatePresence>

      {reviews.length > 2 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          style={{ marginBottom: "2rem", marginTop: "8px" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Show More Reviews"}
        </motion.button>
      )}
    </motion.div>
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

export default Ratings;
