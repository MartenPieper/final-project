import React from "react";
import axios from './axios';


export async function addSearchQuery(query, input) {

    return {
        type: 'ADD_SEARCH_QUERY',
        queryInput: query,
        searchInput: input
    };
}

export async function addResults(results) {
    console.log("results in actions.js", results)
    return {
        type: 'ADD_RESULTS',
        resultsInput: results
    }
}

export async function getLoginStatus(data) {

    return {
        type: 'LOGIN_STATUS',
        login: data
    }

}
