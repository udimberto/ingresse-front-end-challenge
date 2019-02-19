/* Packages */
import styled from '@emotion/styled';

/* Comments List Styles */
const COMMENTS_LIST_STYLES = {
    CommentsListWrapper: styled('div')((props) => ({
        position: 'relative',
        padding : (props.padding || '20px 0 60px'),

        '.comments__loading': {
            padding: '40px 0',
        },

        ...props.styles,
    })),
};

/* Exporting */
export default COMMENTS_LIST_STYLES;
