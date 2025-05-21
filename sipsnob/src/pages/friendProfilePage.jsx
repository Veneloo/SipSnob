import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

const FriendProfilePage = () => {
  const { friendId } = useParams();
  const [friend, setFriend] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 2;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const displayedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  useEffect(() => {
    const fetchFriend = async () => {
      const docRef = doc(db, "users", friendId);
      const snap = await getDoc(docRef);
      if (snap.exists()) setFriend(snap.data());
    };

    const fetchFriendReviews = async () => {
      const snapshot = await getDocs(collection(db, "users", friendId, "reviews"));
      const data = snapshot.docs.map((doc) => doc.data());
      setReviews(data);
    };

    fetchFriend();
    fetchFriendReviews();
  }, [friendId]);

  if (!friend) return <p style={{ textAlign: "center", marginTop: "60px" }}>Loading friend profile...</p>;

  return (
    <div
        className="page-container"
        style={{
            padding: "0px",
            textAlign: "center",
            marginTop: "0px",
            marginBottom: "40px",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "8px", color: "#5a3e2b" }}>{friend.full_name || "No Name"}</h2>
      <p style={{ fontWeight: "bold", color: "#8b5e3c" }}>@{friend.username}</p>
      <p style={{ color: "#5a3e2b" }}>{friend.location}</p>

      <h3 style={{ marginTop: "30px", color: "#5a3e2b" }}>Their Ratings</h3>

      <div className="row-container" style={{ justifyContent: "space-between", width: "360px", margin: "0 auto" }}>
        {currentPage > 1 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="button"
            style={{ backgroundColor: "#d7b898", color: "#5a3e2b", padding: "0 5px", marginBlock: "0 10px" }}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <p style={{ margin: "0", padding: "0", fontSize: "small" }}>Back</p>
          </motion.button>
        )}
        <p style={{ marginBlock: "0 10px" }}>{currentPage} of {totalPages}</p>
        {currentPage < totalPages && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="button"
            style={{ backgroundColor: "#d7b898", color: "#5a3e2b", padding: "0 5px", marginBlock: "0 10px" }}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <p style={{ margin: "0", padding: "0", fontSize: "small" }}>Next</p>
          </motion.button>
        )}
      </div>

      <div style={{ minHeight: "320px", overflowY: "auto", margin: "0 auto", width: "400px", maxWidth: "750px", paddingRight: "8px" }}>
        {reviews.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#5a3e2b" }}>No reviews yet.</p>
        ) : (
          <AnimatePresence>
            {displayedReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                style={{
                  backgroundColor: "#fffaf5",
                  padding: "28px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  marginBottom: "20px",
                  minHeight: "180px",
                  textAlign: "center",
                }}
              >
                <h3 style={{ color: "#5a3e2b", fontSize: "1.3rem", marginBottom: "10px" }}>{review.shopName}</h3>
                <p style={{ fontStyle: "italic", fontWeight: "500", color: "#5a3e2b", marginBottom: "16px", fontSize: "1rem" }}>
                  {review.comment?.trim() !== "" ? review.comment : "No comment"}
                </p>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px", textAlign: "left", margin: "0 auto", maxWidth: "360px", fontSize: "1rem" }}>
                  {Object.entries(review.ratings || {}).map(([key, val]) => (
                    <div key={key} style={{ lineHeight: "1.5" }}>
                      <strong>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:</strong>
                      <span style={{ marginLeft: "8px", color: "#5a3e2b" }}>{val}/10</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default FriendProfilePage;
