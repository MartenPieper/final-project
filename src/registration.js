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


class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            hasError: "placeholder"
        };
    }


  handleChange(e) {
    console.log("Handle change running!!", e.target.value);
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
    axios.post("/registration", this.state).then(resp => {
      console.log("resp in the then of POST / registration", resp);


      if (resp.data.success) {
          console.log("registration successful")
         this.props.hideRegistration()
         // location.replace("/")
      } else {
          this.setState({
                          hasError: resp.data
                      });
      }
    });
  }

  render() {
      const { classes } = this.props;
      return (
          <div  className="register-container">
          <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.registrationIsVisible}
      >
       <div style={getModalStyle()} className={classes.paper}>
          <div className="closingbutton" onClick={this.props.hideRegistration}>X</div>
          <br />

<h1>Please Register</h1>
        <form className="form" onSubmit={this.handleSubmit}>

         <div className="form__group">
          <input
            onChange={this.handleChange}
            name="first"
            type="text"
            placeholder="First Name"
            className="form__input"
          />

          </div>


                    <div className="form__group">
          <input
            onChange={this.handleChange}
            name="last"
            type="text"
            placeholder="Last Name"
            className="form__input"
          />

          </div>

                     <div className="form__group">
          <input
            onChange={this.handleChange}
            name="email"
            type="text"
            placeholder="Email"
            className="form__input"
          />

          </div>

        <div className="form__group">

          <input
            onChange={this.handleChange}
            name="password"
            type="password"
            placeholder="Password"
            className="form__input"
          />

           </div>


          <button className ="button-one">Register</button>
        </form>

        <button onClick={()=>{this.props.hideRegistration(); this.props.showLogin()}}>To Login</button>

        <div>
        {this.state.error &&
          <div className="error-message">
            There was an error with your input
          </div>
        }

        {this.state.hasError == "first" && (
        <p className="err">Please enter your First Name</p>
        )}

        {this.state.hasError == "last" && (
        <p className="err">Please enter your Last Name</p>
        )}

        {this.state.hasError == "email" && (
        <p className="err">Please enter your Email</p>
        )}

        {this.state.hasError == "" && (
        <p className="err">Please enter all required fields</p>
        )}
        </div>
        <SimpleModalWrapped />
        </div>
        </Modal>
    </div>
    );
  }
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleModalWrapped = withStyles(styles)(Registration);

export default SimpleModalWrapped;
