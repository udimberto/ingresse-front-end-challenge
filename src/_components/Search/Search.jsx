/* Packages */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

/* Constants */
import { ROUTES } from '../../_constants';

/* Services */
import { flow, shows } from '../../_services';

/* Mappers */
import { showsMapper } from '../../_mappers';

/* Actions */
import { shows as actions } from '../../_actions';

/* Components Helpers */
import { Input } from '../';

/* Framework Helpers */
import {
    Button,
    MEDIA_QUERIES,
    RADIUS,
} from 'aphrodite-react';

/* Wrapper Styles */
const SearchWrapper = styled('form')((props) => ({
    position : 'relative',
    display  : 'block',
    width    : '100%',
    margin   : '0 auto',
    padding  : '15px 0 0',
    textAlign: 'right',

    [MEDIA_QUERIES.LT.SM]: {
        padding : '10px 0',
        maxWidth: '280px',
    },

    ...props.styles,
}));

/* Input Styles */
const inputStyles = {
    paddingRight: '60px',

    [MEDIA_QUERIES.LT.SM]: {
        paddingRight: '15px',
    },
};

/* Button Styles */
const btnStyles = {
    position    : 'absolute',
    top         : '20px',
    right       : '5px',
    minWidth    : '40px',
    padding     : 0,
    opacity     : 0.25,
    borderRadius: RADIUS.XS,
    transition  : 'opacity 0.25s linear',
    fontFamily  : 'sans-serif',

    [MEDIA_QUERIES.LT.SM]: {
        // display   : 'none',
        top       : '10px',
        right     : 0,
        minWidth  : '50px',
        height    : '50px !important',
        lineHeight: '50px !important',
    },
};

/* Component */
class Search extends Component {
    /**
     * Constructor
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            focused: false,
            term   : (flow.getParam('term') || ''),
        };

        this.input       = React.createRef();
        this.searchTimer = null;

        this.toggleFocus        = this.toggleFocus.bind(this);
        this.search             = this.search.bind(this);
        this.onChangeHandler    = this.onChangeHandler.bind(this);
        this.redirectionHandler = this.redirectionHandler.bind(this);
    }

    /**
     * Will Mount
     */
    componentDidMount() {
        const { term } = this.state;

        if (!term) {
            return;
        }

        this.search(true);
    }

    /**
     * Toggle Focus
     *
     * @param {boolean} isFocused
     */
    toggleFocus(isFocused) {
        const { focused } = this.state;

        this.setState({
            focused: ((typeof isFocused === 'boolean') ? isFocused : !focused),
        });
    }

    /**
     * On Change Handler
     *
     * @param {object} evt
     */
    onChangeHandler(evt) {
        const { target } = (evt || {});
        const { value }  = (target || {});

        this.setState({
            term   : (value || ''),
            focused: true,
        }, () => {
            this.search();
        });
    }

    /**
     * Search
     *
     * @param {object} evt
     */
    search(evt) {
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }

        const { dispatch, search } = this.props;
        const { term } = this.state;

        if (search.term === term) {
            return;
        }

        if (!term) {
            evt = true;
        }

        clearTimeout(this.searchTimer);

        this.searchTimer = setTimeout(() => {
            const { term } = this.state;

            dispatch(actions.searchLoading(term ? true : false));
            dispatch(actions.search((term || ''), null));
            this.redirectionHandler();

            if (!term) {
                return;
            }

            shows
            .search(term)
            .then((response) => {
                dispatch(actions.search(term, response));
            })
            .finally(() => {
                dispatch(actions.searchLoading(false));
            });
        }, (evt) ? 0 : 5000);
    }

    /**
     * Redirection Handler
     *
     * @param {boolean} firstRun
     */
    redirectionHandler(firstRun = false) {
        const { term }           = this.state;
        const { history }        = this.props;
        const { location, push } = history;
        const { pathname }       = location;
        const SEARCH_ROUTE       = ROUTES.SEARCH_TERM.replace(':term', term);

        if (term &&
            (pathname !== SEARCH_ROUTE)) {
            push(SEARCH_ROUTE);
        }

        if (!term &&
            !firstRun &&
            (pathname !== ROUTES.SEARCH_TERM)) {
            push(ROUTES.SEARCH_INDEX);
        }
    }

    /**
     * Render
     */
    render () {
        const { styles, search } = this.props;
        const { term, focused }  = this.state;
        const { loading }        = search;

        return (
            <SearchWrapper
                noValidate
                styles={styles}
                onSubmit={this.search}>
                <Input
                    type="search"
                    forwardRef={this.input}
                    value={term}
                    onBlur={() => this.toggleFocus(false)}
                    onFocus={() => this.toggleFocus(true)}
                    onChange={this.onChangeHandler}
                    styles={inputStyles}
                />
                <Button
                    color="white"
                    type="button"
                    disabled={loading}
                    styles={Object.assign({}, btnStyles, (focused || term) ? { opacity: 1 } : {})}
                    onClick={this.search}>
                    <FontAwesomeIcon icon={loading ? 'spinner' : 'search'} spin={loading} />
                </Button>
            </SearchWrapper>
        );
    }
};

/* Exporting */
export default connect(showsMapper)(withRouter(Search));
