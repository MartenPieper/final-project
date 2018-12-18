import React from "react";
import ProfilePic from "./profilepic";
import Bio from "./bio";
import Logout from "./logout"
import { connect } from 'react-redux';

function Profile(props) {
    return (
        <div className="profile-container">
        {!props.login &&
            <button  onClick={props.showLogin}>Login</button>
        }
        { props.login &&
            <ProfilePic className="avatar-image" showUploader={ props.showUploader } profilePicUrl={ props.profilePicUrl } first = { props.first} />
        }

        { props.login &&
            <h2>Your User Information</h2>
        }
        { props.login &&
            <h3>First Name: {props.first}</h3>
        }
        { props.login &&
            <h3>Last Name: {props.last}</h3>
 }
        { props.login &&
            <Logout />
        }
        { props.login &&
            <Bio id="bio" bio={props.bio} setBio={props.setBio} />
        }

        </div>
    );
}

function mapStateToProps(state) {
    console.log("State in mapStateToProps in resultspanel", state)

return {
    login: state.login
};

}

export default connect(mapStateToProps)(Profile)
