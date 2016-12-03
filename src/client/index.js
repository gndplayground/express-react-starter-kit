import 'normalize.css/normalize.css'
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './Root';
import {rootSaga} from './sagas';
import {store, sagaMiddleware} from './store';

const root = document.getElementById('root');

const render = (AppRoot) => {

    ReactDOM.render(
        <AppContainer>
            <AppRoot store={store}/>
        </AppContainer>,
        root
    );
};

render(Root);

// Run root saga.
sagaMiddleware.run(rootSaga);
// If app run on development mode, enable hot module replacement
if (process.env.NODE_ENV === 'development') {

    console.log('Development mode enabled');

    if (module.hot) {
        module.hot.accept('./Root', ()=> {
            const NextApp = require('./Root').default;
            render(NextApp);
        });
    }

}
