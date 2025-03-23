import React from "react";
import './pages.css'
import { useState } from "react";
import sampleImg from "../assets/sampleimg.png"

const bookmarkedShops = [
    {name:"Blank Street (71st & Lex)" },
    {name: "Coffee"},
    {name: "new coffee!"},
    {name: "java chip"},
    {name: "latte at 91st"},
    {name: "another coffe shop"},
]
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

const HomePage = () =>{
    return (

        <div className="page-container" style={{
}}>

        <h1 style={{
            marginTop: "5%",
            textShadow: "0 2px 2px rgb(0,0,0,0.2)",
            textAlign: "left",
        }}> Welcome, user </h1> {/*get user name from stored user info*/}

        {/*bookmarked shops*/}
        <div>
        <h2 style={{
            marginTop: "0",
            textAlign: "left",
            color: "#A2845E",
            textShadow: "0 1px 1px rgb(0,0,0,0.1)",


        }}> Bookmarked shops near you: </h2>


        <div className="bookmarkItem" 
            style={{
            borderRadius: "50px", 
            height: "250px",
            width: "95%",
            overflowX: "scroll",
            overflowY: "hidden", 
            display: "flex"
            }}>
        {bookmarkedShops.map((item,index) => (
            <BookmarkItem key={index} bookmarkDetails={item}/>
        ))}



        </div>



    </div>
        <br></br>

    {/*Feed*/}
    
    {/*Feed*/}

        
        </div>

    )

};

export default HomePage;