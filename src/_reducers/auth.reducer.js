/* Constant */
import { AUTH } from '../_constants';

/* Initial State */
const initialState = {
    authenticated: false,
    data         : null,
    loading      : false,
};

/* Reducer */
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH.LOADING:
            return {
                ...state,
                loading: action.content,
            };

        case AUTH.SET:
            return {
                ...state,
                authenticated: (action.content ? true : false),
                data         : action.content,
            };

        default:
            return state;
    }
};

/* Exporting */
export default authReducer;
