import React from "react";



function LogIn(){

    return (

        <div>
        <h1> Welcome back! </h1>
        <h3>Username: </h3>
        <input 
            type="text"
            id="username"
        />
        <h3>Password: </h3>
        <input 
            type="text"
            id="password"
        />

        </div>

    )

};

export default LogIn;