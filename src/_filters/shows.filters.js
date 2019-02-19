/**
 * Constants
 */
import { SHOWS } from '../_constants';

/**
 * Format Show
 *
 * @param {object} show
 */
const format = (show = null) => {
    if (typeof show !== 'object') {
        return null;
    }

    let _filtered = Object.assign({}, show);

    _filtered.poster      = (_filtered.image ? (_filtered.image.original || _filtered.image.medium) : SHOWS.EMPTY_POSTER);
    _filtered.posterEmpty = (!_filtered.image || (!_filtered.image.original || !_filtered.image.medium)) ? true : false;

    return _filtered;
};

/* Exporting */
export const showsFilters = {
    format,
};
