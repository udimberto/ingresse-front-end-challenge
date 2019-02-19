/* Constant */
import { AUTH } from '../_constants';

/**
 * Set Auth loading to Context
 *
 * @param {object} content
 *
 * @return {function} dispatch
 */
const loading = (content = false) => {
    return dispatch => {
        dispatch({
            type   : AUTH.LOADING,
            content: content,
        });
    };
};

/**
 * Set Auth data to Context
 *
 * @param {object} content
 *
 * @return {function} dispatch
 */
const set = (content = null) => {
    return dispatch => {
        dispatch({
            type   : AUTH.SET,
            content: content,
        });
    };
};

/* Exporting */
export const auth = {
    set,
    loading,
};
