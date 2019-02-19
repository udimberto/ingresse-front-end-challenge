/* Packages */
import React from 'react';
import styled from '@emotion/styled';

/* Wrapper Styles */
const ColumnWrapper = styled('div')((props) => ({
    display  : 'flex',
    flex     : '0 0 auto',
    flexGrow     : 1,
    flexBasis    : 0,
    flexDirection: 'column',

    paddingRight: '10px',
    paddingLeft : '10px',


    minWidth: (props.width || null),
    maxWidth: (props.width || '100%'),

    ...props.styles,
}));

/* Component */
const Column = (props) => {
    const { className, children, styles, width } = props;
    return (
        <ColumnWrapper className={`col ${className || ''}`} width={width} styles={styles}>
            {children}
        </ColumnWrapper>
    );
};

/* Exporting */
export default Column;
