import React from "react";
import './pages.css'
import sampleImg from "../assets/sampleimg.png"
import { useState } from "react";

const Profile = () => {

    return(
        <div className="page-container"
        style={{
            overflowY: "scroll"
        }}> 

        
        <div style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "64px",
        }}>
        {/*Page Table Content*/}
        <div style={{
            width: "fit-content",
            height: "fit-content",
            backgroundColor: "rgba(87, 46, 5, 0.5)",
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            padding: "2%",
            position: "absolute",
            top: "10%",
            left: "0"
            
        }}>   
        
         <p onClick={() => window.location.replace("/profile/#PersonalInfo")} >Personal Information</p> 
         <p onClick={() => window.location.replace("/profile/#Friends")} >Friends List</p>
         <p onClick={() => window.location.replace("/profile/#BookmarkHistory")} >Bookmark History</p>    
         <p onClick={() => window.location.replace("/profile/#LogOut")} >Log Out</p>        


        </div>
        {/*Item Content*/}
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "100%",
            alignItems: "center"
        }}>   


        
        <div id="PersonalInfo" style={{
            display: "flex",
            flexDirection: "Row",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "space-between",
            width: "fit-content",
            backgroundColor: "#A2845E",
            borderRadius: "24px",
            boxShadow: "0px 3px 3px rgb(0,0,0,0.5)",
            flexWrap: "wrap",
            minWidth: "300px",
            paddingRight: "10px",
            padding: "0 24px"
        }}>
            {/*Edit
                reveals inputs*/}  

            {/* Profile Picture*/}
            <div style={{
                height: "120px",
                width: "120px",
                backgroundImage: `url(${sampleImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "100%", 
                boxShadow: "0 1px 2px rgb(0,0,0,0.1)",
                margin: "24px"
                
            }}/>



            {/*Info Box*/} 
            
            <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: "10%",
            paddingRight: "5%"
            }}>
                <p style={{color: "rgba(245, 225, 200)"}}> John Smith </p>
                <p style={{marginTop: "-12px"}}> jsmith25</p>
                <p style={{marginTop: "-12px"}}> New York, NY</p>
            
            <button className="button" style={{maxHeight: "fit-content",marginTop: "-5px"}} >Edit</button>              
            
            </div>  
            </div>

            <div className="row-container" style={{
                justifyContent: "space-around",
                flexWrap:"wrap",
                width: "100%"

            }}>

                <div style={{
                    width: "fit-content"
                }}>
                <h2>User Details</h2>
                <p>Edit your personal information</p>   
                </div>
                
            

            <form style={{flexWrap:"wrap"
        }}>
            

           <div className="row-container" style={{
            margin: "24px"
            }}>
            {/*First Name*/} 
            <div className="column-container" style={{
            marginRight: "24px",
            width: "100%",
                }}>
                            
                <label style={{alignSelf: "flex-start"}}>First Name:</label>
                <input className="profile-input">
                </input>
                </div>
            <div className="column-container" style={{
            marginLeft: "24px",
            width: "100%"
                }}>
            {/*Last Name*/} 
            <label style={{alignSelf: "flex-start"}}>Last Name:</label>
                <input className="profile-input">
                </input>
                </div>
            </div>

            {/*Email*/}
            <div className="column-container" style={{
            margin: "24px",
            }}>
            <label style={{alignSelf: "flex-start"}}>Email:</label>
                <input className="profile-input">
                </input>
                


            {/*UserName*/}

            <label style={{alignSelf: "flex-start"}}>Username:</label>
                <input className="profile-input">
                </input>
            {/*Location*/}

            <label style={{alignSelf: "flex-start"}}>Location:</label>
                <input className="profile-input">
                </input>
                

            {/*Change Password*/}
            <button className="button" style={{color: "#5a3e2b"}}>Change Password</button>

            {/*Save Changes*/} 
            <button className="button" style={{color: "#5a3e2b"}}>Save Changes</button>    
            </div>         
            </form> 
        {/*Friends List*/}
</div>
        <div id="Friends">

        </div>

            {/*Add or delete friends*/}  
            {/*Search for friends*/}

        {/*Bookmark History*/}

        <div id="BookmarkHistory">

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

export default Profile;
