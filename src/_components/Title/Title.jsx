/* Packages */
import React from 'react';
import styled from '@emotion/styled';

/* Utils from Aphrodite */
import { TITLE } from './title.constants';
import { COLORS, MEDIA_QUERIES } from 'aphrodite-react';

/* Component */
const Title = (props) => {
    const {
        children,

        bold,
        color,

        margin,
        padding,

        size,
        height,
        type,
        upper,
        uppercase,

        center,
        right,

        styles,
    } = props;

    const _VALID  = (type ? TITLE.TYPES.includes(type.toLowerCase()) : false);
    const _TYPE   = (_VALID ? type.toLowerCase() : 'h2');
    const _STYLES = (_VALID ? TITLE[type.toUpperCase()] : TITLE.H2);
    const _XS     = (_VALID && TITLE.XS[_TYPE.toUpperCase()] ? {
        [MEDIA_QUERIES.LT.SM]: Object.assign(TITLE.XS[_TYPE.toUpperCase()], (styles[MEDIA_QUERIES.LT.SM] || {})),
    } : {});

    const Wrapper = styled(_TYPE)(props => (Object.assign({}, _STYLES, {
        fontFamily: `"Custom${bold ? 'Bold' : ''}", "Roboto", "Helvetica Neue", "Arial", sans-serif`,
        fontWeight: (bold ? '700' : '400'),
        fontSize  : (size ? `${size}px` : _STYLES.fontSize),
        lineHeight: (height ? `${height}px` : (size && size > 30 ? '40px' : (size < 30 ? '30px' : _STYLES.lineHeight))),
        textAlign : (center ? 'center' : (right ? 'right' : null)),

        color: COLORS.GET(color),

        margin : (margin ? margin : '0'),
        padding: (padding ? padding : _STYLES.padding),

        textTransform: (upper || uppercase ? 'uppercase' : null),

        ...styles,

        ..._XS,
    })));

    return (
        <Wrapper className={props.className || ''}>
            {children}
        </Wrapper>
    );
};

/* Default props */
Title.defaultProps = {
    type  : 'h1',
    color : COLORS.WHITE,
    styles: {},
};

/* Exporting */
export default Title;
