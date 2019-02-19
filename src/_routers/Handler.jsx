/* Packages */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

/* Services */
import { flow } from '../_services';

/* Mappers */
import { genericMapper } from '../_mappers';

/* Constants */
import { ROUTES } from '../_constants';

/* Component */
class RouterHandler extends PureComponent {
    /**
     * Render
     */
    render() {
        const { auth, isAuth, isPrivate, history } = this.props;
        const { authenticated } = auth;
        const { location }      = history;
        const { pathname }      = location;
        const then              = flow.getParam('then');

        if (authenticated) {
            if ((then && pathname !== then)) {
                return (
                    <Redirect to={then} />
                );
            }

            if (isAuth && (pathname !== ROUTES.REDIRECT.WHEN.AUTHENTICATED)) {
                return (
                    <Redirect to={ROUTES.REDIRECT.WHEN.AUTHENTICATED} />
                );
            }
        }

        if ((isPrivate && !authenticated) &&
            (pathname !== ROUTES.REDIRECT.WHEN.UNAUTHENTICATED)) {
            return (
                <Redirect to={ROUTES.REDIRECT.WHEN.UNAUTHENTICATED.concat('?then=', pathname)} />
            );
        }

        return (
            <Route {...this.props} />
        );
    }
};

/* Exporting */
export default connect(genericMapper)(withRouter(RouterHandler));
