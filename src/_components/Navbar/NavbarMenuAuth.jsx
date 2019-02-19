/* Packages */
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Helper Components */
import { Login } from '../';

/* Constants */
import { ROUTES } from '../../_constants';
import NAVBAR_STYLES from './navbar.styles';
const DropdownItemStyled = styled('div')(Object.assign({}, NAVBAR_STYLES.MENU_USER, { paddingRight: 0, paddingLeft: 0 }));

/* Component */
const NavbarMenuAuth = (props) => {
    const { auth, history } = props;
    const { authenticated } = auth;
    const { location } = history;
    const { pathname } = location;

    if (authenticated) {
        return (null);
    }

    return (
        <Fragment>
            <DropdownItemStyled>
                You must need to
                <br />
                <strong>authorize browser Pop-Ups</strong>
                <br />
                to proceed.
            </DropdownItemStyled>
            {(pathname === ROUTES.LOGIN) ? (null) : (
                <DropdownItemStyled>
                    <Login id="FromMenu" />
                </DropdownItemStyled>
            )}
        </Fragment>
    );
};

/* Exporting */
export default connect(genericMapper)(withRouter(NavbarMenuAuth));
