import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import Radium from 'radium';


ProfilePic = Radium(ProfilePic);


const styles = {
  avatar: {
      margin: 20,
      width: 80,
      height: 80,
      ':hover': {
      width: 120

  }
  },
  bigAvatar: {
    margin: 20,
    width: 200,
    height: 200,
  }
};

function ProfilePic(props) {
      const { classes } = props;
      // console.log("props in profilepic: ", props)


// let avatarClass;

// if block runs if profilepic being rendered in profile
// if (props.className === "avatar-image") {
//     avatarClass = classes.bigAvatar
// }

var img = document.createElement("IMG")
img.src = "./camera6.png";

function mouseOver(e) {
e.target.classList.add("avatar-overlay")

img.classList.add("overlay-image")

e.target.parentNode.appendChild(img);
}

function mouseOut(e) {
    e.target.classList.remove("avatar-overlay")
    e.target.parentNode.removeChild(img)
    img.classList.remove("overlay-image")
}

    return (
     <Grid container justify="center" alignItems="center">
      <Avatar className={classes.bigAvatar} onMouseOver={mouseOver} onMouseOut ={mouseOut} alt="Remy Sharp" onClick = { props.showUploader } src={ props.profilePicUrl || "/default.png" }  />

      </Grid>
    );
}

ProfilePic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePic);

// You can use "or" comparator to display image or default image
