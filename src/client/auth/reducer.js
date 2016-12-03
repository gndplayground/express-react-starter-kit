import * as actionTypes from './actionTypes';


const initialState = {
    token: '',
    data: {},
    fetching: false,
    unauthorized: false,
    fetchFailed: false,
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.USER_SET:

            return Object.assign({}, state, action.payload);

        case actionTypes.USER_FETCHING:

            return Object.assign({}, state, {fetching: action.payload});

        case actionTypes.USER_FETCH_FAILED:

            return Object.assign({}, state, {fetchFailed: action.payload});

        case actionTypes.USER_UNAUTHORIZED:

            return Object.assign({}, state, {unauthorized: action.payload});

        case actionTypes.USER_LOGOUT:

            window.localStorage.clear();
            return Object.assign({}, state, initialState);


        default:
            return state
    }
};

export default authReducer;
