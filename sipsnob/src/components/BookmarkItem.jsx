import React, { useState } from "react";
import sampleImg from "../assets/sampleimg.png"


const handleUnfavorite = (shopname) => {
    console.log(`Unfavorite ${shopname}`)
}

const BookmarkItem = ({bookmarkDetails}) => {
    if (!bookmarkDetails){
        return null;
    }
    return (
        <div style={{
            height: "200px",
            width: "250px",
            borderRadius: "50px", 
            backgroundColor: "#572e05",
            padding: "24px",
            marginRight: "75px",
            flexShrink: "0",
            alignContent: "center",
            position: "relative",
            boxShadow: "0 1px 2px rgb(0,0,0,0.1)"
            }}>
        {/* Shop Photo*/}
        <div style={{
            
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundImage: `url(${sampleImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50px", 
            opacity: "0.4",
            zIndex: "1",
            boxShadow: "0 1px 1px rgb(0,0,0,0.1)"
            
        }}>
        </div>

        
        <button onClick="handleUnfavorite"
        className="bookmark-button"
        style={{
            zIndex: "2",
        }}>
        ★
        </button>
        <h2
        style={{
            textShadow: "0 2px 2px rgb(0,0,0,0.2)",
            color: "#f5e1c8",
            zIndex: "2",
            position: "relative",
        }}>{bookmarkDetails.name}</h2>

        
        </div>
    );
}

export default BookmarkItem;