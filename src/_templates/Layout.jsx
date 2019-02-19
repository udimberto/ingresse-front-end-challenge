/* Packages */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

/* Services Helpers */
import {
    auth as authService,
    bookmarks as bookmarksService,
    firebase,
    storage,
} from '../_services';

/* Mappers */
import { genericMapper } from '../_mappers';

/* Actions */
import { auth, layout, bookmarks } from '../_actions';

/* Framework Helpers */
import { MEDIA_QUERIES } from 'aphrodite-react';

/* Components Helpers */
import { Navbar } from '../_components';

/* Constants */
import { COLORS, STYLES } from '../_constants';

/* Icons */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faArrowCircleLeft,
    faArrowCircleUp,
    faChevronLeft,
    faBan,
    faBookmark,
    faBullseye,
    faCalendar,
    faComments,
    faEllipsisH,
    faEllipsisV,
    faEnvelope,
    faPaperPlane,
    faPlay,
    faPlayCircle,
    faSearch,
    faSignInAlt,
    faSignOutAlt,
    faSpinner,
    faStar,
    faTimes,
    faTimesCircle,
    faUserCircle,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';

library.add(faSignInAlt);       // Auth: Login
library.add(faSignOutAlt);      // Auth: Logout
library.add(faEnvelope);        // Auth: Profile
library.add(faUserCircle);      // Auth: Profile

library.add(faArrowCircleLeft); // Navigation: Back
library.add(faArrowCircleUp);   // Navigation: Scroll Up
library.add(faChevronLeft);     // Navigation: Back
library.add(faEllipsisH);       // Navigation: Menu
library.add(faEllipsisV);       // Navigation: Menu
library.add(faBullseye);        // Navigation: About

library.add(faPlay);            // Trailer: Button
library.add(faPlayCircle);      // Trailer: Button alternative

library.add(faSearch);          // Search: Button
library.add(faSpinner);         // Search: Button

library.add(faBan);             // Show: Age indication
library.add(faBookmark);        // Show: as 'favorite'
library.add(faCalendar);        // Show: Release Date
library.add(faComments);        // Show: Comments
library.add(faPaperPlane);      // Show: Send Comment
library.add(faStar);            // Show: Rating
library.add(faTimes);           // Show: Comments Remove
library.add(faTimesCircle);     // Show: Comments Remove
library.add(faUsers);           // Show: Cast

/* Generic Background */
const background = require('../_assets/images/background.png');

/* Generic Styles */
const flex = {
    display      : 'flex',
    flex         : '1 1 auto',
    flexDirection: 'column',
    position     : 'relative',
    zIndex       : 1,
};

/* Styles */
const LayoutWrapper = styled('div')((props) => ({
    ...flex,

    color: COLORS.PRIMARY_INVERSE,

    backgroundRepeat  : 'no-repeat',
    backgroundSize    : 'cover',
    backgroundPosition: 'top center',
    transition        : 'background-image 0.2s ease-in',

    '&:before': {
        ...flex,
        position: 'absolute',
        content : '" "',
        zIndex  : -1,
        width   : '100%',
        height  : '100%',
        opacity : 0.85,

        background: COLORS.GRADIENTS.MAIN,
    },

    '&:after': {
        ...flex,
        position: 'absolute',
        content : '" "',
        zIndex  : -2,
        width   : '100%',
        height  : '50%',
        bottom  : 0,
        opacity : 1,

        background: COLORS.GRADIENTS.MAIN_FLIP,
    },

    'a:not([class])': {
        color: COLORS.PRIMARY_INVERSE,
    },

    'strong': {
        fontFamily: STYLES.FONT_FAMILY_BOLD,
        fontWeight: '500',
    },

    '.aph-button': {
        paddingTop: '3px',
    },

    '.layout': {
        '&__image': {
            position: 'fixed',
            top     : 0,
            left    : 0,
            zIndex  : -3,
            width   : '100%',
            bottom  : 0,
            opacity : 0,
            transition: 'opacity 0.2s linear',
            willChange: 'opacity',

            '&.visible': {
                opacity: 1,
            },
        },
    },

    ...props.styles,
}));

/* Styles */
const LayoutContent = styled('div')({
    ...flex,
    '> div': {
        ...flex,

        '> section': {
            ...flex,
            width    : '100%',
            minHeight: '100%',
            height   : 'auto',
            position : 'absolute',

            [MEDIA_QUERIES.LT.SM]: {
                paddingBottom: '90px',
            },
        },
    },
});

/* Component */
class Layout extends PureComponent {
    /**
     * Constructor
     *
     * @param {object} props - Component Props;
     */
    constructor(props) {
        super(props);

        this.props            = props;
        this.onResizeHandler  = this.onResizeHandler.bind(this);
        this.authHandler      = this.authHandler.bind(this);
    }

    /**
     * Will Mount
     */
    componentWillMount() {
        this.authHandler();
        window.addEventListener('resize', this.onResizeHandler);
    }

    /**
     * Will Unmount
     */
    componentWillUmount() {
        window.removeEventListener('resize', this.onResizeHandler);
    }

    /**
     * Resize Handler
     */
    onResizeHandler() {
        if (window.innerWidth === this.props.layout.width) {
            return;
        }

        const { dispatch } = this.props;

        dispatch(layout.resized());
    }

    /**
     * Authentication Handler
     */
    authHandler() {
        const { dispatch } = this.props;
        const cachedUser   = storage.get('user');

        dispatch(auth.set(cachedUser));
        dispatch(bookmarks.loading(true));

        firebase.getAuth.onAuthStateChanged((user) => {
            dispatch(auth.set(authService.getUser(user)));

            bookmarksService.get()
            .catch(console.log)
            .then((response) => {
                const { ids, list } = (response || {});

                dispatch(bookmarks.init(ids, list));
            })
            .finally(() => {
                dispatch(bookmarks.loading(false));
            });
        }, (error) => {
            dispatch(auth.set());
            dispatch(bookmarks.loading(false));
            console.error('error', error);
        });
    }

    /**
     * Render
     */
    render() {
        const { children, shows }     = this.props;
        const { selected }            = (shows || {});
        const { data }                = (selected || {});
        const { poster, posterEmpty } = (data || {});

        return (
            <LayoutWrapper
                className="layout"
                styles={{ backgroundImage: `url(${(posterEmpty ? background : poster) || background})` }}>
                <Navbar />
                <LayoutContent>
                    {children}
                </LayoutContent>
            </LayoutWrapper>
        );
    }
};

/* Exporting */
export default connect(genericMapper)(Layout);
