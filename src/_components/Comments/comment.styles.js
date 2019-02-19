/* Packages */
import styled from '@emotion/styled';

/* Framework Helpers */
import { COLORS } from 'aphrodite-react';

/* Comment Styles */
const COMMENT_STYLES = {
    CommentStyled: styled('div')(({
        position  : 'relative',
        fontSize  : '14px',
        lineHeight: '20px',
        margin    : '20px 0',
        opacity   : 0,

        '&.visible': {
            opacity: 1,
        },

        '*': {
            wordBreak: 'break-all',
        },

        '.comment': {
            '&__content': {
                padding: '25px 0 5px',
            },

            '&__menu': {
                padding: '10px 0 0',
            },

            '&__timestamp, &__author, &__link': {
                fontSize: '10px',
                color   : COLORS.GREY_SMOKE,
            },

            '&__timestamp': {
                textAlign: 'right',
            },

            '&__link': {
                color: COLORS.DARK_GREY,
                textDecoration: 'none',
            },
        },

        ' + .comment': {
            borderTop: `1px solid ${COLORS.GET('WHITE', 0.1)}`,
        },
    })),
};

/* Exporting */
export default COMMENT_STYLES;
