
import React, { useEffect, useState } from "react";
import "./pages.css";
import sampleImg from "../assets/sampleimg.png";
import { getAuth } from "firebase/auth";

const BookmarkItem = ({ bookmarkDetails }) => {
  if (!bookmarkDetails) return null;

  return (
    <div className="bookmark-card">
      <div
        className="bookmark-bg"
        style={{ backgroundImage: `url(${sampleImg})` }}
      />
      <button className="bookmark-button">★</button>
      <h2 className="bookmark-title">{bookmarkDetails.name}</h2>
    </div>
  );
};

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

const RatingItem = ({ ratingDetails }) => {
  const [areCommentsVisible, setCommentsVisible] = useState(false);
  const [arePostActionsVisible, setPostActionsVisible] = useState(false);
  const [isReplyVisible, setReplyVisible] = useState(false);

  const toggleComments = () => {
    setCommentsVisible((prev) => !prev);
    if (areCommentsVisible) setReplyVisible(false);
  };

  const togglePostActions = () => setPostActionsVisible((prev) => !prev);
  const handleReplyButton = () => setReplyVisible((prev) => !prev);

  if (!ratingDetails) return null;

  return (
    <div className="review">
      <div className="row-container space-between">
        <div className="row-container">
          <div className="user-avatar" style={{ backgroundImage: `url(${sampleImg})` }} />
          <h3>{ratingDetails.user} <span style={{ color: "#5a3e2b" }}>rated</span> {ratingDetails.shopName}</h3>
        </div>
        <div className="row-container flex-end">
          <button className="button transparent" onClick={togglePostActions}>...</button>
          {arePostActionsVisible && (
            <div>
              <button className="button transparent">View Profile</button>
              <button className="button transparent">Shop Details</button>
            </div>
          )}
        </div>
      </div>

      <small>{new Date(ratingDetails.timestamp).toDateString()}</small>
      <p>{ratingDetails.comment}</p>

      <div className="rating-details">
        {Object.entries(ratingDetails.ratings).map(([label, value]) => (
          <span key={label}>{formatRatingDetail(label)}: {value}/10</span>
        ))}
      </div>

      <div className="extras">
        <span>Food Available: {ratingDetails.foodAvailable}</span>
        <span>Sugar Free: {ratingDetails.sugarFree}</span>
        <span>Milk Options: {ratingDetails.milkOptions.join(", ") || "None"}</span>
      </div>

      <div className="row-container">
        <button className="button brown" onClick={toggleComments}>
          {areCommentsVisible ? "Close Comments" : "View Comments"}
        </button>
        {areCommentsVisible && (
          <button className="button darker" onClick={handleReplyButton}>
            Leave a Comment
          </button>
        )}
      </div>

      {isReplyVisible && areCommentsVisible && (
        <div className="comment reply">
          <div className="row-container space-between">
            <div className="row-container">
              <div className="user-avatar" style={{ backgroundImage: `url(${sampleImg})` }} />
              <h3>You <span style={{ color: "#d7b899" }}> are replying to: </span>{ratingDetails.user}</h3>
            </div>
          </div>
          <input placeholder="Leaving this comment..." />
          <button className="button">Submit</button>
        </div>
      )}

      {areCommentsVisible && ratingDetails.replies.map((reply, idx) => (
        <div key={idx} className="comment">
          <div className="row-container space-between">
            <div className="row-container">
              <div className="user-avatar" style={{ backgroundImage: `url(${sampleImg})` }} />
              <h3>{reply.user} <span style={{ color: "#5a3e2b" }}>commented:</span></h3>
            </div>
            <button className="button">View Profile</button>
          </div>
          <p>{reply.text}</p>
        </div>
      ))}
    </div>
  );
};

const HomePage = () => {
  const [ratings, setRatings] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserName(currentUser.displayName || "User");
    }

    fetch("https://sip-snob-backend.onrender.com/api/ratings")
      .then((res) => res.json())
      .then(setRatings)
      .catch((err) => console.error("Failed to fetch ratings", err));

    // Placeholder for fetching bookmarks in future
    setBookmarks([{ name: "Coming Soon Café" }]);
  }, []);

  return (
    <div className="page-container">
      <h1>Welcome, {userName}</h1>

      <h2>Bookmarked shops near you:</h2>
      <div className="bookmarkItem scroll">
        {bookmarks.map((item, idx) => (
          <BookmarkItem key={idx} bookmarkDetails={item} />
        ))}
      </div>

      <h2>Your Feed:</h2>
      <div className="feed">
        {ratings.map((rating, idx) => (
          <RatingItem key={idx} ratingDetails={rating} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
