/* Service Helpers */
import { firebase, storage, users } from './';

/* Constants Helpers */
import { AUTH } from '../_constants';

/**
 * Fill User data
 *
 * @param {object} _user
 */
const _fillUser = (_user) => {
    if (typeof _user !== 'object') {
        return _user;
    }

    let _filled = {};

    AUTH.USER_FIELDS.map((field) => {
        if (_filled[field] || !_user[field]) {
            return false;
        }

        _filled[field] = _user[field];

        return true;
    });

    return _filled;
};

/**
 * Set User to Storage
 *
 * @param {object} user
 */
const setUser = (user) => {
    if (user) {
        users.add(user.uid, user);
        storage.set('user', user);

        return true;
    }

    storage.remove('user');

    return false;
};

/* Authentication Service */
export const auth = {
    /**
     * Get Auth reference
     */
    ref: firebase.auth,

    /**
     * Get UI Instance
     */
    ui: firebase.getUi,

    /**
     * Set user to Storage
     */
    setUser: setUser,

    /**
     * Get Session User
     */
    getUser: (user) => {
        const _user       = (user || firebase.getAuth.currentUser);
        let _userFiltered = null;

        if (_user != null) {
            _user.providerData.forEach((profile) => {
                _userFiltered = _fillUser(profile);
            });

            _userFiltered = _fillUser(_user);
        }

        setUser(_userFiltered);

        return _userFiltered;
    },

    /**
     * Update User data
     *
     * @param {object} data
     */
    updateUser: (data) => {
        return new Promise((resolve, reject) => {
            const user = firebase.getAuth.currentUser;

            if (!user) {
                return reject('user:not-logged');
            }

            user.updateProfile(data)
            .catch(reject)
            .then(resolve);
        });
    },

    /**
     * Delete User
     */
    deleteUser: () => {
        return new Promise((resolve, reject) => {
            const user = firebase.getAuth.currentUser;

            if (!user) {
                return reject('user:not-logged');
            }

            return user.delete();
        });
    },

    /**
     * Logout
     */
    logout: () => {
        storage.clear();

        return firebase.getAuth.signOut();
    },
};
