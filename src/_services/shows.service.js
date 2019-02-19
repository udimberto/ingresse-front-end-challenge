/* Services Helpers */
import axios from 'axios';
import { storage } from './';

/* Filters */
import { showsFilters } from '../_filters';

/* Constants */
import { API } from '../_constants';
const { URL, ENDPOINTS } = API;
const { SEARCH, SHOW }   = ENDPOINTS;
const _STORAGE_PREFIX    = 'show_';

/* Shows Service */
export const shows = {
    /**
     * Search
     *
     * @param {string} term
     *
     * @return {Promise}
     */
    search: (term = '') => {
        return new Promise((resolve, reject) => {
            axios
            .get(URL.concat(SEARCH.replace(':term', term)))
            .then((response) => {
                const { data } = (response || {});
                let resolved   = (data || []);
                let shows      = [];

                resolved.map((esItem) => {
                    shows.push(showsFilters.format(esItem.show));
                    return true;
                });

                resolve(shows);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    /**
     * Get TV Show by ID
     *
     * @param {any} id
     *
     * @return {Promise}
     */
    getById: (id) => {
        const STORAGE_KEY = _STORAGE_PREFIX.concat(id);

        return new Promise((resolve, reject) => {
            const cached = storage.get(STORAGE_KEY);

            if (cached) {
                return resolve(cached);
            }

            axios
            .get(URL.concat(SHOW.replace(':id', id)))
            .then((response) => {
                const { data } = (response || {});
                let resolved   = showsFilters.format(data);

                resolve(resolved);

                if (!data) {
                    return;
                }

                storage.set(STORAGE_KEY, Object.assign({}, cached, resolved));
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
};
