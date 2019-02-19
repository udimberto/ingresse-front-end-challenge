/* API Constants */
const _API = {
    URL: 'https://api.tvmaze.com/'
};

/* Exporting */
export const API = {
    ..._API,
    ENDPOINTS: {
        SEARCH: 'search/shows?q=:term',
        SHOW  : 'shows/:id',
    },
};
