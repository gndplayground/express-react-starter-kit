import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './auth/';


const reducers = combineReducers({
    user: auth.reducer,
    routing: routerReducer
});

export default reducers;