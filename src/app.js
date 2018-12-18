import React from "react";
import axios from "./axios";
import Logo from "./logo";
import { BrowserRouter, Route } from 'react-router-dom';
import Main from "./main"
import Login from "./login"
import Registration from "./registration"
import DetailedExpansionPanel from "./resultspanel"
import Typewriter from "./typewrite"
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PushComp from "./push"
import EmailComp from "./email"
import Uploader from "./uploader";
import Profile from "./profile";
import { getLoginStatus } from "./actions"


const style = {
    Paper: { padding: 20 }
}



 class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loginIsVisible: false,
            registrationIsVisible: false,
            setBio: "",
            uploaderIsVisible: false,
            emailIsVisible: false,
        };
        this.showLogin = this.showLogin.bind(this);
        this.hideLogin = this.hideLogin.bind(this);
        this.showRegistration = this.showRegistration.bind(this);
        this.hideRegistration = this.hideRegistration.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.changePic = this.changePic.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.setBio = this.setBio.bind(this);
        this.showEmail = this.showEmail.bind(this);
        this.hideEmail = this.hideEmail.bind(this);
    }

    showLogin() {
        console.log("showLogin clicked")
        this.setState({
            loginIsVisible: true
        });
    }

    hideLogin(){
        console.log("hideLogin clicked")
        this.setState({
            loginIsVisible: false
        });
    }

    showRegistration() {
        console.log("showLogin clicked")
        this.setState({
            registrationIsVisible: true
        });
    }

    hideEmail(){
        console.log("hideLogin clicked")
        this.setState({
            emailIsVisible: false
        });
    }

    showEmail() {
        console.log("showRegistration clicked")
        this.setState({
            emailIsVisible: true
        });
    }

    hideRegistration(){
        console.log("hideRegistration clicked")
        this.setState({
            registrationIsVisible: false
        });
    }

    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    hideUploader(){
        this.setState({
            uploaderIsVisible: false
        });
    }

    changePic(url) {
        this.setState({
            profilePicUrl: url,
            uploaderIsVisible: false
        });
}

    setBio(bio) {
        this.setState({
            bio: bio
        })
    }

    componentDidMount() {
        console.log("Push in app.js", Push);
        Push.create("Hello world!", {
        body: "How's it hangin'?",

        timeout: 1000,
        onClick: function () {
            window.focus();
            this.close();
        }
    });
     axios.get("/loginStatus").then(results => {
        console.log("data in axios.get /loginStatus", results)
        this.props.dispatch(getLoginStatus(results.data))
    })

    axios.get("/user").then(results=> {
            console.log("data in app.js", results.data)
            this.setState(results.data);
            // this.changePic(results.data)
        }).catch(err => {
            console.log("Error in axios.get /user", err);})


    }

    componentDidUpdate() {
        return axios.get("/loginStatus").then(results => {
            console.log("data in axios.get /loginStatus", results)
            this.props.dispatch(getLoginStatus(results.data))
        })
    }


// #1 it renders the page
    render() {
        return (



<Grid container spacing={8}
direction="row"
  justify="center"
  alignItems="flex-start">

<Grid item xs={12} sm={12} lg={12}>
<Paper style={style.Paper}>
<Logo />

<Typewriter />
Heeeiiia
</Paper>
</Grid>

<Grid item xs={10} sm={2} lg={4}>

<Paper style={style.Paper}>


    <Profile
        id={this.state.id}
        first={this.state.first}
        last={this.state.last}
        profilePicUrl={this.state.profilePicUrl}
        bio={this.state.bio}
        setBio={this.setBio}
        showUploader={this.showUploader}
        showLogin = {this.showLogin}
                            />


<PushComp  />

<EmailComp
hideEmail = {this.hideEmail}
emailIsVisible = {this.state.emailIsVisible}
showEmail = {this.showEmail}
/>

Hellooo

<Uploader
                    userID = {this.state.userId}
                    changePic = {this.changePic}
                    hideUploader = {this.hideUploader}
                    uploaderIsVisible = {this.state.uploaderIsVisible}
                />



</Paper>
</Grid>

<Grid item xs={12} sm={8} lg={6}>


<Registration
hideRegistration = {this.hideRegistration}
showLogin = {this.showLogin}
registrationIsVisible = {this.state.registrationIsVisible}
/>



<Login
hideLogin = {this.hideLogin}
showRegistration = {this.showRegistration}
loginIsVisible = {this.state.loginIsVisible}
/>

            <BrowserRouter>
                    <div>
                    <Paper style={style.Paper}>
                        <Route exact path="/"
                        render = {() => {
                            return <Main


                             />
                        }}
                        />
</Paper>
<Paper style={style.Paper}>
                        <DetailedExpansionPanel
                        resultsArray = {this.props.resultsArray} />
</Paper>
                        </div>
            </BrowserRouter>
            </Grid>
</Grid>

    );
    }
}

function mapStateToProps(state) {
    console.log("State in mapStateToProps in resultspanel", state)

return {
    resultsArray: state.results,
    login: state.login
};

}

export default connect(mapStateToProps)(App)
