// RatingItem.jsx
import React, { useState, useEffect } from "react";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import sampleImg from "../assets/sampleimg.png";

const formatRatingDetail = (label) => {
  const map = {
    drinkConsistency: "Drink Consistency",
    ambiance: "Ambiance",
    waitTime: "Wait Time",
    pricing: "Pricing",
    customerService: "Customer Service",
    milkOptions: "Milk Options",
    foodAvailable: "Food Available",
    sugarFree: "Sugar Free",
  };
  return map[label] || label;
};

const RatingItem = ({ ratingId }) => {
  const [ratingDetails, setRatingDetails] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!ratingId) return;

    const unsubscribe = onSnapshot(doc(db, "reviews", ratingId), async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRatingDetails(data);

        if (data.userId) {
          const userRef = doc(db, "users", data.userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserInfo(userSnap.data());
          }
        }
      }
    });

    return () => unsubscribe();
  }, [ratingId]);

  if (!ratingDetails) return null;

  return (
    <div className="review" style={{
      padding: "24px",
      borderRadius: "20px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      margin: "20px 0",
      maxWidth: "700px"
    }}>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          width: "50px",
          height: "50px",
          backgroundImage: `url(${userInfo?.pfp || sampleImg})`,
          backgroundSize: "cover",
          borderRadius: "50%"
        }} />
        <div>
          <h3 style={{ margin: 0 }}>{userInfo?.username || "Anonymous"} rated {ratingDetails.shopName}</h3>
          <small>{new Date(ratingDetails.timestamp?.toDate?.() || Date.now()).toLocaleString()}</small>
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        {Object.entries(ratingDetails.ratings || {}).map(([category, value]) => (
          <p key={category}>
            <strong>{formatRatingDetail(category)}:</strong> {value}/10
          </p>
        ))}

        <p><strong>Food Available:</strong> {ratingDetails.foodAvailable || "Unknown"}</p>
        <p><strong>Sugar-Free Syrups:</strong> {ratingDetails.sugarFree || "Unknown"}</p>
        <p>
          <strong>Milk Options:</strong>{" "}
          {(ratingDetails.milkOptions || []).join(", ") || "None"}
        </p>
      </div>
    </div>
  );
};

export default RatingItem;
