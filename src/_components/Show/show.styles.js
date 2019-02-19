/* Packages */
import styled from '@emotion/styled';

/* Constants Helpers */
import { COLORS, MEDIA_QUERIES, RADIUS } from 'aphrodite-react';
import { STYLES } from '../../_constants';

/* Show Styles */
const SHOW_STYLES = {
    /* Bookmark Button Definitions */
    BOOKMARK_BTN: {
        [MEDIA_QUERIES.LT.SM]: {
            minWidth: '50px',
        },
    },

    /* Card Definitions */
    CARD_MAX_SUMMARY : 52,
    CardWrapperStyled: styled('article')((props) => ({
        ...STYLES.FLEX,

        position: 'relative',
        width   : '100%',
        margin  : '0',

        minHeight: props.mobile ? '360px' : '480px',

        zIndex  : 10,
        overflow: 'hidden',
        justifyContent: 'flex-end',

        background: COLORS.GET('DARK_BLACK', 0.35),

        '.show-card': {
            '&__link': {
                ...STYLES.FLEX,
                justifyContent: 'flex-end',

                color: COLORS.WHITE,
                textDecoration: 'none',
                outline: 0,
                border : 0,
            },

            '&__poster, &__poster-bg': {
                opacity   : 0.75,
                transition: 'all 0.25s linear, transform 0.5s linear',

                position : 'absolute',
                zIndex   : -1,
                height   : 'auto',
                left     : '-20px',
            },

            '&__poster': {
                top         : '20px',
                width       : 'calc(100% - 60px)',
                left        : '50%',
                transform   : 'translateX(-50%)',
                borderRadius: RADIUS.MD,
            },

            '&__poster-bg': {
                zIndex : -10,
                width    : 'calc(100% + 40px)',
                top      : '50%',
                transform: 'translateY(-50%) scale(1.4)',
                filter   : 'blur(10px)',
            },

            '&__content': {
                position  : 'relative',
                padding   : '20px 25px',
                background: COLORS.GET('DARK_BLACK', 0.5),

                '&:after': {
                    position : 'absolute',
                    content  : '" "',
                    display  : 'block',
                    width    : 'calc(100% + 40px)',
                    top      : 0,
                    right    : '-20px',
                    bottom   : 0,
                    left     : '-20px',
                    boxShadow: `0 -10px 20px ${COLORS.GET('DARK_BLACK', 0.5)}`
                },

                '&__genres': {
                    paddingTop : '10px',
                    marginRight: '-5px',
                    marginLeft : '-5px',
                },
            },

            '&__title': {
                paddingTop   : '5px',
                paddingBottom: '5px',
            },
        },

        '.show-bookmark-btn': {
            position: 'absolute',
            zIndex  : 20,
            top     : '15px',
            right   : '15px',
            opacity : 0.5,
            transition: 'opacity 0.2s linear',
        },

        'p': {
            margin: '5px 0',
        },

        ':hover': {
            '.show-card__poster, .show-bookmark-btn': {
                opacity: 1,
            },

            '.show-card__poster': {
            },
        },

        '&.show-card--disabled': {
            '.show-card__poster': {
                filter: 'blur(1px) grayscale(100%)',
            },
        },

        [MEDIA_QUERIES.LT.SM]: {
            '.show-card': {
                '&__poster': {
                    opacity: 1,

                    '&-bg': {
                        position: 'relative',
                    },
                },

                '&__content': {
                    textAlign: 'center',

                    '&__genres': {
                        '&__item': {
                            minWidth: '90%',
                            fontSize: '12px',
                        },

                        [MEDIA_QUERIES.LT.SM]: {
                            paddingTop: 0,
                        },
                    },
                },
            },
        },
    })),

    TITLE: {
        [MEDIA_QUERIES.LT.SM]: {
            fontSize  : '18px',
            lineHeight: '20px',
        },
    },

    GENRE_BADGE: {
        padding: '6px 15px 4px',
        margin : '5px',
    },
};

export default SHOW_STYLES;
