import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import auth from './auth';

import reducers from './reducers';

export const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
        applyMiddleware(sagaMiddleware)
    )
);

// Read local storage. If we have user data we parse it and update redux state
try {

    if (window.localStorage.hasOwnProperty('user')) {
        store.dispatch(auth.actions.userSet(JSON.parse(window.localStorage.user)))
    }
}
catch (e) {

    window.localStorage.clear();
    console.log('Something wrong with local storage. Cleared local storage');
}