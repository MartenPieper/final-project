import React from "react";
import axios from "./axios";
import Logo from "./logo";
import { BrowserRouter, Route } from 'react-router-dom';
import Main from "./main"
import Login from "./login"
import Registration from "./registration"
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loginIsVisible: false
        };
        this.showLogin = this.showLogin.bind(this);
        this.hideLogin = this.hideLogin.bind(this);
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




// #1 it renders the page
    render() {
        return (
        <div>

        <div> Hey</div>
            <Logo />

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
                    loginIsVisible = {this.state.loginIsVisible}
                    />

                        <Route path="/registration" component = { Registration } />
</div>
            </BrowserRouter>

        </div>
    );
    }
}
