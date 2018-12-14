import React from "react";
import axios from "./axios";
import Logo from "./logo";
import { BrowserRouter, Route } from 'react-router-dom';
import Main from "./components/main"

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {

        };

    }

// #1 it renders the page
    render() {
        return (
        <div>
            <Logo />

            <BrowserRouter>
                    <div>
                        <Route exact path="/"
                        render = {() => {
                            return <Main />
                        }}
                        />

                    </div>

            </BrowserRouter>

        </div>
    );
    }
}
