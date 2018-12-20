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
            ...state, [action.queryInput]: action.searchInput, isLoading: true
        }
    }

    if (action.type == "ADD_RESULTS") {
        // console.log("action in reducer", action)
        return {
            ...state, results: action.resultsInput, isLoading: false
        }
    }

    if (action.type == 'LOGIN_STATUS') {
        console.log("action in reducer", action)
        return {
            ...state, login: action.login.loginStatus
        }
    }

    return state;
}
