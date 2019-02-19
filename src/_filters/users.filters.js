/**
 * Format Users Response
 *
 * @param {object} response
 */
const format = (response = null) => {
    if (!response ||
        typeof response !== 'object' ||
        typeof response.data !== 'function' ||
        !response.exists) {
        return null;
    }

    return response.data();
};

/* Exporting */
export const usersFilters = {
    format,
};
