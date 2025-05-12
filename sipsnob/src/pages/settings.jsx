import React, { useEffect, useState } from "react";
import './pages.css';
import sampleImg from "../assets/sampleimg.png";
import { useNavigate } from 'react-router-dom';
import BookmarkItem from "../components/BookmarkItem";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";

const Settings = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    location: "",
  });

  const [bookmarkedShops, setBookmarkedShops] = useState([]);

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
      });
    }
  };

  const fetchBookmarks = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const snapshot = await getDocs(collection(db, `users/${user.uid}/bookmarks`));
    const bookmarks = snapshot.docs.map((doc) => doc.data());
    setBookmarkedShops(bookmarks);
  };

  useEffect(() => {
    fetchUserData();
    fetchBookmarks();
  }, []);

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    await setDoc(ref, {
      full_name: profileData.fullName,
      email: profileData.email,
      location: profileData.location,
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
    <div className="page-container" style={{ overflowY: "scroll", maxWidth: "100%", paddingBlock: "24px" }}>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "64px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "100%",
          flexWrap: "wrap",
          textAlign: "left"
        }}>
          <div className="row-container" style={{
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            textShadow: "0 2px 2px rgb(0,0,0,0.2)"
          }}>
            <h1>Settings</h1>
            <div>
              <button className="button" style={{ maxHeight: "fit-content", color: "#5a3e2b" }}>Cancel</button>
              <button
                className="button"
                style={{ maxHeight: "fit-content", backgroundColor: "#5a3e2b" }}
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Section: Profile Details */}
          <div className="setting-section" id="ProfileInfo">
            <h2 style={{ fontSize: "2em", textShadow: "0 2px 2px rgb(0,0,0,0.2)" }}>Profile Details</h2>
            <p style={{ color: "#A2845E", marginTop: "-12px" }}>Edit your personal information</p>
            <hr style={{ height: "1px", width: "100%", border: "0", backgroundColor: "#5a3e2b" }} />

            {/* Profile Picture (placeholder only) */}
            <h3>Change Profile Picture</h3>
            <div className="row-container" style={{ alignItems: "center", flexWrap: "wrap" }}>
              <div style={{
                height: "120px",
                width: "120px",
                backgroundImage: `url(${sampleImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "100%",
                boxShadow: "0 1px 2px rgb(0,0,0,0.1)",
              }} />
              <div className="column-container" style={{ lineHeight: "0.1", marginInline: "32px" }}>
                <p style={{ fontWeight: "bolder" }}>{profileData.fullName}</p>
                <p style={{ color: "#A2845E" }}>{profileData.email}</p>
                <p style={{ color: "#A2845E" }}>{profileData.location || "Add Location"}</p>
              </div>
              <button className="button" style={{ backgroundColor: "#A2845E", maxHeight: "fit-content" }}>Upload Photo</button>
              <button className="button" style={{ color: "#A2845E", maxHeight: "fit-content" }}>Delete</button>
            </div>

            {/* Editable Form */}
            <h3>User Information</h3>
            <form style={{ flexWrap: "wrap" }}>
              <div className="row-container" style={{ margin: "24px" }}>
                <div className="column-container" style={{ marginRight: "24px", width: "100%" }}>
                  <label style={{ alignSelf: "flex-start", color: "#A2845E" }}>First Name:</label>
                  <input
                    className="profile-input"
                    value={firstName}
                    onChange={(e) =>
                      setProfileData({ ...profileData, fullName: `${e.target.value} ${lastName}` })
                    }
                  />
                </div>
                <div className="column-container" style={{ marginLeft: "24px", width: "100%" }}>
                  <label style={{ alignSelf: "flex-start", color: "#A2845E" }}>Last Name:</label>
                  <input
                    className="profile-input"
                    value={lastName}
                    onChange={(e) =>
                      setProfileData({ ...profileData, fullName: `${firstName} ${e.target.value}` })
                    }
                  />
                </div>
              </div>

              <div className="column-container" style={{ margin: "24px" }}>
                <label style={{ alignSelf: "flex-start", color: "#A2845E" }}>Email Address:</label>
                <input className="profile-input" value={profileData.email} disabled />

                <label style={{ alignSelf: "flex-start", color: "#A2845E" }}>Location:</label>
                <input
                  className="profile-input"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                />

                <button className="button" style={{ backgroundColor: "#5a3e2b", maxWidth: "50%", alignSelf: "center" }}>
                  Change Password
                </button>
              </div>
            </form>
          </div>

          {/* Bookmarked Shops */}
          <div className="setting-section" id="Bookmarks" style={{ maxWidth: "90%" }}>
            <h2 style={{ fontSize: "2em", textShadow: "0 2px 2px rgb(0,0,0,0.2)" }}>Bookmarked Shops</h2>
            <p style={{ color: "#A2845E", marginTop: "-12px" }}>View and remove shops from bookmark list</p>

            <div className="row-container" style={{ padding: "auto", overflowX: "scroll", borderRadius: "42px" }}>
              {bookmarkedShops.map((item, index) => (
                <BookmarkItem key={index} bookmarkDetails={item} />
              ))}
            </div>
          </div>

          {/* Log Out */}
          <div id="LogOut" style={{ paddingBlock: "2%" }}>
            <button className="button" onClick={handleLogOut} style={{ backgroundColor: "#A2845E" }}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
