/* Packages */
import React from 'react';
import styled from '@emotion/styled';

/* Constants */
import { STYLES } from '../../_constants';

/* Component */
const Text = (props) => {
    const { children, tag } = props;

    /* Styles */
    const TextWrapper = styled(tag || 'p')((props) => ({
        margin : (props.margin || '10px 0'),
        padding: 0,

        fontSize  : (props.fontSize || STYLES.FONT_SIZE),
        lineHeight: (props.lineHeight || STYLES.LINE_HEIGHT),

        opacity: (props.opacity || 1),

        textAlign    : (props.center ? 'center' : (props.right ? 'right' : null)),
        textTransform: (props.uppercase ? 'uppercase' : (props.lowercase ? 'lowercase' : null)),
    }));

    return (
        <TextWrapper {...props}>
            {children}
        </TextWrapper>
    );
};

/* Exporting */
export default Text;
