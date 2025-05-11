import React, { useState, useEffect } from "react";
import sampleImg from "../assets/sampleimg.png"; 
import { db } from "../firebaseConfig"; 
import { doc, onSnapshot } from "firebase/firestore"; 
import { saveBookmark } from "../user"; 
import { removeBookmark } from "../user";

const BookmarkItem = ({ bookmarkDetails, currentUser }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "users", currentUser.uid),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const bookmarks = docSnapshot.data().bookmarks || [];
          setIsBookmarked(bookmarks.some((shop) => shop.name === bookmarkDetails.name));
        }
      }
    );

    return () => unsubscribe();
  }, [currentUser.uid, bookmarkDetails.name]);

  const handleUnfavorite = () => {
    console.log(`Unfavorite ${bookmarkDetails.name}`);
    removeBookmark(currentUser.uid, bookmarkDetails); 
  };

  const handleFavorite = () => {
    console.log(`Favorite ${bookmarkDetails.name}`);
    saveBookmark(currentUser.uid, bookmarkDetails); 
    setIsBookmarked(true); 
  };

  return (
    <div
      style={{
        height: "200px",
        width: "250px",
        borderRadius: "50px",
        backgroundColor: "#572e05",
        padding: "24px",
        marginRight: "75px",
        flexShrink: "0",
        alignContent: "center",
        position: "relative",
        boxShadow: "0 1px 2px rgb(0,0,0,0.1)",
      }}
    >
      {/* Shop Photo */}
      <div
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundImage: `url(${sampleImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50px",
          opacity: "0.4",
          zIndex: "1",
          boxShadow: "0 1px 1px rgb(0,0,0,0.1)",
        }}
      ></div>

      {/* Unfavorite/ Favorite Button */}
      <button
        onClick={isBookmarked ? handleUnfavorite : handleFavorite}
        className="bookmark-button"
        style={{
          zIndex: "2",
          background: "none",
          border: "none",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        {isBookmarked ? "★" : "☆"} {/* Toggle between filled and empty star */}
      </button>

      {/* Shop Name */}
      <h2
        style={{
          textShadow: "0 2px 2px rgb(0,0,0,0.2)",
          color: "#f5e1c8",
          zIndex: "2",
          position: "relative",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {bookmarkDetails.name}
      </h2>
    </div>
  );
};

export default BookmarkItem;
