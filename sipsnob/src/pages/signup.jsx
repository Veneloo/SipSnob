import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import HomePage from "./home";


function SignUp(){
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const handleSignUp = (e) => {
       e.preventDefault()

        if(!email || !username || !password){
            setError("All fields required")
            return
        }

        const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if(!validEmail.test(email)){
            setError("Invalid Email");
            return;
        }

        if(username.length < 3){
            setError("Username must be at least 3 characters");
            return;
        }

        if(password.length < 6){
            setError("Password must be at least 6 characters");
            return;
        }

        setError("")
        navigate('/pages/home')
    }
    const handleEmailChange = (e) =>{
        const emailValue = e.target.value
        setEmail(emailValue);
    }

    const handleUsernameChange = (e) =>{
        const usernameValue = e.target.value
        setUsername(usernameValue);
    }
    const handlePasswordchange = (e) =>{
        const passwordValue = e.target.value
        setPassword(passwordValue);
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
            maxHeight: "fit-content",
            maxWidth: "50vw",
            justifyItems: "center",
            textAlign: "center",
            padding: "25px",
            boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
            borderRadius: "10px",
            }}>

    <h1
    style={{
        fontWeight: "bold"
    }}>Sign Up</h1>  

    <form onSubmit={handleSignUp}>
        <label style={{
            textAlign: "left",
            margin: "10px"
        }}>Email: </label>
        <input className="w-full p-2 rounded border bg-[#5a3e2b]"
        style={{
            color: "black" ,
            height: "20px",
            width: "100%",
            borderRadius: "5px",
            border: "0px",
            boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
            backgroundColor: "#f5e1c89b"
        }}
            type="email"
            placeholder="johnsmith@email.com"
            id="email"
            value={email}
            onChange={handleEmailChange}

        />
        <br/>
        <label style={{
            textAlign: "left",
            margin: "10px"
        }}>Username: </label>
        <input className="w-full p-2 rounded border bg-[#5a3e2b]"
        style={{
            color: "black" ,
            height: "20px",
            width: "100%",
            borderRadius: "5px",
            border: "0px",
            boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
            backgroundColor: "#f5e1c89b"
        }}
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}

        />
        <br/>
        <label style={{
            textAlign: "left"
        }}>Password: </label>
        <input 
        style={{
            color: "black" ,
            height: "20px",
            width: "100%",
            borderRadius: "5px",
            border: "0px",
            boxShadow: "0 2px 2px rgb(0,0,0,0.2)",
            backgroundColor: "#f5e1c89b"
        }}        
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordchange}

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
            padding: "8px 16px 8px 16px",
            borderRadius: "5px",
            border: "0",
            boxShadow: "0 2px 2px rgb(0,0,0,0.2)"
        }}>
            Sign Up
        </button>
        <br/>

        </form> 
        

</div>
        
        </div>
    )

};

export default SignUp;