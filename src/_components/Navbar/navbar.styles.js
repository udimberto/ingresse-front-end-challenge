/* Constants Helpers */
import { COLORS, STYLES } from '../../_constants';

/* Framework Helpers */
import { MEDIA_QUERIES } from 'aphrodite-react';

/* Navbar Styles */
const NAVBAR_STYLES = {
    WRAPPER: {
        display  : 'inline-block',
        width    : '100%',
        padding  : '15px 0',

        fontSize  : '16px',
        lineHeight: '20px',
        textAlign : 'right',

        [MEDIA_QUERIES.LT.SM]: {
            position: 'fixed',
            zIndex  : 9000,
            bottom  : 0,
            right   : 0,
            left    : 0,
            padding : '5px 0',

            background: COLORS.TRANSLUCID.PURPLE,
        },
    },

    MENU_LINK: {
        width   : '100%',
        padding : '15px 0 0',
        margin  : 0,
        display : 'inline-block',
        position: 'relative',
        cursor  : 'pointer',

        borderRadius: '5px',

        transition: 'color 0.15s linear',

        color     : '#fff',
        background: 'transparent',
        border    : 0,
        outline   : 0,

        fontWeight: '700',
        fontSize  : STYLES.SMALL_FONT_SIZE,
        lineHeight: STYLES.SMALL_LINE_HEIGHT,
        textAlign : 'center',

        textTransform : 'uppercase',
        textDecoration: 'none',

        '&:before': {
            content  : '" "',
            position : 'absolute',
            top      : '40px',
            left     : '50%',
            transform: 'translateX(-50%)',

            width : '5px',
            height: '5px',

            borderRadius: '50%',

            background: 'transparent',
            transition: 'background 0.25s linear',
        },

        '&:hover, &.active': {
            color: COLORS.ORANGE,

            '&:before': {
                background: COLORS.ORANGE,
            },
        },

        [MEDIA_QUERIES.LT.SM]: {
            padding   : '5px 0 0',
            fontSize  : '8px',
            lineHeight: '10px',

            '&:before': {
                display: 'none',
            },

            '.navbar__menu__icon': {
                margin: '0 0 4px',
            },
        },
    },

    MENU_USER: {
        position : 'relative',
        display  : 'block',
        width    : '100%',
        padding  : '10px 15px',
        textAlign: 'center',

        whiteSpace  : 'nowrap',
        overflow    : 'hidden',
        textOverflow: 'ellipsis',

        color     : COLORS.PRIMARY,
        background: 'transparent',
        textDecoration: 'none',
        border : 0,
        outline: 0,

        transition: 'color 0.1s linear, background 0.1s linear',

        '+ *': {
            borderTop: '1px solid rgba(0, 0, 0, 0.05) !important',
        },
    },

    MENU_USER_LINK: {

        '&:hover, &.active': {
            color     : COLORS.PRIMARY_INVERSE,
            background: COLORS.PRIMARY,
        },
    },
};

export default NAVBAR_STYLES;
