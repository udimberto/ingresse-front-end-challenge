/* Packages */
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
    BrowserRouter,
    Route as RootRoute,
    Switch,
} from 'react-router-dom';

/* Constants */
import { ROUTES } from './_constants';

/* Handler */
import Route from './_routers/Handler.jsx';

/* Components */
import { Layout } from './_templates';

/* Routes */
import {
    NotFound,
    Home,
    About,
    Login,
    Me,
    Bookmarks,
    Search,
    Show,
} from './pages';

/* Router Component */
const Router = (props) => (
    <BrowserRouter>
        <RootRoute render={({ location }) => (
            <Layout>
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="fade" timeout={300}>
                        <Switch location={location}>
                            <Route exact path={ROUTES.INDEX} component={Home} />
                            <Route exact path={ROUTES.ABOUT} component={About} />
                            <Route exact path={ROUTES.LOGIN} component={Login} isAuth />
                            <Route exact path={ROUTES.SEARCH_INDEX} component={Search} />
                            <Route exact path={ROUTES.SHOW} component={Show} />

                            <Route exact path={ROUTES.PROFILE} component={Me} isPrivate />
                            <Route exact path={ROUTES.BOOKMARKS} component={Bookmarks} isPrivate />

                            <Route render={() => <NotFound location={location} />} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </Layout>
        )} />
    </BrowserRouter>
);

/* Exporting */
export default Router;
