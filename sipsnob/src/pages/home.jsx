import React, { useEffect, useState } from "react";
import './pages.css';
import sampleImg from "../assets/sampleimg.png";
import RatingItem from "../components/RatingItem";
import BookmarkItem from "../components/BookmarkItem";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

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
        const bookmarks = snapshot.docs.map((doc) => doc.data());
        setBookmarkedShops(bookmarks);
      }
    };

    fetchUserData();
    fetchBookmarks();
  }, []);

  return (
    <div className="page-container">
      <h1 style={{
        marginTop: "5%",
        textShadow: "0 2px 2px rgb(0,0,0,0.2)",
        textAlign: "left",
      }}>
        Welcome, {fullName}
      </h1>

      {/* Bookmarked Shops */}
      <div>
        <h2 style={{
          marginTop: "0",
          textAlign: "left",
          color: "#A2845E",
          textShadow: "0 1px 1px rgb(0,0,0,0.1)",
        }}>
          Bookmarked shops near you:
        </h2>

        <div className="bookmarkItem" style={{
          borderRadius: "50px",
          height: "250px",
          width: "95%",
          overflowX: "scroll",
          overflowY: "hidden",
          display: "flex"
        }}>
          {bookmarkedShops?.slice(0, 10).map((item, index) => (
            <BookmarkItem key={index} bookmarkDetails={item} />
          ))}
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
