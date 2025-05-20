import React from "react";
import { FaStar } from "react-icons/fa"; // npm install react-icons if not already installed

const BookmarkItem = ({ bookmarkDetails, onRemove }) => {
  const handleRemove = () => {
    const confirmRemove = window.confirm("Do you want to remove this bookmark?");
    if (confirmRemove) {
      onRemove(bookmarkDetails);
    }
  };

  return (
    <div
      className="bookmark-item"
      style={{
        backgroundColor: "#f7e4cf",
        padding: "1rem",
        borderRadius: "12px",
        margin: "0.5rem",
        width: "200px",
        position: "relative",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "0.5rem", color: "#5a3e2b" }}>
        {bookmarkDetails.name}
      </h3>
      <p style={{ fontSize: "0.85rem" }}>{bookmarkDetails.address}</p>

      <FaStar
        onClick={handleRemove}
        style={{
          color: "#FFD700",
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
          fontSize: "1.2rem"
        }}
        title="Remove Bookmark"
      />
    </div>
  );
};

export default BookmarkItem;
