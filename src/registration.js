import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
  // all class components we write will extend "React.Component"
  constructor() {
    super();

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
      // console.log("resp in the then of POST / registration", resp);

      // if everything does well:
      // if (resp.data.success) {
      //
      //   location.replace("/");
      // } else {
      //     this.setState({
      //                     hasError: resp.data
      //                 });
      // }
    });
  }

  render() {
    return (
      <div className="registration-container">
        <header className="user-header">
    
        <h1 className="user-title">Please register</h1>
        </header>


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



      </div>
    );
  }
}

// <input
//   onChange={this.handleChange}
//   type="hidden"
//   name="_csrf"
//   value="{{csrfToken}}"
// />
