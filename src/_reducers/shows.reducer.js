/* Constant */
import { SHOWS } from '../_constants';

/* Initial State */
const initialState = {
    search  : {
        data   : null,
        loading: false,
        term   : '',
    },
    selected: {
        data   : null,
        loading: false,
    },
};

/* Reducer */
const showsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOWS.SEARCH:
            return {
                ...state,
                search: {
                    ...state.search,
                    data: action.content,
                    term: action.term,
                },
            };

        case SHOWS.SEARCH_LOADING:
            return {
                ...state,
                search: {
                    ...state.search,
                    loading: action.content,
                },
            };

        case SHOWS.SELECT:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    data: action.content,
                    term: action.term,
                },
            };

        case SHOWS.SELECT_LOADING:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    loading: action.content,
                },
            };

        default:
            return state;
    }
};

/* Exporting */
export default showsReducer;
