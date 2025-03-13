import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogIn from "./login";
import SignUp from "./signup";

function Launch(){
    const navigate =useNavigate()


    return(

        <div className="min-h-screen bg-[#5a3e2b] font-[Young Serif">
            <div className="max-w-4xl mx-auto p-6">

            {/*Welcome to SipSnob */}
            <p> Welcome to </p>
            <h1 className="font-bold"> SipSnob</h1>

            {/*About Us*/}
            <p>A community-driven coffee discovery app with structured reviews</p>
 
            {/*Login/signup*/}
            <div className="mt-4 space-y-4">
                <button onClick={() => navigate('/login')} className="bg-[#f5e1c8] text-[#5a3e2b] py-10 px-30 rounded hover:bg-[#f5e1c8] transition">
                    Log In
                </button>
                <button onClick={() => navigate('/signup')} className="bg-[#f5e1c8] text-[#5a3e2b] py-2 px-6 rounded hover:bg-[#f5e1c8] transition">
                    Sign In
                </button>

            </div>

            </div>
        </div>


    )
};

export default Launch