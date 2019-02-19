/* Framework Helpers */
import { sort } from 'aphrodite-react';

/**
 * Format Comments Response
 *
 * @param {object} response
 * @param {object} extras
 */
const format = (response = null, extras = {}) => {
    let _filtered = {
        list: [],
        ...extras,
    };

    if (!response ||
        typeof response !== 'object' ||
        typeof response.docs !== 'object' ||
        response.empty) {
        return _filtered;
    }

    let data = response.docs;

    data.map((comment) => {
        const data = comment.data();

        _filtered.list.push({
            id: comment.id,
            ...data,
        });

        return true;
    });

    _filtered.list = sort.byProperty(_filtered.list, 'timestamp');

    return _filtered;
};

/* Exporting */
export const commentsFilters = {
    format,
};
