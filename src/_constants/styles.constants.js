/* Framework Helpers */
import { MEDIA_QUERIES } from 'aphrodite-react';

/* Styles Constants */
export const STYLES = {
    LINE_HEIGHT     : '30px',
    FONT_SIZE       : '22px',
    FONT_FAMILY     : '"Custom", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    FONT_FAMILY_BOLD: '"CustomBold", "Roboto", "Helvetica Neue", "Arial", sans-serif',

    SMALL_FONT_SIZE  : '16px',
    SMALL_LINE_HEIGHT: '20px',

    FLEX: {
        display      : 'flex',
        flex         : '1 1 auto',
        flexDirection: 'column',
    },
    LINK: {
        textDecoration: 'none',
        outline: 0,
        border : 0,

        '&:hover, &:active, &:focus': {
            outline: 0,
            border : 0,
        },
    },
    BADGE: {
        verticalAlign: 'middle',
        borderRadius : '12px',

        padding: '8px 15px 4px',
        margin : '-2px 0 0 10px',

        [MEDIA_QUERIES.LT.SM]: {
            opacity: 1,
        },
    },
    USER_AVATAR: {
        display : 'block',
        width   : '100%',
        maxWidth: '60px',
        height  : 'auto',
        margin  : '5px auto 10px',

        borderRadius: '50%',
        border      : '4px solid white',
        boxShadow   : '0 0 8px rgba(0, 0, 0, 0.1)',
    },
};
