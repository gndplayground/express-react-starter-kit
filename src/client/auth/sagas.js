/* global __ENV */

import {put, call} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {APIUnauthorized, APIInternalError} from '../utilities/api/apiErrors';
import {fetchAPI} from '../utilities/api/fetchAPI';
import {USER_LOGIN} from './actionTypes';
import * as actions from './actions';

function fetchUser(formData) {

    return fetchAPI(`${__ENV.API_LOCATION}/auth/get`, {
        mode: 'cors',
        method: 'POST',
        body: formData
    })
}

function* sagaLogin(action) {

    try {
        // Reset errors when fetching
        yield put(actions.userUnauthorized(false));

        yield put(actions.userFetchFailed(false));

        yield put(actions.userFetching(true));

        const data = yield call(fetchUser, action.payload);

        yield put(actions.userSet(data));

        yield put(actions.userFetching(false));

        window.localStorage.setItem('user', JSON.stringify(data));

    }
    catch (e) {

        if (e instanceof APIUnauthorized) {
            yield put(actions.userUnauthorized(true));
        }

        if (e instanceof APIInternalError) {
            yield put(actions.userFetchFailed(true));
        }

        yield put(actions.userFetching(false));
    }
}


function* sagaWatchAuth() {
    yield [
        takeLatest(USER_LOGIN, sagaLogin)
    ];
}


export {sagaWatchAuth}