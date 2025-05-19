import React, { useState } from "react";
import sampleImg from "../assets/sampleimg.png"
import ViewProfileButton from "../components/ViewProfileButton";
import { waitForPendingWrites } from "firebase/firestore";


const CommentItem = ({commentDetails}) =>{
    if (!commentDetails){
        return null;
    }
    return(
        <div className="comment" >
            {/*User */}
            
                {/*PFP and name */}
            <div className="row-container" style={{justifyContent: "space-between", alignContent: "flex-start", flexWrap: "wrap"}}>
                <div className="row-container" style={{alignItems: "center"}}>
                <div style={{
                height: "50px",
                width: "50px",
                backgroundImage: `url(${sampleImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "100%", 
                boxShadow: "0 1px 2px rgb(0,0,0,0.1)",
                marginInline: "12px",
                }}/>
            <h3 style={{
                color: "#f5e1c8"}}>{commentDetails.user}<span>{" "}</span> <span style={{color: "#5a3e2b"}}>commented: </span></h3>
            </div>

                {/*if not my comment, view profile */}
                {/*if my comment, view post */}
                {(commentDetails.user != "You" && <ViewProfileButton/> ) || <button className="button" style={{backgroundColor: "#d7b898", color: "#5a3e2b"}}>View Original Rating</button>}
                

            </div>
            {/*comment */}
            <p style={{
                color: "#5a3e2b"}}>{commentDetails.text}</p>

            {/*reply button */}
            
            <button className="button" style={{width: "fit-content", backgroundColor: "#5a3e2b", color: "rgba(245, 225, 200)"}}>Reply</button>
        </div>
    )
}


export default CommentItem;