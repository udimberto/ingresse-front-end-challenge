/* Packges */
import React from 'react';
import styled from '@emotion/styled';

/* Styles */
import DROPDOWN_STYLES from './dropdown.styles';

/* Component */
const DropdownItem = (props) => {
    const { type } = props;
    const DropdownItemStyled = styled(type || 'div')(DROPDOWN_STYLES.ITEM);

    return (
        <DropdownItemStyled {...props} />
    );
};

/* Exporting */
export default DropdownItem;
