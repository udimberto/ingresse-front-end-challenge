/* Constant */
import { BOOKMARKS } from '../_constants';

/**
 * Set Bookmarks loading to Context
 *
 * @param {object} content
 *
 * @return {function} dispatch
 */
const loading = (content = false) => {
    return dispatch => {
        dispatch({
            type   : BOOKMARKS.LOADING,
            content: content,
        });
    };
};

/**
 * Set Bookmarks data to Context
 *
 * @param {object} content
 *
 * @return {function} dispatch
 */
const set = (content = null) => {
    return dispatch => {
        dispatch({
            type   : BOOKMARKS.SET,
            content: content,
        });
    };
};

/**
 * Clear Bookmarks data from Context
 *
 * @return {function} dispatch
 */
const clear = () => {
    return dispatch => {
        dispatch({
            type: BOOKMARKS.CLEAR,
        });
    };
};

/**
 * Set Bookmarks data to Context
 *
 * @param {array} ids
 * @param {array} list
 *
 * @return {function} dispatch
 */
const init = (ids = [], list = []) => {
    return dispatch => {
        dispatch({
            type: BOOKMARKS.INIT,
            ids : ids,
            list: list,
        });
    };
};

/* Exporting */
export const bookmarks = {
    set,
    loading,
    clear,
    init,
};
