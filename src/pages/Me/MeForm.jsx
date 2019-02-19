/* Packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Actions */
import { auth as actions } from '../../_actions';

/* Services */
import { auth } from '../../_services';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Framework Helpers */
import { toast } from 'aphrodite-react';

/* Components */
import { Button, Input } from '../../_components';

/* Component */
class MeForm extends Component {
    /**
     * Constructor
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            displayName: '',
            email      : '',
            loading    : false,
        };

        this.unmounted       = false;
        this.input           = React.createRef();
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    /**
     * Will Unmount
     */
    componentWillUnmount() {
        this.unmounted = true;
    }

    /**
     * On change handler
     */
    onChangeHandler(evt) {
        const { target }      = Object.assign({}, evt);
        const { name, value } = (target || {});

        if (!name || this.unmounted) {
            return;
        }

        this.setState({
            [name]: (value || ''),
        });
    }

    /**
     * On change handler
     */
    onSubmitHandler(evt) {
        const { dispatch, user } = this.props;

        evt.preventDefault();

        this.setState({
            loading: true,
        });

        auth.updateUser({
            displayName: this.state.displayName
        })
        .then(() => {
            toast.inverse('Profile updated');

            const data = Object.assign({}, user, {
                displayName: this.state.displayName,
            });

            dispatch(actions.set(data));
            auth.setUser(data);

            if (this.unmounted) {
                return;
            }

            this.setState({
                loading: false,
            });
        })
        .catch((error) => {
            toast.error(error);

            this.setState({
                loading: false,
            });
        });
    }

    /**
     * Render
     */
    render() {
        const { loading } = this.state;
        const { email, displayName } = this.props.user;

        return (
            <form noValidate
                  onSubmit={this.onSubmitHandler}>
                <Input
                    label="Name"
                    icon="user-circle"
                    type="text"
                    id="displayName"
                    name="displayName"
                    autoComplete="off"
                    margin="30px 0"
                    disabled={loading}
                    defaultValue={displayName}
                    onChange={this.onChangeHandler}
                />
                <Input
                    label="E-mail"
                    icon="envelope"
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    margin="30px 0"
                    disabled={true}
                    defaultValue={email}
                    onChange={this.onChangeHandler}
                />
                <Button
                    block
                    transparent
                    disabled={loading}
                    type="submit">
                    Save
                </Button>
            </form>
        );
    }
};

/* Exporting */
export default connect(genericMapper)(MeForm);
