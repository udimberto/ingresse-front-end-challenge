/* Framework Helpers */
import { MEDIA_QUERIES } from 'aphrodite-react';

/* Constants Helpers */
import { STYLES } from '../../_constants';

/* Show Page Styles */
const SHOW_PAGE_STYLES = {
    WRAPPER: {
        paddingTop   : '20px',
        paddingBottom: '20px',

        ...STYLES.FLEX,

        justifyContent: 'center',

        [MEDIA_QUERIES.LT.SM]: {
            textAlign: 'center',
            paddingBottom: '20px',
        },
    },

    TITLE: {
        paddingTop: 0,
        marginTop : '-3px',

        [MEDIA_QUERIES.LT.SM]: {
            marginTop: '20px',
        },
    },

    BOOKMARK_BTN: {
        marginTop    : '-10px',
        marginRight  : '10px',
        verticalAlign: 'middle',

        [MEDIA_QUERIES.LT.SM]: {
            minWidth: '220px',
            maxWidth: '220px',
            margin  : '20px auto 40px',
        },
    },
};

/* Exporting */
export default SHOW_PAGE_STYLES;
