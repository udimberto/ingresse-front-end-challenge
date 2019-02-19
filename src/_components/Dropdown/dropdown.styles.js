/* Framework Helpers */
import { COLORS as APH_COLORS, RADIUS } from 'aphrodite-react';

/* Constants */
import { COLORS } from '../../_constants';
const DISTANCE = 'calc(100% + 10px)';

/* Dropdown Styles */
const DROPDOWN_STYLES = {
    WRAPPER: (props) => ({
        position: 'relative',
        display : 'block',
        width   : '100%',

        WebkitBoxOrient   : 'vertical',
        WebkitBoxDirection: 'normal',

        '.dropdown': {
            '&__toggle, &__content': {
                width: '100%',
            },

            '&__toggle' : {
                display   : 'block',
                cursor    : 'pointer',
                border    : 0,
                outline   : 0,
                color     : 'inherit',
                background: 'transparent',

                padding  : 0,
                minWidth : '30px',
                minHeight: '30px',
            },

            '&__content': {
                display  : 'none',
                position : 'absolute',
                top      : ((props.up || props.right) ? 'auto' : DISTANCE),
                bottom   : (props.up ? DISTANCE : 'auto'),
                left     : (props.right ? '100%' : (props.left) ? 'auto' : '50%'),
                right    : (props.left ? '100%' : (props.right) ? 'auto' : null),
                transform: (props.right || props.left) ? null : 'translateX(-50%)',

                opacity  : 0,
                zIndex   : -100,
                minWidth : (props.width ? (props.width + 'px') : null),

                willChange: 'z-index, opacity',
                transition: 'display 0.1s linear, opacity 0.25s linear',

                color     : COLORS.PRIMARY,
                background: COLORS.WHITE,
                boxShadow : `0 0 8px ${APH_COLORS.GET('DARK_BLACK', 0.5)}`,

                padding: (props.thin ? 0 : '15px'),
                borderRadius: RADIUS.XS,

                fontSize: '14px',
                textAlign: 'left',

                alignSelf: 'center',
                overflow : 'hidden',

                '&.visible': {
                    display: 'block',
                },

                '&.active': {
                    opacity: 1,
                    zIndex : 10000,
                },
            },
        },

        '&.up': {
            '.dropdown': {
                '&__content': {
                    top   : 'auto',
                    bottom: '100%',
                },
            },
        },
    }),

    ITEM: (props) => ({
        position : 'relative',
        display  : 'block',
        width    : '100%',
        padding  : '10px 15px',
        textAlign: 'center',

        whiteSpace  : 'nowrap',
        overflow    : 'hidden',
        textOverflow: 'ellipsis',

        color     : 'inherit',
        background: 'transparent',
        textDecoration: 'none',

        border : 0,
        outline: 0,

        transition: 'color 0.1s linear, background 0.1s linear',

        '+ *': {
            borderTop: '1px solid rgba(0, 0, 0, 0.05) !important',
        },

        '&[type="submit"], &[type="button"], &[href]': {
            cursor: 'pointer',

            '&:hover, &.active': {
                color     : COLORS.PRIMARY_INVERSE,
                background: COLORS.PURPLE,
            },
        },
    }),
};

/* Exporting */
export default DROPDOWN_STYLES;
