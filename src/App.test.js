/* Packages */
import React from 'react';
import ReactDOM from 'react-dom';

/* Component to be tested */
import App from './App';

/* Test Case */
it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
