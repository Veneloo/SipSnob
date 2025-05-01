import React from "react";
import './pages.css'
import sampleImg from "../assets/sampleimg.png"
import { useState } from "react";
import Launch from './launch';
import { useNavigate } from 'react-router-dom';
import CommentItem from "../components/CommentItem";
import ViewProfileButton from "../components/ViewProfileButton";
import FriendItem from "../components/FriendItem";

const sampleRatings = [{
    shopName: "Ground & Grind",
    user: "You",
    timestamp: "2025-04-12T11:10:00",
    ratings: {
      drinkConsistency: 9,
      ambiance: 7,
      waitTime: 4,
      pricing: 6,
      customerService: 8,
    },
    milkOptions: ["Oat", "Almond"],
    foodAvailable: "Yes",
    sugarFree: "Yes",
    comment: "Really solid flat white. Staff was sweet. Ambiance felt like Pinterest threw up in a good way.",
    replies: []
  },
  {
    shopName: "Café Soleil",
    user: "You",
    timestamp: "2025-04-10T08:45:00",
    ratings: {
      drinkConsistency: 6,
      ambiance: 9,
      waitTime: 3,
      pricing: 7,
      customerService: 9,
    },
    milkOptions: ["Soy", "Whole"],
    foodAvailable: "No",
    sugarFree: "No",
    comment: "Gorgeous interior but my latte tasted like vibes instead of espresso. Still, I’d come back to sit and read here.",
    replies: [
      {
        user: "Jasmine",
        timestamp: "2025-04-10T10:02:00",
        text: "LMAO that description is too real 😭"
      }
    ]
  },
  {
    shopName: "Java Junction",
    user: "You",
    timestamp: "2025-04-08T16:20:00",
    ratings: {
      drinkConsistency: 7,
      ambiance: 5,
      waitTime: 7,
      pricing: 8,
      customerService: 6,
    },
    milkOptions: ["Whole"],
    foodAvailable: "Yes",
    sugarFree: "No",
    comment: "Good for a grab-and-go. Not really a sit-and-stay unless you love fluorescent lighting.",
    replies: []
  },
  {
    shopName: "The Bean Scene",
    user: "You",
    timestamp: "2025-04-05T14:00:00",
    ratings: {
      drinkConsistency: 10,
      ambiance: 10,
      waitTime: 2,
      pricing: 5,
      customerService: 10,
    },
    milkOptions: ["Oat", "Almond", "Soy"],
    foodAvailable: "Yes",
    sugarFree: "Yes",
    comment: "If I could live here I would. Pricey, but the lavender oat latte healed my inner child.",
    replies: [
      {
        user: "Ava",
        timestamp: "2025-04-05T16:33:00",
        text: "I KNEW you’d love this one 🥺"
      }
    ]
  }]

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
        <button className="button" onClick={toggleComments} style={{width: "fit-content", backgroundColor: "#5a3e2b", color: "rgba(245, 225, 200)"}}>{areCommentsVisible ? "Close Comments" : `View ${ratingDetails.replies.length} Comment${ratingDetails.replies.length == 1 ? "" : "s" }`}</button>
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



const Settings = () => {

    const[isRatingHistoryOpen, setRatingHistoryOpen] = useState(false)

    const toggleRatingHistory = () => {
        setRatingHistoryOpen(!isRatingHistoryOpen)
    }

    const navigate = useNavigate();

    const handleLogOut = () => {
        navigate("/");
    }

    return(
        <div className="page-container"
        style={{
            overflowY: "scroll",
            maxWidth: "100%",
            paddingBlock: "24px"
        }}> 

        
        <div style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "64px",
            
        }}>
        
        {/*Item Content*/}
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "100%",
            flexWrap: "wrap",
            textAlign: "left"
        }}>   

        <div className="row-container" style={{width: "100%", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", textShadow: "0 2px 2px rgb(0,0,0,0.2)"}}>
        <h1>Settings</h1>

        {/*Buttons*/}
        <div>
        {/*Cancel*/}
        <button className="button" style={{maxHeight: "fit-content", color: "#5a3e2b"}} >Cancel</button>              
  
        {/*Save Changes*/}  
        <button className="button" style={{maxHeight: "fit-content", backgroundColor: "#5a3e2b"}} >Save Changes</button>              
        </div>
        </div>
{/*Section */}
            <div id="ProfileInfo" style={{
            backgroundColor: "rgba(245, 225, 200, 0.5)",
            padding: "2% 5%",
            borderRadius: "24px",
            }} >

            <h2 style={{
                fontSize: "2em",
                textShadow: "0 2px 2px rgb(0,0,0,0.2)"
                }}>Profile Details</h2>
            <p style={{ color: "#A2845E", marginTop: "-12px"}}>Edit your personal information</p>   
            
            <hr style={{
                height: "1px",
                width: "100%",
                border: "0",
                backgroundColor: "#5a3e2b"
                }}/>

            {/* Profile Picture*/}
            <h3>Change Profile Picture</h3>
            <div className="row-container" style={{alignItems: "center", flexWrap: "wrap"}}>
            <div style={{
                height: "120px",
                width: "120px",
                backgroundImage: `url(${sampleImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "100%", 
                boxShadow: "0 1px 2px rgb(0,0,0,0.1)",
                
            }}/>
            <div className="column-container" style={{
                lineHeight: "0.1",
                marginInline: "32px"
            }}>
                <p style={{fontWeight: "bolder"}}>John Smith</p>
                <p style={{color: "#A2845E"}}>jsmith25</p>
                <p style={{color: "#A2845E"}}>New York, NY</p>
            </div>

            {/*Change Photo*/} 
            <button className="button" style={{backgroundColor: "#A2845E",maxHeight: "fit-content"}} >Upload Photo</button>              
            <button className="button" style={{color: "#A2845E",maxHeight: "fit-content"}} >Delete</button>              
            </div>


            <h3>User Information</h3>
        <form style={{flexWrap:"wrap"}}>
            

           <div className="row-container" style={{
            margin: "24px"
            }}>
            {/*First Name*/} 
            <div className="column-container" style={{
            marginRight: "24px",
            width: "100%",
                }}>
                            
                <label style={{alignSelf: "flex-start", color: "#A2845E"}}>First Name:</label>
                <input className="profile-input">
                </input>
                </div>
            <div className="column-container" style={{
            marginLeft: "24px",
            width: "100%"
                }}>
            {/*Last Name*/} 
            <label style={{alignSelf: "flex-start", color: "#A2845E"}}>Last Name:</label>
                <input className="profile-input">
                </input>
                </div>
            </div>

            {/*Email*/}
            <div className="column-container" style={{
            margin: "24px",
            }}>
            <label style={{alignSelf: "flex-start", color: "#A2845E"}}>Email Address:</label>
                <input className="profile-input">
                </input>
                

            {/*UserName*/}

            <label style={{alignSelf: "flex-start", color: "#A2845E"}}>Username:</label>
                <input className="profile-input">
                </input>
            {/*Location*/}

            <label style={{alignSelf: "flex-start", color: "#A2845E"}}>Location:</label>
                <input className="profile-input">
                </input>
                

            {/*Change Password*/}
            <button className="button" style={{backgroundColor: "#5a3e2b", maxWidth: "50%", alignSelf: "center"}}>Change Password</button>

           </div>         
            </form> 
        {/*Friend Add*/}
</div>
        <div className="column-container" id="Friends"  style={{
            backgroundColor: "rgba(245, 225, 200, 0.5)",
            padding: "2% 5%",
            borderRadius: "24px",
            marginTop: "12px",
            height: "fit-content"
            }} >

            <h2 style={{
                fontSize: "2em",
                textShadow: "0 2px 2px rgb(0,0,0,0.2)"}}>Add a Friend</h2>
            <p style={{ color: "#A2845E", marginTop: "-12px"}}>Input username to add friend.</p>   
            

        {/*Search for friends*/}
        <div className="button" style={{backgroundColor: "#5a3e2b",height: "fit-content", width: "50%", justifyContent: "space-between", alignSelf: "center", margin: "12px"}}>
        <input style={{color: "#5a3e2b", marginInline: "12px",height: "100%",backgroundColor: "transparent", fontSize: "14px", fontFamily: "inherit", width: "75%", border: "0"}} placeholder="jdoe25"/>
        <button className="button">Add</button>

        </div>
        </div>
        {/* Full Bookmark List*/}

        {/*Log Out*/}   
        <div id="LogOut" style={{paddingBlock: "2%"}}>

            <button className="button" onClick={handleLogOut} style={{backgroundColor: "#A2845E"}}>Log Out</button>

        </div>
        


        </div>
        </div>
        </div>


    );
};

export default Settings;
