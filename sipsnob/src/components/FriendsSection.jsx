import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { AuthContext } from "../context/authContext";
import FriendItem from "./FriendItem";

const FriendsSection = () => {
  const { currentUser } = useContext(AuthContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [friendList, setFriendList] = useState([]);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("username", "==", usernameInput.toLowerCase())
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      setSearchResult({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
    } else {
      setSearchResult(null);
      alert("User not found.");
    }
  };

  const handleAddFriend = async () => {
    if (!currentUser || !searchResult) return;
    const friendRef = doc(db, "users", currentUser.uid, "friends", searchResult.id);
    await setDoc(friendRef, {
      username: searchResult.username,
      name: searchResult.full_name || "No Name",
    });
    setSearchResult(null);
  };

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
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ color: "#5a3e2b" }}>My Friends</h2>

      {/* Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          placeholder="Search username..."
          style={{
            padding: "8px",
            width: "60%",
            maxWidth: "300px",
            marginRight: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button onClick={handleSearch} className="button">Search</button>
      </div>

      {/* Search result */}
      {searchResult && (
        <div
          style={{
            marginBottom: "20px",
            padding: "12px",
            backgroundColor: "#f5e1c8",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <p><strong>{searchResult.full_name || "No Name"}</strong> (@{searchResult.username})</p>
          <button onClick={handleAddFriend} className="button">Add Friend</button>
        </div>
      )}

      {/* Friend list */}
      {friendList.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#8B5E3C" }}>
          You haven’t added any friends yet.
        </p>
      ) : (
        friendList.map((friend) => (
          <FriendItem key={friend.id} friendDetails={friend} />
        ))
      )}
    </div>
  );
};

export default FriendsSection;
