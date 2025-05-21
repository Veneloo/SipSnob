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

  const sampleFeed = [
    {
      shopName: "Blank Street (71st & Lex)",
      user: "Axel",
      timestamp: "2025-04-18T14:00:00",
      ratings: {
        drinkConsistency: 8,
        ambiance: 7,
        waitTime: 5,
        pricing: 6,
        customerService: 9,
      },
      milkOptions: ["Oat", "Almond"],
      foodAvailable: "Yes",
      sugarFree: "No",
      comment: "Cute space! Wish there were more food options.",
      replies: [
        {
          user: "Liliana",
          timestamp: "2025-04-18T16:12:00",
          text: "Totally agree! Their pastry section is lacking 😩",
        },
        {
          user: "Hannah",
          timestamp: "2025-04-18T18:45:00",
          text: "They told me food is coming soon!",
        },
      ],
    },
    {
      shopName: "The Daily Drip",
      user: "John",
      timestamp: "2025-04-14T10:20:00",
      ratings: {
        drinkConsistency: 7,
        ambiance: 6,
        waitTime: 8,
        pricing: 5,
        customerService: 7,
      },
      milkOptions: ["Whole", "Almond"],
      foodAvailable: "Yes",
      sugarFree: "No",
      comment: "Fast service, decent coffee. Good spot for a quick stop.",
      replies: [
        {
          user: "Sarah",
          timestamp: "2025-04-14T12:05:00",
          text: "Their croissants are underrated tbh!",
        }
      ]
    },
    {
      shopName: "Mocha Mornings",
      user: "Emily",
      timestamp: "2025-04-16T13:55:00",
      ratings: {
        drinkConsistency: 9,
        ambiance: 8,
        waitTime: 3,
        pricing: 6,
        customerService: 9,
      },
      milkOptions: ["Oat", "Soy"],
      foodAvailable: "No",
      sugarFree: "Yes",
      comment: "So cute inside! Wish they had food but the drinks are top tier.",
      replies: [
        {
          user: "David",
          timestamp: "2025-04-16T15:10:00",
          text: "Right?? Their iced mocha is insane.",
        }
      ]
    }
  ];

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
            width: '75vw',
            margin: "24px",
            justifyContent: "center",
            borderRadius: "50px",
            textAlign: "center"
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {bookmarkedShops.length > 0 ? (
            bookmarkedShops.slice(0, 10).map((item) => (
              <motion.div
                key={item.id} // ✅ Unique key fix
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

        {bookmarkedShops.length !== 0 && (
          <motion.button
            className="button"
            onClick={() => navigate("/settings#Bookmarks")}
            style={{ color: "#f5e1c8", backgroundColor: "#A2845E" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Bookmarks
          </motion.button>
        )}
      </div>

      <br />

      {/* Feed */}
      <h2 style={{
        color: "#A2845E",
        textShadow: "0 1px 1px rgb(0,0,0,0.1)",
      }}>
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
        {sampleFeed.map((rating, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
          >
            <RatingItem ratingDetails={rating} />
          </motion.div>
        ))}

        {sampleFeed.length === 0 && (
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
