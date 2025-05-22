import React, { useEffect, useState, useContext } from "react";
import './pages.css';
import sampleImg from "../assets/sampleimg.png";
import RatingItem from "../components/RatingItem";
import BookmarkItem from "../components/BookmarkItem";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { motion } from "framer-motion"; 
import { AuthContext } from "../context/authContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [fullName, setFullName] = useState("User");
  const [bookmarkedShops, setBookmarkedShops] = useState([]);
  const [friendReviews, setFriendReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 1;
  const totalPages = Math.ceil(friendReviews.length / reviewsPerPage);
  const displayedReviews = friendReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setFullName(snap.data().full_name || "User");
        }
      }
    };

    const fetchBookmarks = async () => {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await getDocs(collection(db, `users/${user.uid}/bookmarks`));
        const bookmarks = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setBookmarkedShops(bookmarks);
        console.log("Bookmarks fetched:", bookmarks);
      }
    };

    fetchUserData();
    fetchBookmarks();
  }, []);

  useEffect(() => {
    const fetchFriendReviews = async () => {
      if (!currentUser) return;
      const friendsSnapshot = await getDocs(collection(db, "users", currentUser.uid, "friends"));
      const friendIds = friendsSnapshot.docs.map(doc => doc.id);
      let allReviews = [];

      for (const fid of friendIds) {
        const reviewsSnapshot = await getDocs(collection(db, "users", fid, "reviews"));
        reviewsSnapshot.forEach((doc) => {
          allReviews.push({ ...doc.data(), userId: fid });
        });
      }

      allReviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setFriendReviews(allReviews);
    };

    fetchFriendReviews();
  }, [currentUser]);

  const handleRemoveBookmark = async (bookmarkDetails) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await deleteDoc(doc(db, `users/${user.uid}/bookmarks`, bookmarkDetails.id));
      setBookmarkedShops(prev => prev.filter(shop => shop.id !== bookmarkDetails.id));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          marginBlock: "64px 32px",
          textShadow: "0 2px 2px rgb(0,0,0,0.2)",
          textAlign: "center"
        }}
      >
        Welcome, <span style={{ color: "#8B5E3C" }}>{fullName}</span>
      </motion.h1>

      <h2 style={{ color: "#A2845E", textAlign: "center" }}>Bookmarked shops near you</h2>
      <motion.div
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          width: '100%',
          padding: "16px 24px",
          justifyContent: "flex-start",
          borderRadius: "50px",
          gap: "12px"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {bookmarkedShops.length > 0 ? (
          bookmarkedShops.map((item) => (
            <BookmarkItem
              key={item.id}
              bookmarkDetails={item}
              onRemove={handleRemoveBookmark}
            />
          ))
        ) : (
          <p style={{ color: "#572e05", textAlign: "center", width: "100%" }}>
            You have no bookmarks. Go to Discover & Search to find shops!
          </p>
        )}
      </motion.div>

      {/* Feed */}
<h2 style={{ color: "#5a3e2b", marginTop: "40px" }}>Your Feed</h2>

{friendReviews.length === 0 ? (
  <p style={{ fontStyle: "italic", color: "#8B5E3C" }}>
    No recent reviews from friends.
  </p>
) : (
  <>
    {/* Pagination Controls */}
    <div
      className="row-container"
      style={{ justifyContent: "center", marginBottom: "10px" }}
    >
      {currentPage > 1 && (
        <motion.button
          className="button"
          style={{ marginRight: "12px" }}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Back
        </motion.button>
      )}
      <p style={{ margin: 0 }}>{currentPage} of {totalPages}</p>
      {currentPage < totalPages && (
        <motion.button
          className="button"
          style={{ marginLeft: "12px" }}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </motion.button>
      )}
    </div>

          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              padding: "0 20px",
              marginBottom: "40px",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {displayedReviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: "#fffaf5",
                  border: "1px solid #d7b898",
                  borderRadius: "16px",
                  padding: "20px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  width: "100%",
                  maxWidth: "600px",
                  textAlign: "left"
                }}
              >
                <h4 style={{ color: "#5a3e2b", marginBottom: "4px" }}>{review.shopName}</h4>
                <p style={{ fontSize: "0.9rem", marginBottom: "6px" }}>
                  <strong>{review.username || "A friend"}</strong> rated this on{" "}
                  {new Date(review.timestamp).toLocaleString()}
                </p>
                <p style={{ fontStyle: "italic", marginBottom: "12px" }}>
                  {review.comment?.trim() !== "" ? review.comment : "No comment"}
                </p>
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {Object.entries(review.ratings || {}).map(([key, val]) => (
                    <li key={key}>
                      <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {val}/10
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default HomePage;
