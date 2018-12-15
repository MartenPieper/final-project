import React from "react";
import axios from './axios';


export async function addSearchQuery(query, input) {

    return {
        type: 'ADD_SEARCH_QUERY',
        queryInput: query,
        searchInput: input
    };
}
