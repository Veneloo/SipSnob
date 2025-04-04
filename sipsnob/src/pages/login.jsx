import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import HomePage from "./home";


function LogIn(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")

    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
       e.preventDefault()
        if(username==="username" && password === "password"){
            navigate('/home')
        }
        else {
            setError("Invalid Log In Attempt")
        }
    }
    function handleUsernameChange(e){
        setUsername(e.target.value)
    }
    function handlePasswordchange(e){
        setPassword(e.target.value)
    }
 
    return (
        
      <div
        style={{
            display: "flex",
            flexWrap: "wrap",
            textWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "2px",
            height:"100vh",
            width:"100vw",
            backgroundColor: "#d7b898",
            fontFamily: "YoungSerif",
            fontWeight: "bold",
            flexDirection: "column",
            textAlign: "center",

        }
        }>

        <div 
         style={{
        top: "0",
        width: "100%",
        padding: "2px",
        textAlign: "center",
        boxShadow: "0 2px 2px rgb(0,0,0,0.1)",
        zIndex: "1000"

      }}>
      <p 
      style={{
        fontSize: "24px",
        margin: "12px",
        textShadow: "0 2px 2px rgb(0,0,0,0.2)"
      }}>SipSnob</p>
      </div>


        <div 
        style={{
            marginTop: "10%",
            maxHeight: "fit-content",
            width: "fit-content",
            justifyItems: "center",
            alignItems: "center",
            padding: "25px",
            boxShadow: "0 0 2px 2px rgb(0,0,0,0.1)",
            borderRadius: "10px",
            }}>

    <h1
    style={{
        fontWeight: "bold",
        textShadow: "0 2px 2px rgb(0,0,0,0.2)",
        margin: "15px",

    }}> Welcome back! </h1>  
    <form onSubmit={handleSubmit}>
        <label style={{
            textAlign: "left",
            margin: "10px",
        }}>Username: </label>
        <input className="w-full p-2 rounded border bg-[#5a3e2b]"
        style={{
            margin: "10px",
            color: "black" ,
            height: "20px",
            width: "80%",
            borderRadius: "5px",
            border: "0px",
            boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
            backgroundColor: "#f5e1c89b"
        }}
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}

        />
        <br/>
        <label style={{
            textAlign: "left"
        }}>Password: </label>
        <input 
        style={{
            margin: "10px",
            color: "black",
            height: "20px",
            width: "80%",
            borderRadius: "5px",
            border: "0px",
            boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
            backgroundColor: "#f5e1c89b"
        }}        
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

        />
<br/>
        {error && <p 
            style={{color: "red",
            margin: "25px"}}>{error}</p>}
        <button type="submit"
        style={{
            fontFamily: 'YoungSerif',
            margin: "10px",
            textAlign: "center",
            fontSize: "medium",
            backgroundColor: "#8B5E3C",
            padding: "8px 24px 8px 24px",
            borderRadius: "5px",
            border: "0",
            boxShadow: "0 2px 2px rgb(0,0,0,0.2)"
        }}>
            Log In
        </button>
        <br/>
        <button className="button" type="submit"
        style={{
            backgroundColor: "#8B5E3C",
            padding: "8px 24px 8px 24px",

        }}>
            Forgot Password
        </button>
        </form> 
        

</div>
        
        </div>
    )

};

export default LogIn;