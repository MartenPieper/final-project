import React from "react";
import axios from "./axios";
import Logo from "./logo";
import { BrowserRouter, Route } from 'react-router-dom';
import Main from "./main"
import Login from "./login"
import Registration from "./registration"
import DetailedExpansionPanel from "./resultspanel"
import Typewriter from "./typewrite"
// import Push from "./push"  In JSX <Push />

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loginIsVisible: false,
            registrationIsVisible: false
        };
        this.showLogin = this.showLogin.bind(this);
        this.hideLogin = this.hideLogin.bind(this);
        this.showRegistration = this.showRegistration.bind(this);
        this.hideRegistration = this.hideRegistration.bind(this)
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
        console.log("showRegistration clicked")
        this.setState({
            registrationIsVisible: true
        });
    }

    hideRegistration(){
        console.log("hideRegistration clicked")
        this.setState({
            registrationIsVisible: false
        });
    }



// #1 it renders the page
    render() {
        return (
        <div>

        <div> Hey</div>
            <Logo />

            <Typewriter />


            <BrowserRouter>
                    <div>
                        <Route exact path="/"
                        render = {() => {
                            return <Main
                            showLogin = {this.showLogin}

                             />
                        }}
                        />



                    <Login

                    hideLogin = {this.hideLogin}
                    showRegistration = {this.showRegistration}
                    loginIsVisible = {this.state.loginIsVisible}
                    />

                    <Registration
                    hideRegistration = {this.hideRegistration}
                    showLogin = {this.showLogin}
                    registrationIsVisible = {this.state.registrationIsVisible}
                    />

                        <Route path="/registration" component = { Registration } />

                        <DetailedExpansionPanel />
</div>
            </BrowserRouter>

        </div>
    );
    }
}
