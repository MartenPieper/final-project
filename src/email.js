import React from "react";
import axios from "./axios";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { Link } from "react-router-dom";


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

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


class EmailComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
     //  console.log("Handle change running!!", e.target.value);
      this.setState(
        {
          [e.target.name]: e.target.value
        },
        () => console.log("this state in handle change: ", this.state)
      );
    }

    handleSubmit(e) {
      e.preventDefault();
      console.log("handleSubmit running!!", this.state);
      // axios.post("/login", this.state).then(resp => {
      //     console.log("resp in the then of POST / login", resp);
      //
      //   // if everything does well:
      //   if (resp.data.success) {
      //     this.setState({ success: true });
      //     console.log("login successful")
      //          this.props.hideLogin()
      //     // location.replace("/");
      //   } else {
      //     this.setState({ error: true });
      //   }
      // });
    }


    render() {

        const { classes } = this.props;
        return (
            <div  className="email-container">

            <div>

        </div>
            <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.emailIsVisible}
        >
         <div style={getModalStyle()} className={classes.paper}>
            <div className="closingbutton" onClick={this.props.hideEmail}>X</div>
            <br />

                <h1>Get an Email for new results?</h1>
                            <form className="form" onSubmit={this.handleSubmit}>

                            <div className="form__group">
                            <input
                              onChange={this.handleChange}
                              name="email"
                              type="text"
                              placeholder="Email"
                              className="form__input"
                            />
                            </div>


                              <button className ="button-one">Sign Up</button>


                            </form>

                <SimpleModalWrapped />
                </div>
                </Modal>
            </div>
        );
    }
}

EmailComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(EmailComponent);

export default SimpleModalWrapped;
