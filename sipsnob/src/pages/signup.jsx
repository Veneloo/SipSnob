import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../firebase/auth";
import { db } from "../firebaseConfig";
import { doc, setDoc, collection, getDocs, query, where } from "firebase/firestore";
import { motion } from "framer-motion";

function SignUp() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setError("All fields required");
      return;
    }

    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!validEmail.test(email)) {
      setError("Invalid Email");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const q = query(collection(db, "users"), where("username", "==", username.toLowerCase()));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setError("Username is already taken.");
        return;
      }

      const userCredential = await signUpUser(email, password);
      const user = userCredential.user;

      if (!user || !user.uid) {
        setError("Authentication failed. Try again.");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        email,
        username: username.toLowerCase(),
        createdAt: new Date(),
        user_id: user.uid,
      });

      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during sign-up.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container"
      style={{
        padding: "10px",
        height: "100%",
        width: "100vw",
        backgroundColor: "#d7b898",
        fontFamily: "YoungSerif",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          top: "0",
          width: "100vw",
          padding: "2px",
          textAlign: "center",
          boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
          zIndex: "1000",
        }}
      >
        <p
          style={{
            fontSize: "24px",
            margin: "12px",
            textShadow: "0 2px 2px rgb(0,0,0,0.2)",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          SipSnob
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          margin: "10%",
          display: "flex",
          flexDirection: "column",
          maxHeight: "fit-content",
          width: "fit-content",
          justifyItems: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "25px",
          boxShadow: "0 0 2px 2px rgb(0,0,0,0.1)",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ fontWeight: "bold", textShadow: "0 2px 2px rgb(0,0,0,0.2)" }}>
          Sign Up
        </h1>

        <form onSubmit={handleSignUp}>
          <label>Enter an email </label>
          <input
            type="email"
            placeholder="johnsmith@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <br />
          <label>Create a username </label>
          <input
            className="input"
            type="text"
            placeholder="jsmith25"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <label>Create a password </label>
          <input
            type="password"
            placeholder="mypassword@"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <br />
          {error && (
            <motion.p
              style={{ color: "red", margin: "25px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={buttonStyle}
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

const buttonStyle = {
  fontFamily: "YoungSerif",
  margin: "10px",
  textAlign: "center",
  fontSize: "medium",
  backgroundColor: "#8B5E3C",
  padding: "8px 16px",
  borderRadius: "5px",
  border: "0",
  boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
  color: "#f5e1c8"
};

export default SignUp;
