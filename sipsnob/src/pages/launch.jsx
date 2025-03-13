import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./pages.css"
import LogIn from "./login";
import SignUp from "./signup";

function Launch(){
    const navigate =useNavigate()


    return(

        <div className="page-container"
            style={{
                justifyContent: "center",
                backgroundColor: "#8B5E3C"
            }}>
            <div className="max-w-4xl mx-auto p-6">

            {/*Welcome to SipSnob */}
            <p  style={{ color: "#572e05",  fontSize: "1.5em"}}> Welcome to </p>
            <h1 style={{textShadow: "0 2px 2px rgb(0,0,0,0.2)", margin: "-12px", color: "#f5e1c8", fontWeight: "bold", fontSize: "6em"}}> SipSnob</h1>

            {/*About Us*/}
            <p style={{marginTop: "36px", color: "#572e05"}}>Your guide to the best brews, powered by coffee enthusiasts like you.</p>
 
            {/*Login/signup*/}
            <div className="mt-4 space-y-4">
                <button onClick={() => navigate('/login')} 
                className="button"
                style={{color: "#f5e1c8", backgroundColor: "#572e05"}}>
                    Log In
                </button>
                <button onClick={() => navigate('/signup')} className="button" style={{ color: "#f5e1c8", backgroundColor: "#572e05"}}>
                    Sign Up
                </button>

            </div>

            </div>
        </div>


    )
};

export default Launch