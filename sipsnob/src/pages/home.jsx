import React, { useEffect, useState } from "react";
import './pages.css';
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import RatingItem from "../components/RatingItem";
import BookmarkItem from "../components/BookmarkItem";

const HomePage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("User");
  const [bookmarkedShops, setBookmarkedShops] = useState([]);
  const [feedRatingIds, setFeedRatingIds] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setFullName(data.full_name || "User");

        const feedEntries = [];

        // Add user's own reviews
        const userReviewsRef = collection(db, `users/${user.uid}/reviews`);
        const userReviewSnap = await getDocs(userReviewsRef);
        userReviewSnap.forEach(doc => {
          feedEntries.push({ id: doc.id, timestamp: doc.data().timestamp });
        });

        // Add friends' reviews
        const friendsRef = collection(db, `users/${user.uid}/friends`);
        const friendsSnap = await getDocs(friendsRef);
        for (const friendDoc of friendsSnap.docs) {
          const friendId = friendDoc.id;
          const friendReviewsRef = collection(db, `users/${friendId}/reviews`);
          const friendReviewSnap = await getDocs(friendReviewsRef);
          friendReviewSnap.forEach(doc => {
            feedEntries.push({ id: doc.id, timestamp: doc.data().timestamp });
          });
        }

        // Sort by timestamp (newest first)
        feedEntries.sort((a, b) => {
          const aTime = a.timestamp?.toMillis?.() || 0;
          const bTime = b.timestamp?.toMillis?.() || 0;
          return bTime - aTime;
        });

        setFeedRatingIds(feedEntries.map(entry => entry.id));
      }
    };

    const fetchBookmarks = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snapshot = await getDocs(collection(db, `users/${user.uid}/bookmarks`));
      const bookmarks = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBookmarkedShops(bookmarks);
    };

    fetchUserData();
    fetchBookmarks();
  }, []);

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
    <motion.div className="page-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          marginBlock: "64px 32px",
          textShadow: "0 2px 2px rgb(0,0,0,0.2)",
          textAlign: "left"
        }}
      >
        Welcome, <span style={{ color: "#8B5E3C" }}>{fullName}</span>
      </motion.h1>

      {/* Bookmarked Shops */}
      <div>
        <h2 style={{ color: "#A2845E", textShadow: "0 1px 1px rgb(0,0,0,0.1)" }}>
          Your Bookmarked Shops
        </h2>
        <motion.div
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            width: '70vw',
            margin: "24px",
            justifyContent: "flex-start",
            borderRadius: "50px",
            textAlign: "center"
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {bookmarkedShops.length > 0 ? (
            bookmarkedShops.map((item) => (
              <BookmarkItem key={item.id} bookmarkDetails={item} onRemove={handleRemoveBookmark} />
            ))
          ) : (
            <div style={{ width: "650px", height: "fit-content", margin: "auto", color: "#572e05",backgroundColor: "rgba(90, 62, 43, 0.3)", padding: "12px", borderRadius: "32px"}}>
              <h3>There are no bookmarks to display.<br />Go to the Discover tab to find shops!</h3>
              <button className="button" onClick={() => navigate("/discover")} style={{ backgroundColor: "#A2845E", color: "#f5e1c8" }}>
                Discover Coffee Shops
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Feed Section */}
      <br />
      <h2 style={{ color: "#A2845E", textShadow: "0 1px 1px rgb(0,0,0,0.1)" }}>Your Feed</h2>
      <motion.div
        className="feed"
        style={{ width: "95%" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {feedRatingIds.length > 0 ? (
          feedRatingIds.map((id, index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
            >
              <RatingItem ratingId={id} />
            </motion.div>
          ))
        ) : (
          <div style={{
            width: "650px",
            height: "fit-content",
            color: "#572e05",
            backgroundColor: "rgba(90, 62, 43, 0.3)",
            padding: "12px",
            borderRadius: "32px"
          }}>
            <h3>There is no friend activity to display.<br />Go to the settings tab to follow friends!</h3>
            <button className="button" onClick={() => navigate("/profile")} style={{ backgroundColor: "#A2845E", color: "#f5e1c8" }}>
              Add Friends
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
