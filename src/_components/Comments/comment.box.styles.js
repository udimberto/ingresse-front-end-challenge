/* Packages */
import styled from '@emotion/styled';

/* Framework Helpers */
import { MEDIA_QUERIES, RADIUS } from 'aphrodite-react';

/* Styles */
const SEND_BTN = {
    minHeight : '20px',
    lineHeight: '14px',
    fontSize  : '12px',

    borderRadius: `0 0 ${RADIUS.XS}px 0`,
};

/* Comment Styles */
const COMMENT_BOX_STYLES = {
    CommentBoxStyled: styled('form')((props) => ({
        ...props.styles,

        '.comment-box': {
            '&__limit': {
                position: 'relative',

                '&__text': {
                    position: 'absolute',
                    top     : 0,
                    right   : 0,
                    bottom  : 0,
                    left    : 0,
                    padding : '4px 0 0',

                    textAlign : 'center',
                    fontSize  : '12px',
                    lineHeight: '16px',
                },
            },
        },
    })),

    SEND_BTN: {
        ...SEND_BTN,

        [MEDIA_QUERIES.LT.SM]: {
            ...SEND_BTN,
        },
    },
};

/* Exporting */
export default COMMENT_BOX_STYLES;
