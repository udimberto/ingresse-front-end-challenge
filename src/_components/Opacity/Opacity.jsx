/* Packages */
import React from 'react';
import styled from '@emotion/styled';

/* Styles */
const OpacityWrapper = styled('span')((props) => ({
    ...props.styles,
    opacity: (props.opacity || props.value || 1),
}));

/* Component */
const Opacity = (props) => {
    const { children } = props;

    return (
        <OpacityWrapper {...props}>
            {children}
        </OpacityWrapper>
    );
};

/* Exporting */
export default Opacity;
