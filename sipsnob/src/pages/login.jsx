import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import HomePage from "./home";


function LogIn(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
       e.preventDefault()
        if(username==="username" && password === "password"){
            navigate('/pages/home')
        }
        else {
            console.log("Invalid Log In Attempt")
        }
    }
    function handleUsernameChange(e){
        setUsername(e.target.value)
    }
 
    return (
        
      <div 
        style={{
            padding: "10px",
            height:"100vh",
            width:"100vw",
            backgroundColor: "#d7b898",
            fontFamily: "YoungSerif",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column"

        }
        }>

        <div 
        style={{
            width: "100%",
            padding: "10px",
            boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
            textAlign: "left",
            fontWeight: "bold"
        }}>
            <p> SipSnob</p>    
        </div>


        <div 
        style={{
            maxHeight: "40vh",
            maxWidth: "50vw",
            justifyItems: "center",
            padding: "25px",
            boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
            borderRadius: "10px",
            }}>

    <h1
    style={{
        fontWeight: "bold"
    }}> Welcome back! </h1>  

    <form onSubmit={handleSubmit}>
        <label style={{
            textAlign: "left",
            margin: "10px"
        }}>Username: </label>
        <input className="w-full p-2 rounded border bg-[#5a3e2b]"
        style={{
            height: "20px",
            width: "100%",
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
            height: "20px",
            width: "100%",
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
        <button type="submit"
        style={{

            fontFamily: 'YoungSerif',
            margin: "10px",
            textAlign: "center",
            fontSize: "medium",
            backgroundColor: "#8B5E3C",
            padding: "8px 16px 8px 16px",
            borderRadius: "5px",
            border: "0",
            boxShadow: "0 2px 2px rgb(0,0,0,0.2)"
        }}>
            Log In
        </button>
        <br/>
        <button type="submit"
        style={{
            fontFamily: 'YoungSerif',
            margin: "10px",
            textAlign: "center",
            fontSize: "medium",
            backgroundColor: "#8B5E3C",
            padding: "8px 16px 8px 16px",
            borderRadius: "5px",
            border: "0",
            boxShadow: "0 2px 2px rgb(0,0,0,0.2)"
        }}>
            Forgot Password
        </button>
        </form> 
        

</div>
        
        </div>
    )

};

export default LogIn;