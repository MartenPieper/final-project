import React from "react";
import axios from "./axios";
import Logo from "./logo";
import { BrowserRouter, Route } from 'react-router-dom';
import Main from "./main"
import Login from "./login"

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
        this.setState({
            loginIsVisible: true
        });
    }

    hideLogin(){
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
                            return <Main />
                        }}
                        />



                    <Login

                    hideLogin = {this.hideLogin}
                    loginIsVisible = {this.state.loginIsVisible}
                    />
</div>
            </BrowserRouter>

        </div>
    );
    }
}
