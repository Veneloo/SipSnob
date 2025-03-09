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
       <h1>hi</h1> 
    )

};

export default LogIn;