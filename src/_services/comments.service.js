/* Service Helpers */
import { firebase } from './';

/* Filters */
import { commentsFilters } from '../_filters';

/* Constants */
import { COMMENTS } from '../_constants';
const { TABLE } = COMMENTS;
const db = firebase.getDatabase;

/**
 * Get comments by Show
 *
 * @param {number} showId
 */
const getByShowId = (showId) => {
    return new Promise((resolve, reject) => {
        db
        .collection(TABLE)
        .where('showId', '==', showId)
        .get()
        .catch(reject)
        .then((response) => {
            resolve(commentsFilters.format(response, { showId: showId }));
        });
    });
};

/**
 * Get comments by UserID
 *
 * @param {number} userId
 */
const getByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db
        .collection(TABLE)
        .where('userId', '==', userId)
        .get()
        .catch(reject)
        .then((response) => {
            resolve(commentsFilters.format(response, { userId: userId }));
        });
    });
};

/* Bookmark Service */
export const comments = {
    /**
     * Get comments
     */
    get: (id) => {
        const isShow = ((id + '').length < 8);

        if (isShow) {
            return getByShowId(id);
        }

        return getByUserId(id);
    },

    /**
     * Add Comment
     *
     * @param {object} comment
     */
    add: (comment) => {
        return new Promise((resolve, reject) => {
            if (typeof comment !== 'object') {
                reject('comments:add:invalid-content');
            }

            let _comment = Object.assign({}, comment);

            Object.keys(_comment).map((key, value) => {
                if (!_comment[key] || !COMMENTS.MODEL.hasOwnProperty(key)) {
                    delete _comment[key];
                }

                return true;
            });

            db
            .collection(TABLE)
            .add(_comment)
            .catch(reject)
            .then((response) => {
                resolve(Object.assign({
                    id: response.id,
                    ..._comment,
                }));
            });
        });
    },

    /**
     * remove Comment
     *
     * @param {object} comment
     */
    remove: (id) => {
        return new Promise((resolve, reject) => {
            if (!id) {
                reject('comments:remove:invalid-id');
            }

            db
            .collection(TABLE)
            .doc(id)
            .delete()
            .catch(reject)
            .then(resolve);
        });
    },
};
