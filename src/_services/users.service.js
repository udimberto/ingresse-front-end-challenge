/* Packages */
import moment from 'moment';

/* Service Helpers */
import { firebase, storage } from './';

/* Filters */
import { usersFilters } from '../_filters';

/* Constants */
import { USERS } from '../_constants';
const { TABLE, PREFIX } = USERS;
const db = firebase.getDatabase;

/* Bookmark Service */
export const users = {
    /**
     * Get user by id
     */
    getById: (userId) => {
        return new Promise((resolve, reject) => {
            const cached = storage.get(PREFIX.concat(userId));
            const cachedMins = ((cached && cached.timestamp) ?
                moment().diff(cached.timestamp, 'minutes')
                :
                -1
            );

            if (cachedMins >= 0 && cachedMins <= 15) {
                return resolve(cached.data);
            }

            db
            .collection(TABLE)
            .doc(userId)
            .get()
            .catch(reject)
            .then((response) => {
                const data = usersFilters.format(response);

                storage.set(PREFIX.concat(userId), {
                    data     : data,
                    timestamp: moment().format(),
                });

                resolve(data);
            });
        });
    },

    /**
     * Add User
     *
     * @param {string} id
     * @param {object} user
     */
    add: (id, user) => {
        return new Promise((resolve, reject) => {
            if (!id || typeof user !== 'object') {
                reject('user:add:invalid-content');
            }

            let _user = {};

            Object.keys(user).map((key) => {
                if (!USERS.MODEL.hasOwnProperty(key)) {
                    return false;
                }

                _user[key] = user[key];

                return true;
            });

            db
            .collection(TABLE)
            .doc(id)
            .set(_user)
            .catch(reject)
            .then((response) => {
                storage.set(PREFIX.concat(id), {
                    data     : _user,
                    timestamp: moment().format(),
                });

                resolve({
                    id: id,
                    ..._user
                });
            });
        });
    },
};
