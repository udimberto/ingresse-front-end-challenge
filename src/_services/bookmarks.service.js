/* Service Helpers */
import { auth, firebase, shows } from './';

/* Constants */
import { BOOKMARKS } from '../_constants';
const { TABLE } = BOOKMARKS;
const db = firebase.getDatabase;

/* Bookmark Service */
export const bookmarks = {
    /**
     * Get bookmarks
     */
    get: () => {
        return new Promise((resolve, reject) => {
            const user   = auth.getUser();
            const userId = ((user && user.uid) ? user.uid : null);

            if (!userId) {
                return reject('no-user-id');
            }

            db.collection(TABLE).doc(userId).get()
                .then((response) => {
                    if (!response.exists) {
                        return reject('no-bookmarks');
                    }

                    const data = response.data();

                    let showsPromises = [];
                    let ids           = [];
                    let bookmarksIds  = data.ids.split(',');

                    bookmarksIds.map((id) => {
                        if (!id) {
                            return false;
                        }

                        ids.push(parseInt(id, 10));
                        showsPromises.push(shows.getById(id));

                        return true;
                    });

                    Promise.all(showsPromises)
                    .then((response) => {
                        resolve({
                            ids : ids,
                            list: (response || []),
                        })
                    })
                    .catch(reject);
                })
                .catch(reject)
            ;
        });
    },

    /**
     * Sync Bookmarks to database
     *
     * @param {array} ids
     */
    sync: (ids = []) => {
        const user   = auth.getUser();
        const userId = user ? user.uid : null;

        if (!userId) {
            return new Promise((resolve, reject) => {
                reject('no-user-id');
            });
        }

        if (!ids.length) {
            return db.collection(TABLE).doc(userId).delete();
        }

        return db.collection(TABLE).doc(userId).set({ ids: ids.toString() });
    },
};
