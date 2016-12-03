import React from 'react';
import {routes, history} from './routes';
import {Router} from 'react-router';
import {Provider} from 'react-redux';

const Root = ({store}) => (
    <Provider store={store}>
        <Router history={history} routes={routes} key={Math.random()}/>
    </Provider>
);

Root.propTypes = {
   store: React.PropTypes.object.isRequired
};

export default Root;