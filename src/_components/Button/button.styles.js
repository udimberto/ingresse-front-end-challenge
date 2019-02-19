/* Framework Helpers */
import { COLORS, RADIUS } from 'aphrodite-react';

/* Button Styles */
const BTN_STYLES = {
    minWidth    : '50px',
    minHeight   : '50px',
    lineHeight  : '30px',
    padding     : '4px 5px 0',
    borderRadius: RADIUS.XS,

    textAlign: 'center',

    TRANSPARENT: {
        border         : '1px solid transparent !important',
        backgroundColor: 'transparent !important',

        '&:focus, &:hover': {
            opacity        : 1,
            backgroundColor: `${COLORS.GET('WHITE', 0.1)} !important`,
        },
    },
};

/* Exporting */
export default BTN_STYLES;
