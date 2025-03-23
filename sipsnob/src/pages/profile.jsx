import React from "react";
import './pages.css'
import sampleImg from "../assets/sampleimg.png"
import { useState } from "react";

const Profile = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleEditContent = () => {
        setIsVisible(!isVisible)
    }

    return(
        <div className="page-container"
        style={{
            overflowY: "scroll"
        }}> 

        
        <div style={{
            display: "flex",
            flexDirection: "row",
            margin: "64px",
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
            position: "sticky",
            top: "10%"
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
            justifyContent: "center",
            alignItems: "center",
            width: "75%",
            margin: "2%",
        }}>   
        {/*Personal Information*/}   
        <h1 style={{color: "#572e05"}}>Personal Information</h1>
        
        <div id="PersonalInfo" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            {/*Edit
                reveals inputs*/}  

            {/* Profile Picture*/}
            <div style={{
                
                height: "150px",
                width: "150px",
                backgroundImage: `url(${sampleImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "100%", 
                boxShadow: "0 1px 2px rgb(0,0,0,0.1)",
                flexWrap: "wrap"
                
            }}>

            </div>

            {/*Info Box*/} 
            
            <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent:"space-around",
            }}>
                <p> John Smith </p>
                <p style={{marginTop: "-12px"}}> jsmith25@email.com</p>
                <p style={{marginTop: "-12px"}}> New York, NY</p>
            </div>  

            <button className="button" style={{maxHeight: "fit-content"}} onClick={toggleEditContent}>Edit</button>              
            </div>


            {isVisible && (
 

                <form>
                    <div style={{
                display: "flex",
                flexDirection: "row",
                margin: "24px", 
                }}>
                    <div style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "24px", 
                    }}>
                    <label>First Name: </label>
                    <input style={{
                        display: "inline-block",
                        height: "50%",
                        width: "100%",
                        backgroundColor: "#572e05"
                    }}/>
                    </div>
                    <div style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "24px", 
                    }}>
                    <label>Last Name: </label>
                    <input style={{
                        display: "inline-block",
                        height: "50%",
                        width: "100%",
                        backgroundColor: "#572e05"
                    }}/>
                    </div>
                </div>
                <div style={{
                display: "flex",
                flexDirection: "row",
                margin: "24px", 
                }}>
                    <div style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "24px", 
                    }}>
                    <label> Username: </label>
                    <input style={{
                        display: "inline-block",
                        height: "50%",
                        width: "100%",
                        backgroundColor: "#572e05"
                    }}/>
                    </div>
                    <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:"space-evenly" ,
                    margin: "24px", 
                    }}>
                    <label>Email: </label>
                    <input style={{
                        display: "inline-block",
                        height: "50%",
                        width: "100%",
                        backgroundColor: "#572e05"
                    }}/>
                    </div>
                </div>
                </form>


            )}

            <div style={{
                width: "50%"
                }}>
           <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-evenly" ,
            margin: "24px", 
            }}>
            {/*First Name*/} 
            <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%"
                }}>
                {/*Last Name*/}             
                <p style={{color: "#5a3e2b", marginTop: "-2%"}}>First Name:</p>
                <p style={{color: "black", marginTop: "-2%"}}>John</p>
                </div>
            <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%"
                }}>
            
            <p style={{color: "#5a3e2b", marginTop: "-2%"}}>Last Name:</p>
                <p style={{color: "black", marginTop: "-2%"}}>Smith</p>
                </div>
            </div>
            {/*Email*/}
            <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between" ,
            margin: "24px"
            }}>
            <p style={{color: "#5a3e2b"}}>Email:</p>
            <p style={{color: "black"}}> jsmith25@email.com</p>   
            </div>

            

            


            {/*UserName*/}
            <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between" ,
            width: "90%",
            margin: "24px"
            }}>
            <p style={{color: "#5a3e2b"}}>Username:</p>
            <p style={{color: "black"}}>John Smith</p>   
            </div>
            {/*Location*/}
            <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent:"space-between",
            margin: "24px",
            }}>
            <p style={{color: "#5a3e2b"}}>Location:</p>
            <p style={{color: "black"}}>John Smith</p>   
            </div>

            {/*Change Password*/}
            <h2 style={{color: "#5a3e2b"}}>Change Password</h2>

            {/*Save Changes*/}     
</div>
 
        {/*Friends List*/}

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
