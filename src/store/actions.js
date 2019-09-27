import fetch from 'node-fetch';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const INPUT_SEARCH = 'INPUT_SEARCH';
export const RANDOM_SEARCH = 'RANDOM_SEARCH';
export const HISTORY_SUCCESS = 'HISTORY_SUCCESS';

const API = "https://pokeapi.co/api/v2/pokemon/";

export const searchRequest = () => ({ type: SEARCH_REQUEST });

export const searchSuccess = results => ({ type: SEARCH_SUCCESS, results });

export const searchError = errors => ({ type: SEARCH_ERROR, errors });

export const historySuccess = results => ({ type: HISTORY_SUCCESS, results });

export const inputSearch = (inputValue) => {
    return dispatch => {
        dispatch(searchRequest());
        fetch(API + `${inputValue}`)
            .then(res => res.json())
            .then(data => { return dispatch(searchSuccess(data)) })
            .catch(err => {
                return dispatch(searchError(`Either this pokemon doesn't exist or the API died :(`))
            })
    }
}

export const randomSearch = (randomValue) => {
    return dispatch => {
        dispatch(searchRequest());
        fetch(API + `${randomValue}`)
            .then(res => res.json())
            .then(data => { return dispatch(searchSuccess(data)) })
            .catch(err => {
                return dispatch(searchError(`Something went wrong`))
            })
    }
}

export const historyRecall = (inputValue) => {
    return dispatch => {
        dispatch(searchRequest());
        fetch(API + `${inputValue}`)
            .then(res => res.json())
            .then(data => { return dispatch(historySuccess(data)) })
            .catch(err => {
                return dispatch(searchError(`Something went wrong`))
            })
    }
}