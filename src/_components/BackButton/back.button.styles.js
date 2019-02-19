/* Framework Helpers */
import { MEDIA_QUERIES } from 'aphrodite-react';

/* Styles */
const SIZES = {
    minHeight : '40px',
    minWidth  : '40px',
    lineHeight: '34px',
};

/* Back Button Styles */
const BACK_BTN_STYLES = {
    ...SIZES,

    '.back-btn__text': {
        margin: '0 10px 0',
    },

    [MEDIA_QUERIES.LT.SM]: {
        ...SIZES,
    },
};

/* Exporting */
export default BACK_BTN_STYLES;
