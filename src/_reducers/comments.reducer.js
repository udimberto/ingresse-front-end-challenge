/* Constant */
import { COMMENTS } from '../_constants';

/* Initial State */
const initialState = {
    list   : [],
    loading: false,
};

/* Reducer */
const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMMENTS.CLEAR:
            return {
                ...state,
                list: [],
            };

        case COMMENTS.SET:
            return {
                ...state,
                ...action.content,
            };

        case COMMENTS.ADD:
            let _list = (state.list || []);

            _list.push(action.content);

            return {
                ...state,
                list: _list,
            };

        case COMMENTS.REMOVE:
            let { list } = state;
            let _index   = list.some((comment, index) => {
                return (comment.id === action.id ? index : -1);
            });

            if (_index >= 0) {
                list.splice(_index, 1);
            }

            return {
                ...state,
                list: list,
            };

        case COMMENTS.LOADING:
            return {
                ...state,
                loading: action.content,
            };

        default:
            return state;
    }
};

/* Exporting */
export default commentsReducer;
