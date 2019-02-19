/* Packages */
import React from 'react';
import styled from '@emotion/styled';

/* Framework Helpers */
import { MEDIA_QUERIES, RADIUS } from 'aphrodite-react';

/* Wrapper Styles */
const RowWrapper = styled('div')((props) => ({
    display      : 'flex',
    flex         : '0 1 auto',
    flexDirection: 'row',
    flexWrap     : 'wrap',

    marginRight: (props.stretched ? '-20px' : '-10px'),
    marginLeft : (props.stretched ? '-20px' : '-10px'),


    WebkitBoxPack : props.center ? 'center' : null,
    MsFlexPack    : props.center ? 'center' : null,
    justifyContent: props.center ? 'center' : null,

    '.col': {
        '&:first-of-type': {
            overflow              : props.rounded ? 'hidden' : null,
            borderTopLeftRadius   : props.rounded ? RADIUS.SM : null,
            borderBottomLeftRadius: props.rounded ? RADIUS.SM : null,
        },

        '&:last-of-type': {
            overflow               : props.rounded ? 'hidden' : null,
            borderTopRightRadius   : props.rounded ? RADIUS.SM : null,
            borderBottomRightRadius: props.rounded ? RADIUS.SM : null,
        },
    },

    [MEDIA_QUERIES.LT.SM]: {
        marginRight: (props.stretched ? '-15px' : null),
        marginLeft : (props.stretched ? '-15px' : null),
    },

    ...props.styles,
}));

/* Component */
const Row = (props) => {
    const {
        center,
        className,
        children,
        stretched,
        rounded,
        styles
    } = props;

    return (
        <RowWrapper
            center={center}
            className={`row ${className || ''}`}
            stretched={stretched}
            rounded={rounded}
            styles={styles}>
            {children}
        </RowWrapper>
    );
};

/* Exporting */
export default Row;
