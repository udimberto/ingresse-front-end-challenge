/* Comments Constants */
export const COMMENTS = {
    /* Actions */
    LOADING: 'COMMENTS:LOADING',
    SET    : 'COMMENTS:SET',
    CLEAR  : 'COMMENTS:CLEAR',
    ADD    : 'COMMENTS:ADD',
    REMOVE : 'COMMENTS:REMOVE',

    /* Database */
    TABLE: 'comments',
    MODEL: {
        showId   : '',
        userId   : '',
        timestamp: '',
        content  : '',
        replying : '',
    },

    /* Settings */
    LIMIT: 140,
};
