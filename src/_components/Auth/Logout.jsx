/* Packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

/* Services */
import { auth } from '../../_services';

/* Actions */
import { bookmarks } from '../../_actions';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Framework Helpers */
import { Button } from 'aphrodite-react';

/* Constants */
import AUTH_STYLES from './auth.styles';

/* Component */
class Logout extends Component {
    /**
     * Constructor
     *
     * @param {object} props - Component Props;
     */
    constructor(props) {
        super(props);

        this.props  = props;
        this.logout = this.logout.bind(this);
    }

    /**
     * Logout
     */
    logout() {
        const { dispatch } = this.props;

        auth.logout();
        dispatch(bookmarks.clear());
    }

    /**
     * Render
     */
    render() {
        const { bold, button, styles } = this.props;
        const _styles = Object.assign({}, AUTH_STYLES.LOGOUT, styles);
        const _text   = 'Logout';
        let _children = _text;

        if (bold) {
            _children = (
                <strong>
                    {_text}
                </strong>
            );
        }

        if (!button) {
            const ToggleStyled = styled('button')(_styles);

            return (
                <ToggleStyled onClick={this.logout}>
                    {_children}
                </ToggleStyled>
            );
        }

        return (
            <Button
                color="white"
                onClick={this.logout}>
                {_children}
            </Button>
        );
    }
}

/* Exporting */
export default connect(genericMapper)(Logout);
