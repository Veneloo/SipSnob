import React, { useState, useContext } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from "../context/authContext";

function SetUsername() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleUpdate = async () => {
    if (!currentUser || username.trim().length < 3) {
      setMessage("Username must be at least 3 characters.");
      return;
    }

    try {
      const q = query(collection(db, "users"), where("username", "==", username.toLowerCase()));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setMessage("That username is already taken.");
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        username: username.toLowerCase(),
      });

      setMessage("Username updated!");
    } catch (err) {
      console.error("Error updating username:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "YoungSerif" }}>
      <h2>Set Your Username</h2>
      <input
        type="text"
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value.toLowerCase())}
        style={{ padding: "6px", width: "300px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleUpdate} style={{ padding: "8px 12px", backgroundColor: "#8B5E3C", color: "#fff", border: "none", borderRadius: "4px" }}>
        Save Username
      </button>
      <p style={{ marginTop: "10px" }}>{message}</p>
    </div>
  );
}

export default SetUsername;
