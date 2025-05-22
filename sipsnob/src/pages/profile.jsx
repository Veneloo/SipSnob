import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../context/authContext";
import defaultImg from "../assets/sampleimg.png";
import FriendsSection from "../components/FriendsSection";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [profileSection, setProfileSection] = useState("Ratings")

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

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const displayedReviews = reviews.slice(startIndex, endIndex);

  const handlePageChange = (value) => {
    if (value === "back" && currentPage !== 1) setCurrentPage((prev) => prev - 1);
    if (value === "next" && currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }} className="page-container" style={{ padding: "20px", textAlign: "center", marginTop: "60px", paddingBottom: "100px" }}>
      
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(#f5e1c8,#d7b898,#d7b898,#8B5E3C,#5a3e2b)",
          borderRadius: "24px",
          color: "#f5e1c8",
          padding: "20px",
          margin: "0 auto 40px",
          width: "90%",
          maxWidth: "250px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={profile.profileImage || defaultImg}
          alt="profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "25%",
            objectFit: "cover",
            marginTop: "5px",
            marginBottom: "0px",
          }}
        />
        <div style={{ marginTop: "0" }}>
          <h2 style={{ color: "#5a3e2b", marginBottom: "5px" }}>{profile.full_name || "Name"}</h2>
          <p style={{ color: "#f5e1c8", marginBlock: "0" }}>@{profile.username}</p>
          <p style={{ color: "#f5e1c8", marginBlock: "0" }}>{profile.location}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="button"
          onClick={() => navigate("/settings#ProfileInfo")}
          style={{
            backgroundColor: "#d7b898",
            padding: "5px 15px",
            border: "none",
            marginTop: "12px",
            fontWeight: "bold",
            color: "#5a3e2b",
          }}
        >
          Edit
        </motion.button>
      </motion.div>

<div style={{display: "flex", flexDirection: "row", width: "fit-content" }}>
  <h2 style={{cursor: "pointer",marginInline: "10px", color: profileSection==="Ratings" ? "#5a3e2b": "#8B5E3C"}} onClick={() => setProfileSection("Ratings")}>Ratings</h2>
  <h2 style={{cursor: "pointer",marginInline: "10px", color: profileSection==="Friends" ? "#5a3e2b": "#8B5E3C"}} onClick={() => setProfileSection("Friends")}>Friends</h2>
</div>
      {/* Ratings */}


      <div hidden={profileSection !="Ratings"} style={{
          backgroundColor: "#5a3e2b",
          padding: "20px",
          borderRadius: "12px",
          margin: "0 auto 60px",
          width: "90%",
          maxWidth: "450px", 
          color: "#5a3e2b",
          fontStyle: "italic",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          alignItems: "center",
          justifyContent: "center"}}>
      <h2 hidden={profileSection !="Ratings"} style={{ marginBlock: "30px 0", color: "#f5e1c8" }}>My Ratings</h2>
      

      <div hidden={profileSection !="Ratings"} className="row-container" style={{ justifyContent: "space-between", color: "#d7b898"}}>
        {currentPage !== 1 && (
          <motion.button
          hidden={profileSection !="Ratings"}
            whileHover={{ scale: 1.05 }}
            className="button"
            style={{ backgroundColor: "#d7b898", color: "#5a3e2b", padding: "0 5px", marginBlock: "0 10px" }}
            onClick={() => handlePageChange("back")}
          >
            <p style={{ margin: "0", padding: "0", fontSize: "small" }}>Back</p>
          </motion.button>
        )}
        <p hidden={profileSection !="Ratings"} style={{ marginBlock: "0 10px" }}>{currentPage} of {totalPages}</p>
        {currentPage !== totalPages && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="button"
            style={{ backgroundColor: "#d7b898", color: "#5a3e2b", padding: "0 5px", marginBlock: "0 10px" }}
            onClick={() => handlePageChange("next")}
          >
            <p hidden={profileSection !="Ratings"} style={{ margin: "0", padding: "0", fontSize: "small" }}>Next</p>
          </motion.button>
        )}
      </div>


        {reviews.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#5a3e2b" }}>
            You haven’t rated any coffee shops yet.
          </p>
        ) : (
          <AnimatePresence>
            {displayedReviews.map((review) => (
              <div style={{display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center"}}>
              <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: "24px",
                borderRadius: "20px",
                backgroundColor: "#fff",
                margin: "20px 0",
                maxWidth: "300px",
                backgroundColor:"#d7b898",
                display: "flex",
                flexWrap: "wrap",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                justifySelf: "center",

              
              }}
            >

              <div>
                <h3 style={{ margin: 0 }}>{review.shopName}</h3>
                <small style={{color: "#8B5E3C"}}>Reviewed on {formatDate(review.timestamp)}</small>
                
              </div>

              {review.comment && (
                <p style={{
                fontStyle: "italic",
                backgroundColor: "#f5e1c8",
                color: "#5a3e2b",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                maxWidth: "300px",
                flexWrap: "wrap",
                alignSelf: "center"
              }}>
                {review.comment || " "}
              </p>



              )}


              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", textAlign: "center", margin: "0 auto", maxWidth: "360px", fontSize: "1rem", }}>
              
                
                {Object.entries(review.ratings || {}).map(([key, val]) => (
                  <div key={key} style={{ lineHeight: "1.5" }}>
                    <strong>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:</strong>
                    <span style={{ marginLeft: "8px", color: "#5a3e2b" }}>{val}/10</span>
                  </div>
                ))}
                {review.milkOptions?.length > 0 && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" ,
              alignSelf: "center" }}>
                {review.milkOptions.map((milk, idx) => (
                  <span key={idx} style={{
                    padding: "4px 8px",
                    backgroundColor: "#e8d6c3",
                    borderRadius: "12px",
                    fontSize: "0.85rem",
                    color: "#5a3e2b"
                  }}>{milk}</span>
                ))}
              </div>
            )}
              
    
                </div>
              </motion.div></div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Friends Section */}
      
      <motion.div
      hidden={profileSection !="Friends"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "#5a3e2b",
          padding: "20px",
          borderRadius: "12px",
          margin: "0 auto 60px",
          width: "90%",
          maxWidth: "500px", 
          color: "#8b5e3c",
          fontStyle: "italic",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          border: "2px solid #5a3e2b",

        }}
      
      >
        <FriendsSection />
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
