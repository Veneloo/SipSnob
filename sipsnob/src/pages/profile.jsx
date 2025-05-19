import React from "react";
import './pages.css'
import { useState } from "react";
import sampleImg from "../assets/sampleimg.png"
import { useNavigate } from "react-router-dom";
import FriendItem from "../components/FriendItem";
import RatingItem from "../components/RatingItem";
import CommentItem from "../components/CommentItem";

const CommentHistory = () =>{
    <div>

    </div>
}

const ProfilePage = () =>{

    {/*Temporary Sample History*/}    
    const sampleUserDetails = {
        fullName: "John Smith",
        username: "jsmith 25",
        userLocationCity: "New York",
        userLocationState: "NY",
    
    };
    const sampleRatingHistory = [{
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
      const sampleCommentHistory = [
        {
          user: "You",
          timestamp: "2025-04-18T09:30:00",
          text: "No but seriously, this café feels like a Pinterest board come to life.",
        },
        {
          user: "You",
          timestamp: "2025-04-17T13:45:00",
          text: "I was gonna rate this a 6 but then the cookie hit me. Changed everything.",
        },
        {
          user: "You",
          timestamp: "2025-04-16T18:10:00",
          text: "Lmao I thought I was the only one who noticed the squeaky chairs 😭",
        },
        {
          user: "You",
          timestamp: "2025-04-15T11:05:00",
          text: "Agreed — staff was so sweet I forgot my drink was mid.",
        },
        {
          user: "You",
          timestamp: "2025-04-14T16:22:00",
          text: "Okay but WHY is every latte here photogenic? 😭",
        },
      ];
    const sampleFriendList = [
        { name: "Jane Doe", username: "jdoe_92" },
        { name: "Michael Chen", username: "mikec89" },
        { name: "Aria Patel", username: "ariap_" },
        { name: "Liam Johnson", username: "liamj" },
        { name: "Sofia Reyes", username: "sofiareyes22" },
        { name: "Noah Kim", username: "nk_theory" },
        { name: "Emily Zhang", username: "emz_04" },
        { name: "Lucas Rivera", username: "lucas.riv" },
      ];
    const [sectionOpen, sectionSelect] = useState("comments")
    const navigate = useNavigate();

    const [isCurrentUser, setCurrentUser] = useState("true")

    return (

  <div className="page-container">



<div className="profile-info column-container" style={{justifySelf: "center", justifyContent: "center", alignItems: "center", boxSizing: "border-box"}}>

    {/* User Info*/}

    {/*Pfp*/}

    <div style={{
                height: "150px",
                width: "150px",
                backgroundImage: `url(${sampleImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "100%", 
                boxShadow: "0 1px 2px rgb(0,0,0,0.1)",
                border: "1px solid rgb(0,0,0,0.5)"
                
            }}
            />

    <div>
    {/* Name*/}
    <h2 style={{color: "#f5e1c8", marginBottom: "0px", textShadow: "0 1px 1px rgba(0, 0, 0, 0.2)"}}>{sampleUserDetails.fullName}</h2>
    {/* UserName*/}
    <p style={{color: "#d7b898", marginBlock: "0px"}}>{sampleUserDetails.username}</p>
    {/* User Location*/}
    <p style={{color: "#d7b898", marginBlock: "0px"}}>{sampleUserDetails.userLocationCity}, {sampleUserDetails.userLocationState}</p>
    {/* Edit button: routes to settings/profile*/}
    {isCurrentUser && (<button className="button" onClick={() => navigate("/settings")} style={{backgroundColor: "#5a3e2b", color: "#8B5E3C"}}>Edit</button>)}
    
</div>

</div>
<div className="column-container " style={{ width: "100vw"}}>


<div className="row-container" style={{justifyContent: "center"}}>
    <button className="button-profile-section" onClick={() => sectionSelect("ratings")} style={{ color: sectionOpen === "ratings" ? "#5a3e2b" : "#8B5E3C" }}>{sampleRatingHistory.length} Ratings </button>
    <button className="button-profile-section" onClick={() => sectionSelect("comments")} style={{ color: sectionOpen === "comments" ? "#5a3e2b" : "#8B5E3C" }}>{sampleRatingHistory.length} Comments </button>
    <button className="button-profile-section" onClick={() => sectionSelect("friends")} style={{ color: sectionOpen === "friends" ? "#5a3e2b" : "#8B5E3C" }}>{sampleRatingHistory.length} Friends </button>

</div>
<div style={{backgroundColor: "rgba(89, 41, 10,0.1)", display: "flex",borderRadius: "24px", marginBlock: "24px", height: "fit-content", alignSelf: "center", width: "90vw", justifyContent: "center",}}>

{sectionOpen === "ratings" &&  (sampleRatingHistory.length == 0 ? 
        (<div style={{width: "inherit", height: "fit-content", color: "#572e05"}}>
        <h3> There are no ratings to display. {<br/>} Go to the Discover & Search tab to start rating!</h3>
        <button className="button" onClick={() => navigate("/discover")} style={{backgroundColor: "#A2845E"}}>
          Discover & Rate Shops
        </button>
        </div>)
        :
        (<div style={{ padding: "32px", overflowY: "scroll", width: "75%"}}> 

        {sampleRatingHistory.map((item,index) => (
            <RatingItem key={index} ratingDetails={item}/>
        ))}</div>)
        )}

{sectionOpen === "comments" && (sampleCommentHistory.length != 0 ? (<div style={{width: "inherit", height: "fit-content", color: "#572e05"}}>
        <h3> There are no comments to display. {<br/>} Go to your feed to interact with friends!</h3>
        <button className="button" onClick={() => navigate("/home")} style={{backgroundColor: "#A2845E"}}>
          Home
        </button>
        </div>)
        :(<div style={{padding: "32px", overflowY: "scroll", width: "75%", justifyContent: "center"}}> {sampleCommentHistory.map((item,index) => (
            <CommentItem key={index} commentDetails={item}/>
        ))}</div>))}

{sectionOpen === "friends" && ((sampleFriendList.length == 0 && (<div style={{width: "inherit", height: "fit-content", color: "#572e05"}}>
        <h3> You have no friends added on SipSnob. {<br/>}Go to the settings tab to follow friends!</h3>
        <button className="button" onClick={() => navigate("/settings")} style={{backgroundColor: "#A2845E"}}>
          Add Friends
        </button>
        </div>)) || (<div className="column-container" style={{padding: "32px", overflowY: "scroll", width: "75%", justifyContent: "center"}}> {sampleFriendList.map((item,index) => (
            <FriendItem key={index} friendDetails={item}/>
        ))}</div>))}

</div>        
</div>
</div>

    )

}

export default ProfilePage;