/* Packages */
import React, { Fragment } from 'react';

/* Stylesheets */
import './_assets/css/app.css';
import './_assets/css/transitions.css';
import 'firebaseui/dist/firebaseui.css';
import 'animate.css/animate.min.css';

/* Framework Helpers */
import { ToastsContainer } from 'aphrodite-react';

/* Router Component */
import Router from './Router';

/* Application Component */
const App = () => (
    <Fragment>
        <Router />
        <ToastsContainer
            autoClose={5000}
            hideProgressBar={false}
            styles={{
                top   : 'auto',
                right : '20px',
                bottom: '20px',
            }}
        />
    </Fragment>
);

/* Exporting */
export default App;
