import React from "react";
import axios from './axios';


export async function addSearchQuery(input) {

    return {
        type: 'ADD_SEARCH_QUERY',
        search: input
    };
}
