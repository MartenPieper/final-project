import React from "react";
import ProfilePic from "./profilepic";
import Bio from "./bio";

export default function Profile(props) {
    return (
        <div className="profile-container">

            <ProfilePic className="avatar-image" showUploader={ props.showUploader } profilePicUrl={ props.profilePicUrl } first = { props.first} />
            <button  onClick={props.showLogin}>Login</button>
            <h2>Your User Information</h2>
            <h3>First Name: {props.first}</h3>
            <h3>Last Name: {props.last}</h3>
            <Bio id="bio" bio={props.bio} setBio={props.setBio} />
        </div>
    );
}
