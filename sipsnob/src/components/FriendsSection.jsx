import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets/sampleimg.png";

const FriendsSection = () => {
  const { currentUser } = useContext(AuthContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("username", "==", usernameInput.toLowerCase())
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docData = snapshot.docs[0];
      setSearchResult({ ...docData.data(), id: docData.id });
    } else {
      setSearchResult(null);
      alert("User not found.");
    }
  };

  // Add friend
  const handleAddFriend = async () => {
    if (!currentUser || !searchResult) return;
    const friendRef = doc(db, "users", currentUser.uid, "friends", searchResult.id);
    await setDoc(friendRef, {
      username: searchResult.username,
      name: searchResult.full_name || "No Name",
      profileImage: searchResult.profileImage || null,
    });
    setSearchResult(null);
  };

  // Remove friend
  const handleRemoveFriend = async (friendId) => {
    const friendRef = doc(db, "users", currentUser.uid, "friends", friendId);
    await deleteDoc(friendRef);
  };

  // Real-time friend list
  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = onSnapshot(
      collection(db, "users", currentUser.uid, "friends"),
      (snapshot) => {
        const friends = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFriendList(friends);
      }
    );
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div style={{ marginTop: "24px" }}>
      <h2 style={{ color: "#f5e1c8"}}>View and Add Friends</h2>

      <div style={{
        backgroundColor: "#d7b899",
        padding: "20px",
        borderRadius: "12px",
        margin: "0 auto",
        width: "90%",
        maxWidth: "600px",
        flexWrap: "wrap"
        
      }}>
       

        {/* Search Bar */}
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="Search username..."
            style={{
              padding: "10px",
              width: "60%",
              maxWidth: "300px",
              borderRadius: "10px",
              border: "2px solid #5a3e2b",
              backgroundColor: "#d7b899",
              color: "#5a3e2b"
            }}
          />
          <button onClick={handleSearch} className="button" style={{ backgroundColor: "#5a3e2b", color: "#f5e1c8" }}>
            Search
          </button>
        </div>

        {/* Search Result */}
        {searchResult && (
          <div
            style={{
              backgroundColor: "#e3cbb2",
              padding: "12px",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            <p>
              <strong>{searchResult.full_name || "No Name"}</strong> @{searchResult.username}
            </p>
            <button onClick={handleAddFriend} className="button" style={{ backgroundColor: "#8B5E3C", color: "#fff" }}>
              Add Friend
            </button>
          </div>
        )}

        {/* Friend List */}
        {friendList.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#8B5E3C" }}>You haven’t added any friends yet.</p>
        ) : (
          friendList.map((friend) => (
            <div key={friend.id}
              style={{
                backgroundColor: "#d7b899",
                borderRadius: "24px",
                padding: "12px",
                margin: "12px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                border: "2px solid #5a3e2b",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={friend.profileImage || defaultImg}
                  alt="profile"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "16px"
                  }}
                />
                <div>
                  <h3 style={{ margin: 0 }}>{friend.name}</h3>
                  <p style={{ margin: 0, color: "#5a3e2b" }}>@{friend.username}</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexWrap: "wrap" }}>
                <button
                  onClick={() => navigate(`/profile/${friend.id}`)}
                  className="button"
                  style={{ backgroundColor: "#5a3e2b", color: "#f5e1c8" }}
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleRemoveFriend(friend.id)}
                  className="button"
                  style={{ backgroundColor: "#A2845E", color: "#f5e1c8" }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendsSection;
