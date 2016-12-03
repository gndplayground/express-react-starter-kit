/* global System */

import {browserHistory} from 'react-router';
import App from './App';
import Home from './pages/Home/Home';
import {store} from './store';

const history = browserHistory;

// Function handle error load a page
function errorLoadRoute(err) {
    // On error loaded page we can redirect user to 404 page or error page.
    console.error('Loaded page failed', err);
}


function loadRoute(cb) {
    return (module) => cb(null, module.default);
}

const routes = {

    component: App,
    path: '/',
    indexRoute: {component: Home},
    childRoutes: [
        {
            path: 'about',
            getComponent: (location, cb)=> {
                System.import('./pages/About/About').then(loadRoute(cb)).catch(errorLoadRoute);
            }
        },
        {
            path: 'login',
            getComponent: (location, cb)=> {
                System.import('./pages/Login/Login').then(loadRoute(cb)).catch(errorLoadRoute);
            }
        },
        {
            path: 'logout',
            getComponent: (location, cb)=> {
                System.import('./pages/Login/Login').then(loadRoute(cb)).catch(errorLoadRoute);
            }
        },
        {
            path: 'private',
            getComponent: (location, cb)=> {
                System.import('./pages/Private/Private').then(loadRoute(cb)).catch(errorLoadRoute);
            },
            onEnter: auth
        },
    ]
};

// Function to check if user is logged or not.
function auth(nextState, replace, callback) {

    const user = store.getState().user;

    // Redirect user to login page
    if (!user.token) {
        replace('/login')
    }

    callback();

}

export {routes, history}