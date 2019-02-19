/* Packages */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import styled from '@emotion/styled';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Framework Helpers */
import { Badge, NumberFormat } from 'aphrodite-react';

/* Helper Components */
import { Image, Logout } from '../';

/* Constants */
import { ROUTES, STYLES } from '../../_constants';
import NAVBAR_STYLES from './navbar.styles';
const DropdownItemStyled     = styled('div')(NAVBAR_STYLES.MENU_USER);
const DropdownItemLinkStyled = styled(NavLink)(Object.assign({}, NAVBAR_STYLES.MENU_USER, NAVBAR_STYLES.MENU_USER_LINK));

/* Component */
const NavbarMenuUser = (props) => {
    const { auth, bookmarks, history } = props;
    const { authenticated, data }   = auth;
    const { displayName, photoURL } = (data || {});
    const { location }              = history;
    const { pathname }              = location;
    const { list }                  = (bookmarks || {});

    if (!authenticated) {
        return (null);
    }

    return (
        <Fragment>
            <DropdownItemStyled>
                {(!photoURL) ? (null) : (
                    <Image
                        avatar
                        src={photoURL}
                    />
                )}
                Hi
                {(!displayName) ? (null) : (
                    <span>,<br /> <strong>{displayName}</strong></span>
                )}
            </DropdownItemStyled>
            <DropdownItemLinkStyled className={pathname === ROUTES.PROFILE ? 'active' : ''} to={ROUTES.PROFILE}>
                Profile
            </DropdownItemLinkStyled>
            <DropdownItemLinkStyled className={pathname === ROUTES.BOOKMARKS ? 'active' : ''} to={ROUTES.BOOKMARKS}>
                Bookmarks
                {(!list || !list.length) ? (null) : (
                    <Badge
                        sm
                        color="purple"
                        styles={STYLES.BADGE}>
                        <NumberFormat display="text" value={list.length} />
                    </Badge>
                )}
            </DropdownItemLinkStyled>
            <DropdownItemStyled>
                <Logout bold />
            </DropdownItemStyled>
        </Fragment>
    );
};

/* Exporting */
export default connect(genericMapper)(withRouter(NavbarMenuUser));
