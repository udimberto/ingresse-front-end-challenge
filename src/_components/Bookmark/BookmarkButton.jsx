/* Packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Actions */
import { bookmarks } from '../../_actions';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Constants */
import { ROUTES } from '../../_constants';

/* Framework Helpers */
import { RADIUS } from 'aphrodite-react';

/* Components */
import { Button } from '../../_components';

/* Component */
class BookmarkButton extends Component {
    /**
     * Constructor
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            marked: (this.props.bookmarks.ids.includes(this.props.id) || false),
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    /**
     * Click Handler
     */
    onClickHandler() {
        const { auth, show, dispatch, history } = this.props;
        const { location, push }                = history;
        const { pathname, search }              = location;
        const { authenticated }                 = auth;

        if (!authenticated) {
            return push(ROUTES.LOGIN.concat('?then=', encodeURIComponent(pathname.concat(search))))
        }

        dispatch(bookmarks.set(show));

        this.setState({
            marked: !this.state.marked,
        });
    }

    /**
     * Render
     */
    render() {
        const { bookmarks, className, show, styles, text } = this.props;
        const { marked } = this.state;
        const { ids }    = bookmarks;
        const { id }     = show;

        return (
            <Button
                title={`${marked ? 'Remove from' : 'Add to'} your bookmarks.`}
                {...this.props}
                radius={RADIUS.XS}
                styles={Object.assign({}, styles)}
                className={`show-bookmark-btn ${className || ''}`}
                color={(marked || ids.includes(id)) ? 'orange' : 'white'}
                onClick={this.onClickHandler}>
                <FontAwesomeIcon fixedWidth icon="bookmark" />
                {(!text) ? (null) : (
                    `${marked ? 'In your' : 'Add to'} bookmarks`
                )}
            </Button>
        );
    }
};

/* Exporting */
export default connect(genericMapper)(withRouter(BookmarkButton));
