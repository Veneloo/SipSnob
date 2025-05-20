import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../firebase/auth";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

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
      const user = await signUpUser(email, password, username);

      //Save user to Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        email,
        full_name: username,
        createdAt: new Date(),
      });

      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div
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

      <div
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
        <h1
          style={{
            fontWeight: "bold",
            textShadow: "0 2px 2px rgb(0,0,0,0.2)",
          }}
        >
          Sign Up
        </h1>

        <form onSubmit={handleSignUp}>
          <label>Entert an email </label>
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
          {error && <p style={{ color: "red", margin: "25px" }}>{error}</p>}
          <button type="submit" style={buttonStyle}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
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
