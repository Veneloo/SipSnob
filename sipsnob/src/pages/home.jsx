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
    {name: "another coffe shop"}
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

const formatRatingDetail = (label) => {
    {/* ratings: {
        drinkConsistency: 8,
        ambiance: 7,
        waitTime: 5,
        pricing: 6,
        customerService: 9,
      },
      milkOptions: ["Oat", "Almond"],
      foodAvailable: "Yes",
    sugarFree: "No",*/}


    const map = {
        drinkConsistency: "Drink Consistency",
        ambiance: "Ambiance",
        waitTime: "Wait Time",
        pricing: "Pricing",
        customerService: "Costumer Service",
        milkOptions: "Milk Options",
        foodAvailable: "Food Available",
        sugarFree: "Sugar Free"
    }

    return(map[label] || label)

}

const handlePostDetails = () => {

}


const sampleRatings = [
    {
      shopName: "Blank Street (71st & Lex)",
      user: "Axel",
      timestamp: "2025-04-18T14:00:00",
      ratings: {
        drinkConsistency: 8,
        ambiance: 7,
        waitTime: 5,
        pricing: 6,
        customerService: 9,
      },
      milkOptions: ["Oat", "Almond"],
      foodAvailable: "Yes",
      sugarFree: "No",
      comment: "Cute space! Wish there were more food options.",
      replies: [
        {
          user: "Liliana",
          timestamp: "2025-04-18T16:12:00",
          text: "Totally agree! Their pastry section is lacking 😩",
        },
        {
          user: "Hannah",
          timestamp: "2025-04-18T18:45:00",
          text: "They told me food is coming soon!",
        },
      ],
      shopName: "The Daily Drip",
      user: "John",
      timestamp: "2025-04-14T10:20:00",
      ratings: {
        drinkConsistency: 7,
        ambiance: 6,
        waitTime: 8,
        pricing: 5,
        customerService: 7,
      },
      milkOptions: ["Whole", "Almond"],
      foodAvailable: "Yes",
      sugarFree: "No",
      comment: "Fast service, decent coffee. Good spot for a quick stop.",
      replies: [
        {
          user: "Sarah",
          timestamp: "2025-04-14T12:05:00",
          text: "Their croissants are underrated tbh!",
        }
      ]
    },
    {
      shopName: "Mocha Mornings",
      user: "Emily",
      timestamp: "2025-04-16T13:55:00",
      ratings: {
        drinkConsistency: 9,
        ambiance: 8,
        waitTime: 3,
        pricing: 6,
        customerService: 9,
      },
      milkOptions: ["Oat", "Soy"],
      foodAvailable: "No",
      sugarFree: "Yes",
      comment: "So cute inside! Wish they had food but the drinks are top tier.",
      replies: [
        {
          user: "David",
          timestamp: "2025-04-16T15:10:00",
          text: "Right?? Their iced mocha is insane.",
        }
      ]
    }
  ];


 const RatingItem = ({ratingDetails}) =>{
    if (!ratingDetails){
        return null;
    }

    const [areCommentsVisible, setCommentsVisible] = useState(false);

    const toggleComments = () => {
        setCommentsVisible(!areCommentsVisible);
        if(areCommentsVisible==true){
            setReplyVisible(false);
        }
    }

    const [arePostActionsVisible, setPostActionsVisible] = useState(false);

    const togglePostActions = () => {
        setPostActionsVisible(!arePostActionsVisible);
    }

    const [isReplyVisible, setReplyVisible] = useState(false)
    const handleReplyButton = () => {
        setReplyVisible(!isReplyVisible);
    }


    return(
        <div>
    <div className="review" style={{
        height: "fit-content",
        minWidth: "75%",
        borderRadius: "50px", 
        padding: "24px",
        boxShadow: " 1px 1px 1px 2px rgb(0,0,0,0.1)",
        color: "black",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        margin: "24px"
        }}>

            
        {/*User rated Shop*/}
        <div className="row-container" style={{justifyContent: "space-between"}}>
        {/*Left*/}
        <div className="row-container">
            {/*Pfp*/}

            <div style={{
                height: "50px",
                width: "50px",
                backgroundImage: `url(${sampleImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "100%", 
                boxShadow: "0 1px 2px rgb(0,0,0,0.1)"
            }}
            />

            {/*User rated Shop*/}

            <h3 style={{margin: "12px"}}>{ratingDetails.user}{" "} <span style={{color: "#5a3e2b"}}>rated</span>{" "}{ratingDetails.shopName}</h3>
            </div>
            {/*Post Details Button*/}
            <div className="row-container" style={{justifyContent: "flex-end", alignItems: "flex-end", flexDirection: "row-reverse"}}>

        <button className="button" onClick={togglePostActions} style={{boxShadow: "0px 0px",right: "0", backgroundColor: "transparent", color: "#59290A"}}>...</button>
        {arePostActionsVisible && <div>
            <button className="button" style={{right: "0", backgroundColor: "transparent", color: "#5a3e2b"}}> View Profile</button>
            <button className="button" style={{right: "0", backgroundColor: "transparent", color: "#5a3e2b"}}> Shop Details</button>

            </div>}
        </div>
        </div>

          {/*Timestamp*/}      
        <small style={{color: "#5a3e2b"}}>{new Date(ratingDetails.timestamp).toDateString()}</small>
    <div>
        {/*Overall Rating*/}
        <h3 style={{color: "#5a3e2b"}}>★★★☆☆</h3>
        {/*Review*/}
        <p style={{width: "fit-content", color: "#59290A"}}>{ratingDetails.comment}</p>
    </div>
        
        {/*Rating Details*/}
        <div style={{
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "12px",
  flexDirection: "row",

}}>
  {Object.entries(ratingDetails.ratings).map(([label, rating]) => (
    <span key={label} className="rating-detail">
      {formatRatingDetail(label)}: {rating}/10
    </span>
  ))}
</div>
{/*Extras */}
<div style={{
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "12px"
}}>
    <div className="rating-detail" style={{backgroundColor: "rgba(245, 225, 200)"}}>
        Food Available: {ratingDetails.foodAvailable}        
    </div>
    <div className="rating-detail" style={{backgroundColor: "rgba(245, 225, 200)"}}>
        Sugar Free: {ratingDetails.sugarFree}
    </div>
    <div  className="rating-detail" style={{backgroundColor: "rgba(245, 225, 200)"}}>
    Milk Options: {ratingDetails.milkOptions.join(", " || "None")}
</div>
</div>

        {/*Leave a comment button*/}
        <div className="row-container">
        <button className="button" onClick={toggleComments} style={{width: "fit-content", backgroundColor: "#5a3e2b", color: "rgba(245, 225, 200)"}}>{areCommentsVisible ? "Close Comments" : "View Comments"}</button>
       {areCommentsVisible && <button className="button" onClick={handleReplyButton} style={{width: "fit-content", backgroundColor: "#8B5E3C", color: "rgba(245, 225, 200)"}}>Leave a comment</button>}
</div>
       {/*Comments*/}
</div>
{isReplyVisible && areCommentsVisible && (<div className="comment" style={{
            height: "fit-content",
            minWidth: "75%",
            borderRadius: "50px", 
            padding: "24px 12px",
            color: "black",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            marginBlock: "12px",
            backgroundColor: "#8B5E3C",
            }}>
            {/*User */}
            
                {/*PFP and name */}
            <div className="row-container" style={{justifyContent: "space-between", alignContent: "flex-start"}}>
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
                color: "#f5e1c8"}}>You<span>{" "}</span> <span style={{color: "#d7b899"}}> are replying to: </span>{ratingDetails.user}</h3>
                </div>
            </div>
            {/*comment */}
            <input placeholder="Leaving this comment..." style={{color: "#f5e1c8", marginInline: "12px",height: "48px", backgroundColor: "transparent", border: "0", fontSize: "14px", fontFamily: "inherit"}}/>

            {/*Submit button */}
            <button className="button">Submit</button>
        </div>)}

{areCommentsVisible && (<div>
        {ratingDetails.replies.map((item,index) => (
            <CommentItem key={index} commentDetails={item}/>
        ))}
        
</div>)}
</div>
        
    );


}

const CommentItem = ({commentDetails}) =>{
    if (!commentDetails){
        return null;
    }
    return(
        <div className="comment" style={{
            height: "fit-content",
            minWidth: "75%",
            borderRadius: "50px", 
            padding: "24px 12px",
            color: "black",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            marginBlock: "12px"
            }}>
            {/*User */}
            
                {/*PFP and name */}
            <div className="row-container" style={{justifyContent: "space-between", alignContent: "flex-start"}}>
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
                {/*view profile */}
            <button className="button" style={{height: "fit-content"}}>View Profile</button>
            </div>
            {/*comment */}
            <p style={{
                color: "#5a3e2b"}}>{commentDetails.text}</p>

            {/*reply button */}
            <button className="button" style={{width: "fit-content", backgroundColor: "#5a3e2b", color: "rgba(245, 225, 200)"}}>Reply</button>
        </div>
    )
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
  

    <h2 style={{    textAlign: "left",
            color: "#A2845E",
            textShadow: "0 1px 1px rgb(0,0,0,0.1)"}}> Your Feed: </h2>

        {/*Feed*/}

        <div className="feed">
        {sampleRatings.map((rating,index) => (
            <RatingItem key={index} ratingDetails={rating}/>
        ))}
    

        </div>

    </div>
    )
};

export default HomePage;