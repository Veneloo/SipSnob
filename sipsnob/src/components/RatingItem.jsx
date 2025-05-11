import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; 
import { doc, onSnapshot } from "firebase/firestore";
import sampleImg from "../assets/sampleimg.png";

const RatingItem = ({ ratingId }) => {
  const [ratingDetails, setRatingDetails] = useState(null);

  useEffect(() => {
 
    const unsubscribe = onSnapshot(doc(db, "reviews", ratingId), (docSnap) => {
      if (docSnap.exists()) {
        setRatingDetails(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, [ratingId]);

  if (!ratingDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="review" style={{ padding: "24px", backgroundColor: "#f5e1c8", borderRadius: "12px", boxShadow: "0 1px 2px rgb(0,0,0,0.1)" }}>
      <h3>{ratingDetails.user} rated {ratingDetails.shopName}</h3>
      <p>{ratingDetails.comment}</p>

      <div>
        <h4>Rating Details:</h4>
        {Object.entries(ratingDetails.ratings).map(([label, value]) => (
          <div key={label}>
            <strong>{label}:</strong> {value}/10
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingItem;
