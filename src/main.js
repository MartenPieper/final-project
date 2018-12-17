import React from "react";
import SearchInput from "./searchinput"

export default function Main(props) {
    return (
        <div id="main-container">
        <div >Main Works</div>
        <button  onClick={props.showLogin}>Login</button>
            <SearchInput />
        </div>
    );
}
