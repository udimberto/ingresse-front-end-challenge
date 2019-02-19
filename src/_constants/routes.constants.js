/* ROUTES Constants */
export const ROUTES = {
    INDEX: '/',
    LOGIN: '/login',
    ABOUT: '/about',

    SEARCH_INDEX: '/search',
    SEARCH_TERM : '/search?term=:term',

    SHOW: '/shows/:id',

    /* Private Routes */
    PROFILE  : '/me',
    BOOKMARKS: '/bookmarks',

    /* Redirections */
    REDIRECT: {
        WHEN: {
            AUTHENTICATED  : '/me',
            UNAUTHENTICATED: '/',
        },
    },

    /* Extras */
    TITLE: ' | TVmaze by @udimberto',
};
