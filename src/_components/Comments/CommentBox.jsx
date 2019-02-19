/* Packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

/* Actions */
import { comments as actions } from '../../_actions';

/* Services */
import { comments as service } from '../../_services';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Framework Helpers */
import { NumberFormat, ProgressBar, COLORS, RADIUS } from 'aphrodite-react';

/* Components */
import { Button, Column, Input, Row } from '../../_components';

/* Constants */
import { COMMENTS, ROUTES } from '../../_constants';
import COMMENT_BOX_STYLES from './comment.box.styles';
const { CommentBoxStyled, SEND_BTN } = COMMENT_BOX_STYLES;

/* Component */
class CommentBox extends Component {
    /**
     * Constructor
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            content      : '',
            limitExceeded: false,
        };

        this.unmounted       = false;
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
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
        }, () => {
            const { content } = this.state;

            this.setState({
                limitExceeded: (content.length > COMMENTS.LIMIT),
            });
        });
    }

    /**
     * Submit Handler
     */
    onSubmitHandler(evt) {
        const { content, limitExceeded } = this.state;

        evt.preventDefault();

        if (!content || limitExceeded) {
            return;
        }

        const { auth, dispatch, history, showId, replying } = this.props;
        const { location, push }      = history;
        const { pathname, search }    = location;
        const { authenticated, data } = auth;

        if (!authenticated) {
            return push(ROUTES.LOGIN.concat('?then=', encodeURIComponent(pathname.concat(search))))
        }

        const comment = {
            content  : content,
            userId   : data.uid,
            showId   : showId,
            replying : replying,
            timestamp: moment().format(),
        };

        service.add(comment)
        .catch(console.error)
        .then((commentResponse) => {
            dispatch(actions.add(commentResponse));

            this.setState({
                content: '',
            });
        });
    }

    /**
     * Render
     */
    render() {
        const { className, layout, styles } = this.props;
        const { xs } = layout;
        const { content, limitExceeded } = this.state;
        const percentual = (!content) ? 0 : (content.length) / (COMMENTS.LIMIT / 100);

        return (
            <CommentBoxStyled
                noValidate
                styles={styles}
                onSubmit={this.onSubmitHandler}
                className={`comment-box ${className || ''}`}>
                <div className="comment-box__field">
                    <Input
                        textArea
                        id="content"
                        key="content"
                        name="content"
                        rows={xs ? 6 : 5}
                        tabIndex="1000"
                        value={content}
                        onChange={this.onChangeHandler}
                        styles={{ borderRadius: `${RADIUS.XS}px ${RADIUS.XS}px 0 0` }}
                    />
                </div>
                <Row center>
                    <Column
                        styles={{ paddingRight: 0 }}>
                        <div className="comment-box__limit">
                            <ProgressBar
                                height={20.5}
                                color={limitExceeded ? COLORS.RED : COLORS.PURPLE}
                                percentual={percentual}
                                wrapperStyles={{ backgroundColor: COLORS.GET('WHITE', 0.25), borderRadius: `0 0 0 ${RADIUS.XS}px` }}
                            />
                            {(!limitExceeded) ? (null) : (
                                <div className="comment-box__limit__text">
                                    <NumberFormat
                                        display="text"
                                        prefix="Exceeded "
                                        suffix={` of ${COMMENTS.LIMIT} characters.`}
                                        value={(content.length - COMMENTS.LIMIT)}
                                    />

                                </div>
                            )}
                        </div>
                    </Column>
                    <Column
                        width={100}
                        styles={{ paddingLeft: 0 }}>
                        <div>
                            <Button
                                block
                                color="orange"
                                type="submit"
                                tabIndex="1001"
                                disabled={!content || limitExceeded}
                                styles={SEND_BTN}>
                                Send
                                <FontAwesomeIcon icon="paper-plane" />
                            </Button>
                        </div>
                    </Column>
                </Row>
            </CommentBoxStyled>
        );
    }
};

/* Exporting */
export default connect(genericMapper)(withRouter(CommentBox));
