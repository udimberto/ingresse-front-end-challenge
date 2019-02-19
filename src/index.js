/* Packages */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

/* Application Component */
import App from './App';

/* Service Worker */
import * as serviceWorker from './serviceWorker';

/* Redux Reducers */
import Reducers from './_reducers/index.js';

/* Redux Middlewares */
const middlewares = [
    thunkMiddleware
];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

/* Enhancers */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* Redux Store */
const store = createStore(
    Reducers,
    composeEnhancers(
        applyMiddleware(
            ...middlewares
        ),
    ),
);

/* Render */
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: http://bit.ly/CRA-PWA
 */
serviceWorker.register();
