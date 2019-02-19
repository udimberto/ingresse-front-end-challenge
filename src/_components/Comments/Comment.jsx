/* Packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

/* Actions */
import { comments as actions } from '../../_actions';

/* Services */
import { comments as service, users, shows } from '../../_services';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Framework Helpers */
import { toast } from 'aphrodite-react';

/* Components */
import { Column, Dropdown, DropdownItem, Row } from '../../_components';

/* Constants */
import { ROUTES } from '../../_constants';
import COMMENT_STYLES from './comment.styles';
const { CommentStyled } = COMMENT_STYLES;

/* Component */
class Comment extends Component {
    /**
     * Constructor
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.props = props;

        const { auth, comment } = this.props;
        const { userId }        = (comment || {});
        const { data }          = (auth || {});
        const { uid }           = (data || {})
        const isTheSameUser     = ((userId && userId === uid) ? true : false);

        this.state = {
            removed      : false,
            removing     : false,
            visible      : false,
            show         : null,
            user         : null,
            isTheSameUser: isTheSameUser,
            appearDelay  : (this.props.index ? ((this.props.index * this.props.index) * 10) : 0),
        };

        this.unmounted     = false;
        this.showHandler   = this.showHandler.bind(this);
        this.userHandler   = this.userHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
    }

    /**
     * Will Unmount
     */
    componentWillUnmount() {
        this.unmounted = true;
    }

    /**
     * Will Mount
     */
    componentWillMount() {
        this.showHandler();
        this.userHandler();
    }

    /**
     * Did Mount
     */
    componentDidMount() {
        const { appearDelay } = this.state;

        setTimeout(() => {
            if (this.unmounted) {
                return;
            }

            this.setState({
                visible: true,
            });
        }, appearDelay);
    }

    /**
     * Show Handler
     */
    showHandler() {
        const { comment, isOnUserProfile } = this.props;
        const { showId }  = (comment || {});

        if (!showId || !isOnUserProfile) {
            return;
        }

        shows.getById(showId)
        .catch(console.error)
        .then((showResponse) => {
            if (this.unmounted) {
                return;
            }

            this.setState({
                show: showResponse,
            });
        });
    }

    /**
     * User Handler
     */
    userHandler() {
        const { isTheSameUser } = this.state;
        const { comment, isOnUserProfile } = this.props;
        const { userId }  = (comment || {});

        if (!userId || isOnUserProfile || isTheSameUser) {
            return;
        }

        users.getById(userId)
        .catch(console.error)
        .then((userResponse) => {
            if (this.unmounted) {
                return;
            }

            this.setState({
                user: userResponse,
            });
        });
    }

    /**
     * Remove Handler
     */
    removeHandler() {
        const { comment, dispatch, onRemoveCallback } = this.props;
        const { id } = (comment || {});

        this.setState({
            removing: true,
        }, () => {
            service.remove(id)
            .catch(toast.error)
            .then(() => {
                this.setState({
                    removed: true,
                }, () => {
                    setTimeout(() => {
                        dispatch(actions.remove(id));

                        if (onRemoveCallback) {
                            onRemoveCallback();
                        }
                    }, 500);
                });
            })
            .finally(() => {
                this.setState({
                    removing: false,
                });
            });
        });
    }

    /**
     * Render
     */
    render() {
        const { user, visible, removed, removing, show, isTheSameUser } = this.state;
        const { comment, className, isOnUserProfile } = this.props;
        const { id, content, timestamp, showId } = (comment || {});

        return (
            <CommentStyled
                className={`
                    animated comment ${className || ''}
                    ${visible ? 'flipInX visible' : ''}
                    ${removed ? 'zoomOutUp' : ''}
                `}
                styles={{ opacity: (removing ? 0.25 : 1) }}>
                <Row center>
                    <Column>
                        <div className="comment__content">
                            {content}
                        </div>
                    </Column>
                    {(id && isTheSameUser) ? (
                        <Column width={70}>
                            <div className="comment__menu">
                                <Dropdown
                                    thin
                                    width={120}
                                    toggle={(
                                        <div role="button">
                                            <FontAwesomeIcon fixedWidth size="lg" icon="ellipsis-h" />
                                        </div>
                                    )}>
                                    <DropdownItem
                                        type="button"
                                        onClick={this.removeHandler}>
                                        Remove
                                    </DropdownItem>
                                </Dropdown>
                            </div>
                        </Column>
                    ) : (null)}
                </Row>
                <Row center>
                    <Column width="60%">
                        <div>
                            {(isTheSameUser || !user || !user.displayName) ? (null) : (
                                <div className="comment__author">
                                    {user.displayName}
                                </div>
                            )}
                            {(!isTheSameUser) ? (null) : (
                                <span className="comment__author">You </span>
                            )}
                            {(!isOnUserProfile) ? (null) : (
                                <span className="comment__author">
                                    - about <NavLink
                                        className="comment__link"
                                        to={ROUTES.SHOW.replace(':id', showId)}>
                                        {(!show || !show.name) ? (
                                            'this show'
                                        ) : (
                                            show.name
                                        )}
                                    </NavLink>
                                </span>
                            )}
                        </div>
                    </Column>
                    <Column>
                        <div className="comment__timestamp">
                            {moment(timestamp).fromNow()}
                        </div>
                    </Column>
                </Row>
            </CommentStyled>
        );
    }
};

/* Exporting */
export default connect(genericMapper)(withRouter(Comment));
