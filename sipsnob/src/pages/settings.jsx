import React, { useEffect, useState } from "react";
import './pages.css';
import sampleImg from "../assets/sampleimg.png";
import { useNavigate } from 'react-router-dom';
import BookmarkItem from "../components/BookmarkItem";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, collection, getDocs, query, where } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

const Settings = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    location: "",
    username: ""
  });

  const [changePassword, setChangePassword] = useState(false);
  const [bookmarkedShops, setBookmarkedShops] = useState([]);

  const handleChangePassword = () => {
    setChangePassword(!changePassword);
  };

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      setProfileData({
        fullName: data.full_name || "",
        email: data.email || "",
        location: data.location || "",
        username: data.username || ""
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to update your profile.");
      return;
    }

    const trimmedUsername = profileData.username.trim().toLowerCase();
    if (!trimmedUsername || trimmedUsername.length < 3) {
      alert("Username must be at least 3 characters.");
      return;
    }

    const q = query(collection(db, "users"), where("username", "==", trimmedUsername));
    const snapshot = await getDocs(q);
    const isTaken = snapshot.docs.some((docSnap) => docSnap.id !== user.uid);
    if (isTaken) {
      alert("Username is already taken.");
      return;
    }

    const ref = doc(db, "users", user.uid);
    await setDoc(ref, {
      full_name: profileData.fullName,
      email: profileData.email,
      location: profileData.location,
      username: trimmedUsername,
      user_id: user.uid,
    }, { merge: true });

    alert("Profile updated!");
  };

  const handleLogOut = () => {
    navigate("/");
  };

  const firstName = profileData.fullName.split(" ")[0] || "";
  const lastName = profileData.fullName.split(" ")[1] || "";

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          textAlign: "left",
          margin: "12px",
          width: "100%"
        }}
      >
        <motion.div
          className="row-container"
          style={{ width: "100%", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", textShadow: "0 2px 2px rgb(0,0,0,0.2)" }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1>Settings</h1>
          <div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="button"
            style={{ backgroundColor: "#A2845E", color: "#5a3e2b" }}
            onClick={() => navigate("/home")}
          >
            Cancel
          </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="button"
              style={{ backgroundColor: "#5a3e2b" }}
              onClick={(e) => {
                e.preventDefault();
                handleSaveChanges();
              }}
            >
              Save Changes
            </motion.button>
          </div>
        </motion.div>

        {/* Profile Info Section */}
        <motion.div className="setting-section" id="ProfileInfo" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 style={{ fontSize: "2em", textShadow: "0 2px 2px rgb(0,0,0,0.2)" }}>Profile Details</h2>
          <p style={{ color: "#A2845E", marginTop: "-12px" }}>Edit your personal information</p>
          <hr style={{ height: "1px", width: "100%", border: "0", backgroundColor: "rgba(90, 62, 43, 0.4)" }} />

          <h3>Change Profile Picture</h3>
          <div className="row-container" style={{ alignItems: "center", flexWrap: "wrap", backgroundColor: "rgba(90, 62, 43, 0.05)", padding: "12px", width: "fit-content", borderRadius: "24px" }}>
            <div style={{
              height: "120px",
              width: "120px",
              backgroundImage: `url(${sampleImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "100%",
              boxShadow: "0 1px 2px rgb(0,0,0,0.1)"
            }} />
            <div className="column-container" style={{ lineHeight: "0.1", marginInline: "32px" }}>
              <p style={{ fontWeight: "bolder" }}>{profileData.fullName}</p>
              <p style={{ color: "#A2845E" }}>{profileData.email}</p>
              <p style={{ color: "#A2845E" }}>{profileData.location || "Add Location"}</p>
            </div>
            {/* <button className="button">Upload Photo</button>
            <button className="button" style={{ backgroundColor: "#A2845E", color: "#5a3e2b" }}>Delete</button> */}
          </div>

          <h3>User Information</h3>
          <form style={{ flexWrap: "wrap", backgroundColor: "rgba(90, 62, 43, 0.05)", padding: "12px 12px 1px 12px", borderRadius: "24px" }}>
            {/* First & Last Name Inputs */}
            <div className="row-container" style={{ margin: "24px" }}>
              <div className="column-container" style={{ marginRight: "24px", width: "100%" }}>
                <label style={{ color: "#A2845E" }}>First Name:</label>
                <input className="input settings" value={firstName} onChange={(e) => setProfileData({ ...profileData, fullName: `${e.target.value} ${lastName}` })} />
              </div>
              <div className="column-container" style={{ marginLeft: "24px", width: "100%" }}>
                <label style={{ color: "#A2845E" }}>Last Name:</label>
                <input className="input settings" value={lastName} onChange={(e) => setProfileData({ ...profileData, fullName: `${firstName} ${e.target.value}` })} />
              </div>
            </div>

            {/* Other Fields */}
            <div className="column-container" style={{ margin: "24px" }}>
              <label style={{ color: "#A2845E" }}>Email Address:</label>
              <input className="input settings" value={profileData.email} disabled />

              <label style={{ color: "#A2845E" }}>Username:</label>
              <input className="input settings" value={profileData.username} onChange={(e) => setProfileData({ ...profileData, username: e.target.value })} />

              <label style={{ color: "#A2845E" }}>Location:</label>
              <input className="input settings" value={profileData.location} onChange={(e) => setProfileData({ ...profileData, location: e.target.value })} />

              {/* <button className="button" style={{ backgroundColor: "#5a3e2b", maxWidth: "50%", alignSelf: "center" }} onClick={handleChangePassword}>
                Change Password
              </button> */}

              <AnimatePresence>
                {changePassword && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "fit-content", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: "hidden", marginTop: "12px" }}
                  >
                    <label style={{ color: "#A2845E" }}>New Password:</label>
                    <input className="input settings" type="password" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>


        {/* Log Out */}
        <motion.div
          id="LogOut"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ paddingBlock: "2%" }}
        >
          <button className="button" onClick={handleLogOut} style={{ backgroundColor: "#A2845E" }}>
            Log Out
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
