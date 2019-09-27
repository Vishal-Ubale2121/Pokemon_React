import * as actionTypes from './actions'

const initialState = {
    searchResults: [],
    historySearches: [],
    errors: [],
    fetching: false
}


const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.SEARCH_REQUEST:
            return {
                ...state,
                searchResults: [],
                fetching: true
            }

        case actionTypes.SEARCH_SUCCESS:
            const updatedHistory = state.historySearches
            updatedHistory.unshift(action.results)
            return {
                ...state,
                errors: [],
                historySearches: updatedHistory,
                searchResults: action.results,
                fetching: false
            }

        case actionTypes.SEARCH_ERROR:
            return {
                ...state,
                searchResults: [],
                errors: action.errors,
                fetching: false
            }

        case actionTypes.HISTORY_SUCCESS:
            return {
                ...state,
                searchResults: action.results,
                fetching: false
            }



        default:
            return state
    }
};

export default reducer
