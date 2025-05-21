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


  //ratings page handling
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 2

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage
  const endIndex = startIndex + reviewsPerPage

  const displayedReviews = reviews.slice(startIndex, endIndex)

  const handlePageChange = (value) => {
    if (value === "back" && currentPage != 1){
      setCurrentPage((currentPage) => currentPage - 1)
    }
    if (value === "next" && currentPage < totalPages){
      setCurrentPage((currentPage) => currentPage + 1)
    }
    return
  }

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
        background: "linear-gradient(#f5e1c8,#d7b898,#d7b898,#8B5E3C,#5a3e2b)",
        borderRadius: "24px",
        color: "#f5e1c8",
        padding: "20px",
        margin: "0 auto",
        width: "90%",
        maxWidth: "250px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",

        border: "1px solid #d7b898",
        
      }}>
        <img
          src={profile.profileImage || defaultImg}
          alt="profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "25%",
            objectFit: "cover",
            border: "2px solid #d7b898",
            marginTop: "5px",
            marginBottom: "0px"
          }}
        />
        <div style={{marginTop: "0"}}>
        <h2 style={{color: "#5a3e2b", marginBottom: "5px"}}>{profile.full_name || "Name"}</h2>
        
          <p style={{color: "#f5e1c8", marginBlock: "0"}}>{profile.username}</p>
          <p style={{color: "#f5e1c8", marginBlock: "0"}}>{profile.location}</p>
        </div>
        
        <button className="button" style={{
          backgroundColor: "#d7b898",
          padding: "5px 15px",
          border: "none",
          marginTop: "12px",
          fontWeight: "bold",
          color: "#5a3e2b"
        }}>
          Edit
        </button>
      </div>

    {/* Ratings Section */}
    <h2 style={{ marginBlock: "30px 0", color: "#5a3e2b" }}>My Ratings</h2>

      {/*page numbers and switching*/}
      <div className="row-container" style={{justifyContent: "space-between", width: "360px"}}>
        {currentPage != 1 && (
        <button className="button" style={{backgroundColor: "#d7b898", color: "#5a3e2b", padding: "0 5px", marginBlock: "0 10px"}} onClick={() => handlePageChange("back")}>
          <p style={{margin: "0", padding: "0", fontSize: "small"}}>Back</p>
        </button>
        )}
        <p style={{marginBlock: "0 10px"}}>{currentPage} of {totalPages}</p>
        {currentPage != totalPages && (
        <button className="button" style={{backgroundColor: "#d7b898", color: "#5a3e2b", padding: "0 5px", marginBlock: "0 10px"}} onClick={() => handlePageChange("next")}>
          <p style={{margin: "0", padding: "0", fontSize: "small"}}>Next</p>
        </button>
        )}
      </div>

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
        <div>

        {displayedReviews.map((review) => (
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
        }</div>)}
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
