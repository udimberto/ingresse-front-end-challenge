/* Framework Helpers */
import { COLORS as APH_COLORS } from 'aphrodite-react';

/* Base */
const _COLORS = {
    ...APH_COLORS,

    TOMATO: '#d24067',

    ORANGE: '#e88333',

    PURPLE: 'rgb(114, 60, 133)',

    BLUE  : '#101a4c',

    TRANSLUCID: {
        PURPLE: 'rgba(114, 60, 133, 0.75)',
    }
};

/* Exporting */
export const COLORS = {
    ..._COLORS,

    PRIMARY        : _COLORS.BLUE,
    PRIMARY_INVERSE: _COLORS.WHITE,

    GRADIENTS: {
        MAIN     : `linear-gradient(180deg, ${_COLORS.PURPLE} 0%, ${_COLORS.BLUE} 100%)`,
        MAIN_FLIP: `linear-gradient(180deg, transparent 0%, ${_COLORS.BLUE} 100%)`,
    },
};
