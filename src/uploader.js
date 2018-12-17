import React from "react";
import axios from "./axios";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 6,
  },
});


class Uploader extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        // console.log("handle change", e.target.files[0])
        // console.log("e.target.name: ", e.target.name)
        this.setState({
            [e.target.name]:e.target.files[0]
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);
        // console.log("this.state.file", this.state.file)
        // console.log("formData:", formData)

    axios.post("/upload", formData).then (resp => {
        console.log("resp in axios.post", resp)
        this.props.changePic(resp.data.imgurl)

    }).catch(err => console.log("Error in axios.post /upload", err));

    // form data stuff
    // Post /upload request to server
    // After response, the then of axios.post will run
    // Go to app and tell it to change the profilePicUrl
    // Also make showUploader = false again.
    }


    render() {

        const { classes } = this.props;
        return (
            <div  className="uploader-container">
            <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.uploaderIsVisible}
        >
         <div style={getModalStyle()} className={classes.paper}>
            <div className="closingbutton" onClick={this.props.hideUploader}>X</div>
            <br />
                <h1>Upload an image</h1>
                <form onSubmit = { this.handleSubmit }>
                    <input name= "file" onChange = { this.handleChange } type ="file" accept="image/*" />
                    <button className="button-one">Upload</button>
                </form>
                <SimpleModalWrapped />
                </div>
                </Modal>
            </div>
        );
    }
}

Uploader.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(Uploader);

export default SimpleModalWrapped;
