/* Packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

/* Framework Helpers */
import { Badge, Placeholder } from 'aphrodite-react';

/* Helper Components */
import { BookmarkButton, Image, Title } from '../';

/* Mappers */
import { showsMapper } from '../../_mappers';

/* Actions */
import { shows } from '../../_actions';

/* Constants */
import { ROUTES } from '../../_constants';
import SHOW_STYLES from './show.styles';
const { BOOKMARK_BTN, GENRE_BADGE, TITLE, CardWrapperStyled } = SHOW_STYLES;

/* Component */
class ShowCard extends Component {
    /**
     * Constructor
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            loading : false,
            selected: false,
        };

        this.contentRef     = React.createRef();
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    /**
     * Click Handler
     */
    onClickHandler(evt) {
        const { ctrlKey, metaKey } = evt;
        const { loading } = this.state;

        if (ctrlKey || metaKey) {
            return;
        }

        evt.preventDefault();

        this.setState({
            selected: true,
        });

        if (loading) {
            return;
        }

        const { dispatch, history, show } = this.props;

        this.setState({
            loading: true,
        });

        scroll.scrollTo(0, {
            duration: 150,
        });

        history.push(ROUTES.SHOW.replace(':id', show.id));
        dispatch(shows.search('', null));
        dispatch(shows.searchLoading(false));

        dispatch(shows.select(show));
        dispatch(shows.selectLoading(false));
    }

    /**
     * Render
     */
    render() {
        const { current }  = this.contentRef;
        const { selected } = this.state;
        const { show, loading, mobile } = this.props;
        const {
            id,
            name,
            genres,
            poster,
        } = (show || {});
        let height = 'auto';

        if (loading || !show || !id) {
            return (
                <Placeholder />
            );
        }

        if (mobile && current && current.clientHeight) {
            height = ('-' + current.clientHeight + 'px');
        }

        return (
            <CardWrapperStyled
                mobile={mobile}
                className={`show-card ${(this.state.loading || selected) ? 'show-card--selected' : ''}`}>
                <BookmarkButton id={id} show={show} styles={BOOKMARK_BTN} />
                <NavLink
                    className="show-card__link"
                    onClick={this.onClickHandler}
                    to={ROUTES.SHOW.replace(':id', id)}>
                    <Image
                        src={poster}
                        className="show-card__poster-bg"
                    />
                    <Image
                        src={poster}
                        className="show-card__poster"
                    />
                    <div ref={this.contentRef}
                         className="show-card__content"
                         style={{ marginTop: height }}>
                        <Title
                            type="h4"
                            className="show-card__title"
                            styles={TITLE}>
                            {name}
                        </Title>
                        <div className="show-card__content__genres">
                            {genres.map((genre, index) => (
                                <Badge
                                    sm
                                    key={index}
                                    color="black"
                                    styles={GENRE_BADGE}
                                    className="show-card__content__genres__item">
                                    {genre}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </NavLink>
            </CardWrapperStyled>
        );
    }
};

/* Exporting */
export default connect(showsMapper)(withRouter(ShowCard));
