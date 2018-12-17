export default function reducer(state = {}, action) {

    // if (action.type == 'RECEIVE_FRIENDS_WANNABES') {
    //     console.log("RECEIVE_FRIENDS_WANNABES running")
    //     return { ...state, users: action.user};
    //
    // }

    // || []

    if (action.type == "ADD_SEARCH_QUERY") {
        console.log("action in reducer", action)
        const queryInput = state[action.queryInput]
        return {
            ...state, [action.queryInput]: action.searchInput
        }
    }

    if (action.type == "ADD_RESULTS") {
        console.log("action in reducer", action)
        return {
            ...state, results: action.resultsInput
        }
    }
    return state;
}
