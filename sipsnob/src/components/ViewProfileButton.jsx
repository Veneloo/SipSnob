import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/pages.css"

const ViewProfileButton = () => {
    const navigate = useNavigate();

    const handleViewProfileButton = () => {
        navigate("/profile")
    }

    return(
        <button className="button view-profile" onClick={handleViewProfileButton}>
            View Profile
        </button>
    )


}

export default ViewProfileButton;