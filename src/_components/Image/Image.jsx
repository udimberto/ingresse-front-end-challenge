/* Packages */
import React from 'react';
import ReactImg from 'react-image';

/* Components */
import { Styled } from '../';

/* Constants */
import { STYLES } from '../../_constants';
// import IMAGE_STYLES from './image.styles.js';

/* Component */
const Image = (props) => {
    const { avatar, width, styles } = props;
    const _styles = Object.assign({},
        (avatar ? STYLES.USER_AVATAR : {}),
        (width ? { maxWidth: (width + 'px') } : {}),
        styles
    );

    return (
        <Styled
            {...props}
            styles={_styles}
        />
    );
};

/* Default Props */
Image.defaultProps = {
    avatar: false,
    width : null,
    styles: {},
    tag   : ReactImg,
};

/* Exporting */
export default Image;
