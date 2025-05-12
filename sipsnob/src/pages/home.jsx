import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './pages.css';
import RatingItem from "../components/RatingItem";
import BookmarkItem from "../components/BookmarkItem";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

// TEMP: Sample feed for now
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
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookmarkedShops, setBookmarkedShops] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        await loadBookmarks(u.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadBookmarks = async (uid) => {
    try {
      const snapshot = await getDocs(collection(db, `users/${uid}/bookmarks`));
      const bookmarks = snapshot.docs.map((doc) => doc.data());
      setBookmarkedShops(bookmarks);
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    }
  };

  return (
    <div className="page-container">
      <h1 style={{
        marginTop: "5%",
        textShadow: "0 2px 2px rgb(0,0,0,0.2)",
        textAlign: "left",
      }}>
        Welcome, {user?.displayName || "User"}
      </h1>

      {/* Bookmarked shops */}
      <div>
        <h2 style={{
          marginTop: "0",
          textAlign: "left",
          color: "#A2845E",
          textShadow: "0 1px 1px rgb(0,0,0,0.1)",
        }}>
          Bookmarked shops near you:
        </h2>

        <div className="bookmarkItem"
          style={{
            borderRadius: "50px",
            height: "250px",
            width: "95%",
            overflowX: "scroll",
            overflowY: "hidden",
            display: "flex"
          }}>
          {bookmarkedShops.length === 0 ? (
            <p style={{ marginLeft: "1rem", alignSelf: "center", color: "#5a3e2b" }}>
              You haven’t bookmarked any shops yet.
            </p>
          ) : (
            bookmarkedShops.slice(0, 10).map((shop, index) => (
              <BookmarkItem key={shop.place_id || index} bookmarkDetails={shop} />
            ))
          )}
        </div>

        <button className="button" onClick={() => navigate("/settings#Bookmarks")}>
          View All Bookmarks
        </button>
      </div>

      <br />

      {/* Feed */}
      <h2 style={{
        textAlign: "left",
        color: "#A2845E",
        textShadow: "0 1px 1px rgb(0,0,0,0.1)"
      }}>
        Your Feed:
      </h2>

      <div className="feed">
        {sampleFeed.map((rating, index) => (
          <RatingItem key={index} ratingDetails={rating} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
