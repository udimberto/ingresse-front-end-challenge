/* Packages */
import React from 'react';

/* Components */
import { Button as AphButton } from 'aphrodite-react';

/* Constants */
import BTN_STYLES from './button.styles';

/* Component */
const Button = (props) => {
    const { transparent, styles } = props;

    return (
        <AphButton
            {...props}
            styles={Object.assign({}, BTN_STYLES, (transparent ? BTN_STYLES.TRANSPARENT : {}), (styles || {}))}
        />
    );
};

/* Exporting */
export default Button;
