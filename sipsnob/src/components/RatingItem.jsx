import React, { useState } from "react";
import sampleImg from "../assets/sampleimg.png"
import CommentItem from "./CommentItem";
import ViewProfileButton from "./ViewProfileButton";

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
            <ViewProfileButton/>
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
{isReplyVisible && areCommentsVisible && (<div className="comment">
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

export default RatingItem;