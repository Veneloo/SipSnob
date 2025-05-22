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
import defaultImage from "../assets/sampleimg.png";

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
    if (!currentUser || !reviewId) {
      setError("Missing user or review ID.");
      return;
    }
  
    try {
      const userReviewRef = doc(db, "users", currentUser.uid, "reviews", reviewId);
      const publicReviewRef = doc(db, "reviews", reviewId);
  
      const [userResult, publicResult] = await Promise.allSettled([
        deleteDoc(userReviewRef),
        deleteDoc(publicReviewRef)
      ]);
  
      const failed = [];
      if (userResult.status === "rejected") failed.push("user review");
      if (publicResult.status === "rejected") failed.push("public review");
  
      if (failed.length > 0) {
        setError(`Review deleted, but not fully removed from: ${failed.join(", ")}`);
      } else {
        setError(""); // success, no error
      }
  
    } catch {
      setError("Something went wrong while deleting the review.");
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
      style={{ fontFamily: "YoungSerif", color: "#5a3e2b", marginBlock: "12px" }}
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
    <motion.div style={{ marginTop: "1rem", width: "100%" }}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}>
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
        backgroundColor: "#f5e1c8",
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
</motion.div>

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
      {reviews.length === 0 && <p>No reviews yet. Be the first to rate this coffee shop!</p>}

      <AnimatePresence >
        {(expanded ? reviews : reviews.slice(0, 2)).map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: "24px",
              borderRadius: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              margin: "20px 0",
              maxWidth: "700px",
              backgroundColor:"#d7b898",
              display: "flex",
              flexWrap: "wrap",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            
            }}
          >


      <div style={{ display: "flex", gap: "16px", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: "75px",
          height: "75px",
          backgroundImage: `url(${review.userId.profileImage || defaultImage})`,
          backgroundSize: "cover",
          borderRadius: "50%"
        }} />

        <div>
          <h3 style={{ margin: 0 }}>{review.displayName || "Anonymous"}</h3>
          <small style={{color: "#8B5E3C"}}>Reviewed on {formatDate(review.timestamp)}</small>
        </div>
        </div> 

        <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", flexDirection: "column" }}>

        <p style={{
              fontStyle: "italic",
              backgroundColor: "#f5e1c8",
              color: "#5a3e2b",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "8px",
              maxWidth: "300px",
              flexWrap: "wrap",
              alignSelf: "center"
            }}>
              {review.comment || " "}
            </p>

        {Object.entries(review.ratings || {}).map(([key, val]) => (
                <p key={key} style={{ margin: "2px 0" }}>
                  <strong>{key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:</strong> {val}/10
                </p>
          ))}
              {review.milkOptions?.length > 0 && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" ,
              alignSelf: "center" }}>
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


      </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
              <button className="button" onClick={() => handleEdit(review)} style={actionBtn}>Edit</button>
              <button className="button" onClick={() => handleDelete(review.id)} style={deleteBtn}>Delete</button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {reviews.length > 2 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          style={{ marginBottom: "3rem", marginTop: "8px" }}
          onClick={() => setExpanded(!expanded)}
          className="button"
        >
          {expanded ? "Show Less" : "Show More Reviews"}
        </motion.button>
      )}
    </motion.div>
  );
};

const actionBtn = {
  backgroundColor: "",
  border: "none",
  padding: "6px 16px",
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
