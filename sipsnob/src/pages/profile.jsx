import React, { useEffect, useState } from "react";
import './pages.css';
import sampleImg from "../assets/sampleimg.png";
import { useNavigate } from "react-router-dom";
import FriendItem from "../components/FriendItem";
import RatingItem from "../components/RatingItem";
import CommentItem from "../components/CommentItem";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [sectionOpen, sectionSelect] = useState("comments");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      }
    };
    fetchUser();
  }, []);

  const sampleRatingHistory = [ /* ... same rating data ... */ ];
  const sampleCommentHistory = [ /* ... same comment data ... */ ];
  const sampleFriendList = [ /* ... same friend data ... */ ];

  return (
    <div className="page-container">
      <div className="profile-info column-container" style={{ alignItems: "center" }}>
        <div
          style={{
            height: "150px",
            width: "150px",
            backgroundImage: `url(${sampleImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "100%",
            boxShadow: "0 1px 2px rgb(0,0,0,0.1)",
            border: "1px solid rgb(0,0,0,0.5)",
          }}
        />

        {userData ? (
          <div>
            <h2 style={{ color: "#f5e1c8", marginBottom: "0px" }}>{userData.full_name}</h2>
            <p style={{ color: "#d7b898", marginBlock: "0px" }}>{userData.username ?? "@user"}</p>
            <p style={{ color: "#d7b898", marginBlock: "0px" }}>{userData.location ?? "Location not set"}</p>
            <button
              className="button"
              onClick={() => navigate("/settings")}
              style={{ backgroundColor: "#d7b898", color: "#8B5E3C" }}
            >
              Edit
            </button>
          </div>
        ) : (
          <p style={{ color: "#d7b898" }}>Loading user info...</p>
        )}
      </div>

      {/* Remainder of the profile sections with ratings/comments/friends goes here */}
    </div>
  );
};

export default ProfilePage;
