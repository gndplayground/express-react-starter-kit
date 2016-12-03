import * as actionTypes from './actionTypes';

export function userLogin(fromData) {
    return {
        type: actionTypes.USER_LOGIN,
        payload: fromData,
    }
}

export function userFetching(bool) {
    return {
        type: actionTypes.USER_FETCHING,
        payload: bool
    }
}
export function userFetchFailed(bool) {
    return {
        type: actionTypes.USER_FETCH_FAILED,
        payload: bool
    }
}

export function userUnauthorized(bool) {
    return {
        type: actionTypes.USER_UNAUTHORIZED,
        payload: bool
    }
}


export function userSet(data) {
    return {
        type: actionTypes.USER_SET,
        payload: data,
    }
}