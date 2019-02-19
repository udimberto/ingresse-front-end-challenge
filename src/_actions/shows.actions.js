/* Constant */
import { SHOWS } from '../_constants';

/**
 * Set Search results to Context
 *
 * @param {string} term
 * @param {object} content
 *
 * @return {function} dispatch
 */
const search = (term = '', content = null) => {
    return dispatch => {
        dispatch({
            type   : SHOWS.SEARCH,
            term   : term,
            content: content,
        });
    };
};

/**
 * Set Search loading to Context
 *
 * @param {boolean} loading
 *
 * @return {function} dispatch
 */
const searchLoading = (loading = false) => {
    return dispatch => {
        dispatch({
            type   : SHOWS.SEARCH_LOADING,
            content: loading,
        });
    };
};

/**
 * Set Show selected to Context
 *
 * @param {object} show
 *
 * @return {function} dispatch
 */
const select = (show = null) => {
    return dispatch => {
        dispatch({
            type   : SHOWS.SELECT,
            content: show,
        });
    };
};

/**
 * Set Show selected loading state to Context
 *
 * @param {boolean} loading
 *
 * @return {function} dispatch
 */
const selectLoading = (loading = false) => {
    return dispatch => {
        dispatch({
            type   : SHOWS.SELECT_LOADING,
            content: loading,
        });
    };
};

/* Exporting */
export const shows = {
    search,
    searchLoading,
    select,
    selectLoading,
};
