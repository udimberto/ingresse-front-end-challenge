/* Constant */
import { BOOKMARKS } from '../_constants';

/* Services */
import { bookmarks, storage } from '../_services';

const STORAGE       = BOOKMARKS.TABLE;
const STORAGE_SHOWS = STORAGE.concat('_shows');

/* Initial State */
const initialState = {
    ids    : (storage.get(STORAGE) || []),
    list   : (storage.get(STORAGE_SHOWS) || []),
    loading: false,
};

/* Validation */
const validation = (item = {}, ids = [], list = []) => {
    const _indexed = ids.indexOf(item.id);

    if (_indexed >= 0) {
        ids  = ids.splice(_indexed, 1);
        list = list.splice(_indexed, 1);

    } else {
        ids.push(item.id);
        list.push(item);
    }

    return {
        ids : ids,
        list: list,
    };
};

/* Reducer */
const bookmarksReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOKMARKS.CLEAR:
            return {
                ...state,
                ids : [],
                list: [],
            };

        case BOOKMARKS.INIT:
            return {
                ...state,
                ids : action.ids,
                list: action.list,
            };

        case BOOKMARKS.SET:
            const content = (action.content);
            let ids       = (state.ids);
            let list      = (state.list);

            if (typeof content === 'object') {
                if (content.hasOwnProperty('map') && content.hasOwnProperty('length')) {
                    content.map((bookmarkItem) => {
                        validation(bookmarkItem, ids, list);

                        return true;
                    });

                    return;
                }

                validation(content, ids, list);
            }

            bookmarks.sync(ids);

            if (ids.length) {
                storage.set(STORAGE, ids);
                storage.set(STORAGE_SHOWS, list);

            } else {
                storage.remove(STORAGE);
                storage.remove(STORAGE_SHOWS);
            }

            return {
                ...state,
                ids : (ids || state.ids),
                list: list,
            };

        case BOOKMARKS.LOADING:
            return {
                ...state,
                loading: action.content,
            };

        default:
            return state;
    }
};

/* Exporting */
export default bookmarksReducer;
