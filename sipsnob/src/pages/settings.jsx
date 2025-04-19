import React from "react";
import './pages.css'
import sampleImg from "../assets/sampleimg.png"
import { useState } from "react";



const friendList = [
    {name: "Jane Doe", username: "jdoe25", photo_url: "sampleImg" },
    {name: "Jane Doe", username: "jdoe25", photo_url: "sampleImg" },
    {name: "Jane Doe", username: "jdoe25", photo_url: "sampleImg" },
    {name: "Jane Doe", username: "jdoe25", photo_url: "sampleImg" },
    {name: "Jane Doe", username: "jdoe25", photo_url: "sampleImg" },
    {name: "Jane Doe", username: "jdoe25", photo_url: "sampleImg" }
]

const FriendItem = ({friendDetails}) => {
    if (!friendDetails){
        return null;
    }

    return (
        <div className="row-container" style={{
            width: "100%",
            height: "fit-content",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "24px",
            justifyContent: "space-between"

        }}> 
            {/*Profile Picture*/}
        <div className="row-container" style={{}}>
            <div style={{
                height: "80px",
                width: "80px",
                backgroundImage: `url(${sampleImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "100%", 
                boxShadow: "0 1px 2px rgb(0,0,0,0.1)"
            }}/>

            <div className="column-container" style={{ 
            flexWrap: "wrap"}}>
            {/*Name*/}
            <p style={{fontWeight: "bolder"}}>{friendDetails.name}</p>

            {/*Username*/}
            <p style={{color: "#A2845E"}}>{friendDetails.username}</p>
            </div>  
            </div>

            <div className="column-container" >
            <button className="button">View Profile</button>
            <button className="button">Remove</button>
            </div>
        </div>
    );


}



const Settings = () => {

    return(
        <div className="page-container"
        style={{
            overflowY: "scroll",
            maxWidth: "100%"
        }}> 

        
        <div style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "64px",
            
        }}>
        {/*Page Table Content*/}
        <div className="settings-menu" style={{
            height: "fit-content",            
            backgroundColor: "#d7b898",
            display: "flex",
            flexDirection: "row",
            textAlign: "left",
            padding: "2%",
            position: "absolute",
            top: "10%",
            left: "0",
            boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.1)",
            
        }}>   

        <div className="column-container">
        
         <p onClick={() => window.location.replace("/settings/#ProfileInfo")} >Profile Details</p> 
         <p onClick={() => window.location.replace("/settings/#Friends")} >Friends List</p>
         <p onClick={() => window.location.replace("/settings/#BookmarkHistory")} >Bookmark History</p>    
         <p onClick={() => window.location.replace("/settings/#LogOut")} >Log Out</p>        
        </div>
        </div>
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
            padding: "5%",
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
        {/*Friends List*/}
</div>
        <div className="column-container" id="Friends"  style={{
            backgroundColor: "rgba(245, 225, 200, 0.5)",
            padding: "5%",
            borderRadius: "24px",
            marginTop: "12px",
            height: "fit-content"
            }} >

            <h2 style={{
                fontSize: "2em",
                textShadow: "0 2px 2px rgb(0,0,0,0.2)"}}>Friend List</h2>
            <p style={{ color: "#A2845E", marginTop: "-12px"}}>View, Add, or Remove your friends.</p>   
            

        <div className="FriendItem" 
            style={{
            borderRadius: "50px",
            width: "95%",
            height: "200px",
            overflowX: "hidden",
            overflowY: "scroll", 
            display: "flex",
            flexDirection: "column"
            }}>
        {friendList.map((item,index) => (
            <FriendItem key={index} friendDetails={item}/>
        ))}


        </div>   
        </div>

            {/*Add or delete friends*/}  
            {/*Search for friends*/}

        {/*Bookmark History*/}

        <div id="ReviewHistory" style={{
            backgroundColor: "rgba(245, 225, 200, 0.5)",
            padding: "5%",
            borderRadius: "24px",
            marginTop: "12px",
            height: "fit-content"
            }} >

        </div>
            {/*Edit*/} 
            {/*Clear*/}

        {/*Log Out*/}   
        <div id="LogOut">

        </div>
        


        </div>
        </div>
        </div>


    );
};

export default Settings;
