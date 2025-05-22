import React, { useEffect, useState } from "react";
import './pages.css';
import sampleImg from "../assets/sampleimg.png";
import RatingItem from "../components/RatingItem";
import BookmarkItem from "../components/BookmarkItem";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { motion } from "framer-motion"; 

const HomePage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("User");
  const [bookmarkedShops, setBookmarkedShops] = useState([]);
  const [feedRatings, setFeedRatings] = useState([]);

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
      }
    };

    const fetchFeed = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userId = user.uid;
      const ratingsRef = collection(db, `users/${userId}/ratings`);
      const friendsRef = collection(db, `users/${userId}/friends`);

      const ratingsSnap = await getDocs(ratingsRef);
      const userRatings = ratingsSnap.docs.map(doc => ({ ...doc.data(), user: "You", id: doc.id }));

      const friendsSnap = await getDocs(friendsRef);
      const friendRatings = [];

      for (const docRef of friendsSnap.docs) {
        const friendId = docRef.data().friendId;
        const friendRatingsSnap = await getDocs(collection(db, `users/${friendId}/ratings`));
        friendRatingsSnap.forEach(doc => {
          friendRatings.push({ ...doc.data(), user: docRef.data().username || "Friend", id: doc.id });
        });
      }

      const allRatings = [...userRatings, ...friendRatings].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      setFeedRatings(allRatings);
    };

    fetchUserData();
    fetchBookmarks();
    fetchFeed();
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
          textAlign: "left"
        }}
      >
        Welcome, <span style={{ color: "#8B5E3C" }}>{fullName}</span>
      </motion.h1>

      {/* Bookmarked Shops */}
      <div>
        <h2 style={{ color: "#A2845E", textShadow: "0 1px 1px rgb(0,0,0,0.1)" }}>
          Bookmarked shops near you
        </h2>

        <motion.div
          style={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
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
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <BookmarkItem
                  bookmarkDetails={item}
                  onRemove={handleRemoveBookmark}
                />
              </motion.div>
            ))
          ) : (
            <div style={{ width: "inherit", height: "fit-content", margin: "0", color: "#572e05" }}>
              <h3>
                There are no bookmarks to display.
                <br />
                Go to the Discover & Search tab to find shops!
              </h3>
              <button className="button" onClick={() => navigate("/discover")} style={{ backgroundColor: "#A2845E", color: "#f5e1c8" }}>
                Discover Coffee Shops
              </button>
            </div>
          )}
        </motion.div>
      </div>

      <br />

      {/* Feed */}
      <h2 style={{ color: "#A2845E", textShadow: "0 1px 1px rgb(0,0,0,0.1)" }}>
        Your Feed
      </h2>

      <motion.div
        className="feed"
        style={{ width: "95%" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {feedRatings.map((rating, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
          >
            <RatingItem ratingDetails={rating} />
          </motion.div>
        ))}

        {feedRatings.length === 0 && (
          <div style={{ width: "inherit", height: "fit-content", color: "#572e05", backgroundColor: "rgb(90, 62, 43)", padding: "12px", borderRadius: "24px" }}>
            <h3>
              There is no friend activity to display.
              <br />
              Go to the settings tab to follow friends!
            </h3>
            <button className="button" onClick={() => navigate("/settings")} style={{ backgroundColor: "#A2845E", color: "#f5e1c8" }}>
              Add Friends
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
