/* Packages */
import React from 'react';
import styled from '@emotion/styled';

/* Component */
const Styled = (props) => {
    const { tag, styles } = props;

    /* Styled Wrapper */
    const StyledWrapper = styled(tag)({
        boxSizing: 'border-box',

        ...styles,
    });

    let _props = Object.assign({}, props);
    delete _props.avatar;
    delete _props.tag;

    return (
        <StyledWrapper
            {..._props}
        />
    );
};

/* Default Properties */
Styled.defaultProps = {
    tag: 'div',
};

/* Exporting */
export default Styled;
