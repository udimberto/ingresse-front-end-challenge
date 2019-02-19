/* Packages */
import React, { Component } from 'react';

/* Services */
import { auth, firebase } from '../../_services';

/* Component */
class Login extends Component {
    /**
     * Constructor
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.props     = props;
        this.unmounted = false;
    }

    /**
     * Will Unmount
     */
    componentWillUnmount() {
        this.unmounted = true;
    }

    /**
     * Did Mount
     */
    componentDidMount() {
        const { id } = this.props;

        setTimeout(() => {
            if (this.unmounted) {
                return;
            }

            auth.ui.start(`#authContainer${id || ''}`, {
                signInOptions: [
                    firebase.providers.google,
                ],
                signInFlow: 'popup',
            });
        }, 1000);
    }

    /**
     * Render
     */
    render() {
        const { id } = this.props;

        return (
            <article id={`authContainer${id || ''}`}></article>
        );
    }
};

/* Exporting */
export default Login;
