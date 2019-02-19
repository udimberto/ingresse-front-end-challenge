/* Packages */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Mappers */
import { genericMapper } from '../../_mappers';

/* Actions */
import { shows } from '../../_actions';

/* Services */
import { shows as service } from '../../_services';

/* Framework Helpers */
import { Container, toast } from 'aphrodite-react';

/* Helper Components */
import { BackButton, BookmarkButton, Column, CommentsList, Image, Row, Styled, Text, Title, ShowGenres } from '../../_components';

/* Constants */
import SHOW_PAGE_STYLES from './show.page.styles';
import { ROUTES, SHOWS } from '../../_constants';
const { MSGS } = SHOWS;

/* Component */
class Show extends Component {
    /**
     * Constructor
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.props = props;

        this.set         = this.set.bind(this);
        this.fetch       = this.fetch.bind(this);
        this.backHandler = this.backHandler.bind(this);
    }

    /**
     * Will Mount
     */
    componentWillMount() {
        this.fetch();
    }

    /**
     * Will Unmount
     */
    componentWillUnmount() {
        this.set();
    }

    /**
     * Set Show to Context
     */
    set(show = null, loading = false) {
        const { dispatch } = this.props;

        dispatch(shows.select(show));
        dispatch(shows.selectLoading(loading));
    }

    /**
     * Fetch
     */
    fetch() {
        const { history, match } = this.props;
        const { params } = (match || {});
        const { id }     = (params || {});

        if (!id || !parseInt(id, 10)) {
            return toast.inverse(MSGS.INVALID, { autoClose: 10000 });
        }

        const { shows }    = this.props;
        const { selected } = (shows || {});
        const { data }     = (selected || {});

        this.set(data, true);

        service.getById(id)
            .then((response) => {
                this.set(response, false)
            })
            .catch(() => {
                history.push(ROUTES.INDEX);
                toast.inverse(MSGS.INVALID, { autoClose: 10000 });
            })
        ;
    }

    /**
     * Back Handler
     */
    backHandler() {

    }

    /**
     * Render
     */
    render() {
        const { xs }            = this.props.layout;
        const { selected }      = this.props.shows;
        const { data, loading } = (selected || {});
        const {
            id,
            name,
            genres,
            poster,
            summary,
        } = (data || {});

        if (loading) {
            return (
                <Styled styles={{ textAlign: 'center' }}>
                    <Title center uppercase type="h3">
                        Loading...
                    </Title>
                </Styled>
            );
        }

        if (!data) {
            return (null);
        }

        const posterColumnWidth = (xs ? '240px' : '300px');

        return (
            <section>
                <Helmet>
                    <title>
                        {name || 'Show Details'} {ROUTES.TITLE}
                    </title>
                </Helmet>
                <Styled styles={SHOW_PAGE_STYLES.WRAPPER}>
                    <Container>
                        <Row center={xs}>
                            <Column width={posterColumnWidth}>
                                {(xs) ? (null) : (
                                    <Styled styles={{ textAlign: 'center', paddingBottom: '20px' }}>
                                        <div>
                                            <BackButton>
                                                Back
                                            </BackButton>
                                        </div>
                                    </Styled>
                                )}
                                <Image
                                    src={poster}
                                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                />
                                {(xs) ? (null) : (
                                    <ShowGenres
                                        genres={genres}
                                        styles={{ paddingTop: '20px' }}
                                    />
                                )}
                            </Column>
                            <Column width={xs ? '100%' : null}>
                                <Title center={xs} uppercase bold styles={SHOW_PAGE_STYLES.TITLE}>
                                    <BookmarkButton
                                        id={id}
                                        show={data}
                                        block={xs}
                                        text={xs}
                                        styles={SHOW_PAGE_STYLES.BOOKMARK_BTN}
                                    />
                                    {name || 'Show Details'}
                                </Title>
                                <Text tag="div" center={xs} styles={{ marginTop: 0 }}>
                                    <p dangerouslySetInnerHTML={{ __html: summary }}></p>
                                </Text>
                                {(!xs) ? (null) : (
                                    <ShowGenres genres={genres} />
                                )}
                            </Column>
                        </Row>
                    </Container>
                </Styled>
                <Container xs>
                    <Title center uppercase type="h2">
                        Comments
                    </Title>
                    <CommentsList showId={id} />
                </Container>
            </section>
        );
    }
};

/* Exporting */
export default connect(genericMapper)(withRouter(Show));
