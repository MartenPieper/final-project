import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";
import { Provider } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));


let component;

if (location.pathname === "/welcome") {
  // render welcome

} else {
    component = (
    <Provider store={store}>
        <App />
    </Provider>);
}


ReactDOM.render(component, document.querySelector("main"));

function HelloWorld() {
    return (
        <div>Hello, World!</div>
    );
}
