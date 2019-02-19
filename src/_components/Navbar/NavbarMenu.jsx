/* Packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Actions */
import { shows } from '../../_actions';

/* Constants Helpers */
import NAVBAR_STYLES from './navbar.styles';
import { ROUTES, STYLES } from '../../_constants';

/* Components Helpers */
import { Dropdown, Row, Column } from '../';
import NavbarMenuAuth from './NavbarMenuAuth';
import NavbarMenuUser from './NavbarMenuUser';
const itemStyles        = Object.assign({}, NAVBAR_STYLES.MENU_LINK, STYLES.LINK);
const NavbarMenuWrapper = styled('nav')(NAVBAR_STYLES.WRAPPER);
const NavbarMenuLink    = styled(NavLink)(itemStyles);
const NavbarMenuItem    = styled('div')(itemStyles);

/* Component */
class NavbarMenu extends Component {
    /**
     * Constructor
     *
     * @param {object} props - Component Props;
     */
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            activePath: this.props.history.location.pathname,
        };

        this.unlisten         = null;
        this.updateActivePath = this.updateActivePath.bind(this);
    }

    /**
     * Will Mount
     */
    componentWillMount() {
        this.unlisten = this.props.history.listen(this.updateActivePath);
    }

    /**
     * Will Mount
     */
    componentWillUnmount() {
        this.unlisten();
    }

    /**
     * Update Active Path
     */
    updateActivePath() {
        const { dispatch, history } = this.props;
        const { location } = history;
        const { pathname } = location;

        this.setState({
            activePath: pathname,
        }, () => {
            if (pathname !== ROUTES.SEARCH_INDEX) {
                dispatch(shows.search('', null));
            }
        });
    }

    /**
     * Render
     */
    render () {
        const { activePath }    = this.state;
        const { auth, layout }  = this.props;
        const { authenticated } = auth;
        const { xs }            = layout;

        return (
            <NavbarMenuWrapper>
                <Row>
                    <Column>
                        <NavbarMenuLink exact to={ROUTES.ABOUT}>
                            {(!xs) ? (null) : (
                                <div className="navbar__menu__icon">
                                    <FontAwesomeIcon fixedWidth size="2x" icon="bullseye" />
                                </div>
                            )}
                            About
                        </NavbarMenuLink>
                    </Column>
                    <Column>
                        <Dropdown
                            thin
                            up={xs}
                            width={authenticated ? 200 : 240}
                            toggle={(
                                <NavbarMenuItem className={(activePath === ROUTES.PROFILE || activePath === ROUTES.BOOKMARKS) ? 'active' : ''}>
                                    {(!xs) ? (null) : (
                                        <div className="navbar__menu__icon">
                                            <FontAwesomeIcon fixedWidth size="2x" icon="user-circle" />
                                        </div>
                                    )}
                                    {(authenticated) ? 'You' : 'LogIn'}
                                </NavbarMenuItem>
                            )}>
                            {(authenticated) ? (<NavbarMenuUser />) : (<NavbarMenuAuth />)}
                        </Dropdown>
                    </Column>
                    {(!xs) ? (null) : (
                        <Column>
                            <NavbarMenuLink exact to={ROUTES.SEARCH_INDEX}>
                                {(!xs) ? (null) : (
                                    <div className="navbar__menu__icon">
                                        <FontAwesomeIcon fixedWidth size="2x" icon="search" />
                                    </div>
                                )}
                                Search
                            </NavbarMenuLink>
                        </Column>
                    )}
                </Row>
            </NavbarMenuWrapper>
        );
    }
};

/* Exporting */
export default connect(genericMapper)(withRouter(NavbarMenu));
