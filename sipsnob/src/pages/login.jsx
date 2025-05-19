import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../firebase/auth"; 

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

  const navigate = useNavigate();

  const handleForgotPassword = () => {
    setForgotPasswordOpen(!forgotPasswordOpen)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      console.log("Logged in as:", user.email);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "2px",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#d7b898",
        fontFamily: "YoungSerif",
        fontWeight: "bold",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <div
        style={{
          top: "0",
          width: "100%",
          padding: "2px",
          textAlign: "center",
          boxShadow: "0 2px 2px rgb(0,0,0,0.1)",
          zIndex: "1000",
          backgroundColor: "#d7b898"
        }}
      >
        <p
          style={{
            fontSize: "24px",
            margin: "12px",
            textShadow: "0 2px 2px rgb(0,0,0,0.2)",
            cursor: "pointer"
          }}
          onClick={() => navigate("/")}
        >
          SipSnob
        </p>
      </div>

      <div
        style={{
          marginTop: "10%",
          width: "fit-content",
          padding: "25px",
          boxShadow: "0 0 4px 4px rgb(0,0,0,0.1)",
          borderRadius: "10px",
          backgroundColor: "#d7b898"
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            textShadow: "0 2px 2px rgb(0,0,0,0.2)",
            margin: "15px",
          }}
        >
          Welcome back!
        </h1>

        <form onSubmit={handleSubmit}>
          <label style={{ textAlign: "left", margin: "10px" }}>Email:</label>
          <input
            style={{
              margin: "10px",
              color: "black",
              height: "25px",
              width: "80%",
              borderRadius: "5px",
              border: "0px",
              boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
              backgroundColor: "#f5e1c89b",
              fontSize: "1rem"
            }}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          <label>Password:</label>
          <input
            style={{
              margin: "10px",
              color: "black",
              height: "25px",
              width: "80%",
              borderRadius: "5px",
              border: "0px",
              boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
              backgroundColor: "#f5e1c89b",
              fontSize: "1rem"
            }}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          {error && (
            <p style={{ color: "red", margin: "25px" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              fontFamily: "YoungSerif",
              margin: "10px",
              fontSize: "medium",
              backgroundColor: "#572e05",
              padding: "8px 24px",
              borderRadius: "5px",
              border: "0",
              boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
              color: "#d7b898",
            }}
          >
            Log in
          </button>

          <br />
          <button
            type="button"
            style={{
              backgroundColor: "#8B5E3C",
              padding: "8px 24px",
              borderRadius: "5px",
              border: "0",
              color: "#d7b898",
              fontFamily: "YoungSerif",
              boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
              fontSize: "medium"
            }}
            onClick={() => handleForgotPassword()}
          >Forgot Password</button>

          {forgotPasswordOpen && (<div className="column" style={{width: "inherit", height: "fit-content", padding: "24px"}}>
              <form>
              <label>Enter your email address</label>
              <input style={{
              margin: "10px",
              color: "black",
              height: "25px",
              width: "80%",
              borderRadius: "5px",
              border: "0px",
              boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
              backgroundColor: "#f5e1c89b",
              fontSize: "1rem"
            }}
            type="email"
            id="reset-email"
            value={email}></input>

<button
            type="submit"
            style={{
              fontFamily: "YoungSerif",
              margin: "10px",
              fontSize: "medium",
              backgroundColor: "#572e05",
              padding: "8px 24px",
              borderRadius: "5px",
              border: "0",
              boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
              color: "#f5e1c89b",
            }}
          >
            Send Password Reset
          </button>
          </form>
          </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default LogIn;
