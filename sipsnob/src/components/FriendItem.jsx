import React from "react";
import sampleImg from "../assets/sampleimg.png";
import ViewProfileButton from "./ViewProfileButton";

const FriendItem = ({ friendDetails }) => {
  if (!friendDetails) return null;

  return (
    <div
      className="row-container friend"
      style={{
        width: "100%",
        height: "fit-content",
        alignItems: "center",
        margin: "12px",
        justifyContent: "space-between",
        backgroundColor: "#d7b899",
        padding: "12px",
        borderRadius: "24px",
        flexWrap: "wrap",
      }}
    >
      {/* Profile Picture and Info */}
      <div className="row-container" style={{ marginInline: "24px", flexWrap: "wrap" }}>
        <div
          style={{
            height: "100px",
            width: "100px",
            backgroundImage: `url(${sampleImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "100%",
            boxShadow: "0 1px 2px rgb(0,0,0,0.1)",
          }}
        />
        <div
          className="column-container"
          style={{ marginInline: "12px", marginBlock: "0", flexWrap: "wrap" }}
        >
          <h3 style={{ fontWeight: "bolder", marginBottom: "0" }}>{friendDetails.name}</h3>
          <p style={{ color: "#8B5E3C", margin: "0" }}>@{friendDetails.username}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="column-container">
        <ViewProfileButton friendId={friendDetails.id} />
        <button className="button" style={{ backgroundColor: "#A2845E", color: "#f5e1c8" }}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default FriendItem;
