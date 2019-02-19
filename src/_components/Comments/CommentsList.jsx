/* Packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Actions */
import { comments as actions } from '../../_actions';

/* Services */
import { comments as service } from '../../_services';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Components */
import { Comment, CommentBox, Title } from '../';

/* Constants */
import COMMENTS_LIST_STYLES from './comments.list.styles';
const { CommentsListWrapper } = COMMENTS_LIST_STYLES;

/* Component */
class CommentsList extends Component {
    /**
     * Constructor
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.props = props;
        this.fetch = this.fetch.bind(this);
    }

    /**
     * Will Unmount
     */
    componentWillUnmount() {
        const { dispatch } = this.props;

        dispatch(actions.clear());
    }

    /**
     * Will Mount
     */
    componentWillMount() {
        this.fetch();
    }

    /**
     * Fetch Comments List
     */
    fetch() {
        const { dispatch, showId, userId } = this.props;

        dispatch(actions.loading(true));

        service.get(showId || userId)
        .catch(console.error)
        .then((response) => {
            dispatch(actions.set(response));
        })
        .finally(() => {
            dispatch(actions.loading(false));
        });
    }

    /**
     * Render
     */
    render() {
        const { className, comments, showId, userId, styles } = this.props;
        const { list, loading } = (comments || {});
        const isOnUserProfile   = (userId ? true : false);

        return (
            <CommentsListWrapper
                styles={styles}
                className={`comments ${className || ''}`}>
                {(!showId) ? (null) : (
                    <CommentBox showId={showId} />
                )}

                {(!loading) ? (null) : (
                    <div className="comments__loading">
                        <Title center type="h3">
                            Loading comments...
                        </Title>
                    </div>
                )}

                {(loading || !list || !list.length) ? (null) :
                    list.map((comment, index) => (
                        <Comment
                            key={`comment-${index}`}
                            index={index}
                            showId={showId}
                            comment={comment}
                            isOnUserProfile={isOnUserProfile}
                            onRemoveCallback={this.fetch}
                        />
                    ))
                }

                {(!loading && (!list || !list.length)) ? (
                    <div className="comments__loading">
                        <Title center type="h3">
                            {(isOnUserProfile) ? (
                                'You don\'t commented yet.'
                            )
                            :
                            (
                                'Be the first.'
                            )}
                        </Title>
                    </div>
                ) : (null)}
            </CommentsListWrapper>
        );
    }
};

/* Exporting */
export default connect(genericMapper)(CommentsList);
