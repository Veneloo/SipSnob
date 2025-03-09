import React from "react";
import { useState } from "react";



function LogIn(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    function handleChange(e){
        setUsername(e.target.value)
    }
    //
 
    return (
      <div 
        className="min-h-screen bg-center"
        style={{
            backgroundColor: "#9d7d5d",
        }}>

        <div
            className="container"
            style={{
                blockSize: "75%",
                boxShadow: "4px #8B5E3C",
                justifyContent: "space-around"
                }}>



   
 
        <h1 className="text-2xl font-bold text-[#5a3e2b] mb-4"> Welcome back! </h1>  

    
        <label>Username: </label>
        <input className="w-full p-2 rounded border bg-[#5a3e2b]"
            onChange={setUsername}
            type="text"
            id="username"
            value={username}
        />
        <br></br>
        <label>Password: </label>
        <input 
            type="text"
            id="password"
        />

        </div>
         </div>
    )

};

export default LogIn;