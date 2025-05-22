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
      margin: "20px",
      maxWidth: "325px",
      backgroundColor:"#d7b898",
      display: "flex",
      flexWrap: "wrap",
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div style={{ display: "flex", gap: "16px", flexDirection: "column", alignItems: "center"}}>
        <div style={{
          width: "50px",
          height: "50px",
          backgroundImage: `url(${userInfo?.pfp || sampleImg})`,
          backgroundSize: "cover",
          borderRadius: "50%"
        }} />

        <div>
          <h3 style={{ margin: 0 }}>{userInfo?.username || "Anonymous"}<span style={{color: "#8B5E3C"}}>{" "}rated{" "}</span>  {ratingDetails.shopName}</h3>
          <small style={{color: "#8B5E3C"}}>
            {ratingDetails.timestamp
              ? new Date(ratingDetails.timestamp).toLocaleString()
              : "Unknown date"}
          </small>
        </div>
      </div>

      <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", justifySelf: "center" }}>

        {ratingDetails.comment &&
        (<p style={{
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
          {ratingDetails.comment || " "}
        </p>)}

      <div style={{ marginTop: "16px", alignItems: "center"}}>
        {Object.entries(ratingDetails.ratings || {}).map(([key, val]) => (
                <p key={key} style={{ margin: "2px 0" }}>
                  <strong>{key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:</strong> {val}/10
                </p>
          ))}
              {ratingDetails.milkOptions?.length > 0 && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px",
              alignSelf: "center" }}>
                {ratingDetails.milkOptions.map((milk, idx) => (
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

        <p><strong>Food Available:</strong> {ratingDetails.foodAvailable || "Unknown"}</p>
        <p><strong>Sugar-Free Syrups:</strong> {ratingDetails.sugarFree || "Unknown"}</p>
      </div>
    </div></div>
  );
};

export default RatingItem;