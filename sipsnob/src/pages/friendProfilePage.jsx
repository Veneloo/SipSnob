import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import defaultImg from "../assets/sampleimg.png";

const FriendProfilePage = () => {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

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
    const fetchFriendData = async () => {
      const docRef = doc(db, "users", friendId);
      const snap = await getDoc(docRef);
      if (snap.exists()) setFriend(snap.data());

      const reviewSnap = await getDocs(collection(db, "users", friendId, "reviews"));
      const data = reviewSnap.docs.map((doc) => doc.data());
      setReviews(data);
    };

    fetchFriendData();
  }, [friendId]);

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleRemoveFriend = async () => {
    try {
      const friendRef = doc(db, "users", currentUser.uid, "friends", friendId);
      await deleteDoc(friendRef);
      alert("Friend removed.");
      navigate("/profile");
    } catch (err) {
      console.error("Error removing friend:", err.message);
    }
  };

  if (!friend) return <p style={{ textAlign: "center", marginTop: "60px" }}>Loading profile...</p>;

  return (
    <div
      className="page-container"
      style={{
        padding: "20px",
        textAlign: "center",
        paddingBottom: "100px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <button
        className="button"
        style={{
          alignSelf: "flex-start",
          backgroundColor: "#8B5E3C",
          border: "2px solid #5a3e2b",
          marginBottom: "12px",
        }}
        onClick={() => navigate("/profile")}
      >
        <span style={{ marginRight: "5px" }}>◀</span>Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "#8B5E3C",
          borderRadius: "24px",
          color: "#f5e1c8",
          padding: "20px 12px",
          margin: "0 auto 40px",
          width: "90%",
          maxWidth: "250px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: "2px solid #5a3e2b",
        }}
      >
        <img
          src={friend.profileImage || defaultImg}
          alt="profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "25%",
            objectFit: "cover",
            border: "2px solid #d7b898",
            marginBottom: "10px"
          }}
        />

        <h2 style={{ color: "#f5e1c8", marginBottom: "5px" }}>{friend.full_name || "Name"}</h2>
        <p style={{ color: "#d7b898", marginBlock: "0" }}>@{friend.username}</p>
        <p style={{ color: "#d7b898", marginBlock: "0" }}>{friend.location}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="button"
          style={{
            marginTop: "12px",
            backgroundColor: "#f5e1c8",
            color: "#5a3e2b",
            border: "none",
            fontWeight: "bold",
          }}
          onClick={handleRemoveFriend}
        >
          Remove Friend
        </motion.button>
      </motion.div>

      <h2 style={{ marginTop: "0", color: "#5a3e2b" }}>Their Ratings</h2>

      <div
        className="row-container"
        style={{ justifyContent: "space-between", margin: "0 auto", width: "360px" }}
      >
        {currentPage > 1 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="button"
            style={{ backgroundColor: "#d7b898", color: "#5a3e2b" }}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <p style={{ margin: 0, fontSize: "small" }}>Back</p>
          </motion.button>
        )}
        <p style={{ margin: 0 }}>{currentPage} of {totalPages}</p>
        {currentPage < totalPages && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="button"
            style={{ backgroundColor: "#d7b898", color: "#5a3e2b" }}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <p style={{ margin: 0, fontSize: "small" }}>Next</p>
          </motion.button>
        )}
      </div>

      <div
        style={{
          minHeight: "320px",
          overflowY: "auto",
          margin: "0 auto",
          width: "400px",
          maxWidth: "750px",
        }}
      >
        {reviews.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#5a3e2b" }}>No reviews yet.</p>
        ) : (
          <AnimatePresence>
            {displayedReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: "24px",
                  borderRadius: "20px",
                  backgroundColor: "#d7b898",
                  marginBottom: "20px",
                  border: "2px solid #5a3e2b",
                  textAlign: "center",
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                }}
              >
                <h3 style={{ margin: 0 }}>{review.shopName}</h3>
                <small style={{ color: "#8B5E3C" }}>
                  Reviewed on {formatDate(review.timestamp)}
                </small>

                {review.comment && (
                  <p
                    style={{
                      fontStyle: "italic",
                      backgroundColor: "#f5e1c8",
                      color: "#5a3e2b",
                      padding: "10px",
                      borderRadius: "8px",
                      margin: "10px 0",
                    }}
                  >
                    {review.comment}
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "left",
                    margin: "0 auto",
                    maxWidth: "360px",
                    fontSize: "1rem",
                  }}
                >
                  {Object.entries(review.ratings || {}).map(([key, val]) => (
                    <div key={key} style={{ lineHeight: "1.5" }}>
                      <strong>
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                      </strong>
                      <span style={{ marginLeft: "8px", color: "#5a3e2b" }}>{val}/10</span>
                    </div>
                  ))}

                  {review.milkOptions?.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginTop: "8px",
                        alignSelf: "center",
                      }}
                    >
                      {review.milkOptions.map((milk, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: "4px 10px",
                            backgroundColor: "#e8d6c3",
                            borderRadius: "12px",
                            fontSize: "0.85rem",
                            color: "#5a3e2b",
                          }}
                        >
                          {milk}
                        </span>
                      ))}
                    </div>
                  )}
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
