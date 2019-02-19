/* Packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Mappers */
import { layoutMapper } from '../../_mappers';

/* Components */
import { Button } from '../../_components';

/* Constants */
import BACK_BTN_STYLES from './back.button.styles';

/* Component */
class BackButton extends Component {
    /**
     * Constructor
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.props = props;

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    /**
     * Click Handler
     */
    onClickHandler() {
        const { history } = this.props;
        const { goBack }  = history;

        goBack();
    }

    /**
     * Render
     */
    render() {
        const { className, children, styles } = this.props;

        return (
            <Button
                title="Back"
                transparent
                styles={Object.assign({}, BACK_BTN_STYLES, styles)}
                className={`back-btn ${className || ''}`}
                onClick={this.onClickHandler}>
                <FontAwesomeIcon fixedWidth icon="chevron-left" />
                {(!children) ? (null) : (
                    <span className="back-btn__text">
                        {children}
                    </span>
                )}
            </Button>
        );
    }
};

/* Exporting */
export default connect(layoutMapper)(withRouter(BackButton));
