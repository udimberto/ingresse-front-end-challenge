/* Constant */
import { COMMENTS } from '../_constants';

/**
 * Set Comments loading to Context
 *
 * @param {object} content
 *
 * @return {function} dispatch
 */
const loading = (content = false) => {
    return dispatch => {
        dispatch({
            type   : COMMENTS.LOADING,
            content: content,
        });
    };
};

/**
 * Set Comments data to Context
 *
 * @param {object} content
 *
 * @return {function} dispatch
 */
const set = (content = null) => {
    return dispatch => {
        dispatch({
            type   : COMMENTS.SET,
            content: content,
        });
    };
};

/**
 * Clear Comments data from Context
 *
 * @return {function} dispatch
 */
const clear = () => {
    return dispatch => {
        dispatch({
            type: COMMENTS.CLEAR,
        });
    };
};

/**
 * Add Comment data to Context
 *
 * @param {object} content
 *
 * @return {function} dispatch
 */
const add = (content = null) => {
    return dispatch => {
        dispatch({
            type   : COMMENTS.ADD,
            content: content,
        });
    };
};

/**
 * Remove Comment data from Context
 *
 * @param {object} content
 *
 * @return {function} dispatch
 */
const remove = (content = null) => {
    return dispatch => {
        dispatch({
            type   : COMMENTS.REMOVE,
            content: content,
        });
    };
};

/* Exporting */
export const comments = {
    loading,
    set,
    clear,
    add,
    remove,
};
