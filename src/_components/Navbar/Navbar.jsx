/* Packages */
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from '@emotion/styled';

/* Redux Mappers */
import { genericMapper } from '../../_mappers';

/* Constants */
import { ROUTES, STYLES } from '../../_constants';

/* Framework Helpers */
import {
    Container,
    MEDIA_QUERIES,
} from 'aphrodite-react';

/* Components Helpers */
import { BackButton, Logo, Row, Column, Search } from '../';
import NavbarMenu from './NavbarMenu';

/* Wrapper Styles */
const NavbarWrapper = styled('nav')((props) => ({
    padding  : '15px 0',
    textAlign: 'left',

    [MEDIA_QUERIES.LT.SM]: {
        padding: '10px 0',
    },
}));

/* Component */
const Navbar = (props) => {
    const { history, layout } = props;
    const { xs }         = layout;
    const { location }   = history;
    const { pathname }   = location;
    const logoWidth      = (!xs ? '300px' : '180px');
    const isOnSearchPage = (pathname === ROUTES.SEARCH_INDEX);
    const isOnShowPage   = (pathname.includes('/shows/'));

    return (
        <NavbarWrapper>
            <Container>
                <Row>
                    {(!xs) ? (null) : (
                        <Column>
                            {(!isOnShowPage) ? (null) : (
                                <div>
                                    <BackButton />
                                </div>
                            )}
                        </Column>
                    )}
                    <Column styles={{ maxWidth: logoWidth, minWidth: logoWidth }}>
                        <Link style={{ ...STYLES.LINK, display: 'block', width: (!xs ? '100%' : '50px'), margin: (!xs ? 0 : '0 auto') }}
                              to={ROUTES.INDEX}>
                            <Logo title={true} />
                        </Link>
                    </Column>
                    {(xs) ? (null) : (
                        <Column>
                            {(isOnSearchPage) ? (null) : (
                                <Search />
                            )}
                        </Column>
                    )}
                    <Column>
                        {(xs) ? (null) : (
                            <NavbarMenu />
                        )}
                    </Column>
                </Row>
            </Container>
            {(!xs) ? (null) : (<NavbarMenu />)}
        </NavbarWrapper>
    );
};

/* Exporting */
export default connect(genericMapper)(withRouter(Navbar));
