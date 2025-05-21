import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../context/authContext";
import defaultImg from "../assets/sampleimg.png";

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser) return;
      const ref = doc(db, "users", currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) setProfile(snap.data());
    };

    const fetchReviews = async () => {
      if (!currentUser) return;
      const snapshot = await getDocs(collection(db, "users", currentUser.uid, "reviews"));
      const data = snapshot.docs.map((doc) => doc.data());
      setReviews(data);
    };

    fetchUser();
    fetchReviews();
  }, [currentUser]);

  return (
    <div
      className="page-container"
      style={{
        padding: "20px",
        textAlign: "center",
        marginTop: "60px", 
      }}
    >
      {/* Profile Card */}
      <div style={{
        backgroundColor: "#5a3e2b",
        borderRadius: "24px",
        color: "#f5e1c8",
        padding: "20px",
        margin: "0 auto",
        width: "90%",
        maxWidth: "250px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <img
          src={profile.profileImage || defaultImg}
          alt="profile"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #f5e1c8",
            marginBottom: "12px"
          }}
        />
        <h2>{profile.full_name || "Name"}</h2>
        <p>{profile.username}</p>
        <p>{profile.location}</p>
        <button style={{
          backgroundColor: "#d7b898",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          marginTop: "12px",
          fontWeight: "bold"
        }}>
          Edit
        </button>
      </div>

    {/* Ratings Section */}
    <h2 style={{ marginTop: "30px", color: "#5a3e2b" }}>My Ratings</h2>
    <div
      style={{
        minHeight: "320px",
        overflowY: "auto",
        margin: "0 auto",
        width: "400px",
        maxWidth: "750px",
        paddingRight: "8px",
      }}
    >
      {reviews.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#5a3e2b" }}>
          You haven’t rated any coffee shops yet.
        </p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            style={{
              backgroundColor: "#fffaf5",
              padding: "28px",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              marginBottom: "20px",
              minHeight: "180px",
              textAlign: "center",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3
              style={{
                color: "#5a3e2b",
                fontSize: "1.3rem",
                marginBottom: "10px",
              }}
            >
              {review.shopName}
            </h3>
            <p
              style={{
                fontStyle: "italic",
                fontWeight: "500",
                color: "#5a3e2b",
                marginBottom: "16px",
                fontSize: "1rem",
              }}
            >
              {review.comment?.trim() !== "" ? review.comment : "No comment"}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "6px",
                textAlign: "left",
                margin: "0 auto",
                maxWidth: "360px",
                fontSize: "1rem",
              }}
            >
              {Object.entries(review.ratings || {}).map(([key, val]) => (
                <div key={key} style={{ lineHeight: "1.5" }}>
                  <strong>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    :
                  </strong>
                  <span style={{ marginLeft: "8px", color: "#5a3e2b" }}>{val}/10</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>


      {/* Friends Section */}
      <h2 style={{ marginTop: "40px", color: "#5a3e2b" }}>My Friends</h2>
      <div style={{
        backgroundColor: "#fffaf5",
        padding: "20px",
        borderRadius: "12px",
        margin: "0 auto",
        width: "90%",
        maxWidth: "500px",
        color: "#8b5e3c",
        fontStyle: "italic",
        marginBottom: "60px"
      }}>
        You haven’t added any friends yet.
      </div>
    </div>
  );
};

export default ProfilePage;
