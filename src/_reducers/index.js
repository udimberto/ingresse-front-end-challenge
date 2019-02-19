/* Packages */
import { combineReducers } from 'redux';

/* Reducers */
import auth from './auth.reducer';
import bookmarks from './bookmarks.reducer';
import comments from './comments.reducer';
import layout from './layout.reducer';
import shows from './shows.reducer';

/* Combining Reducers */
const appReducer = combineReducers({
    auth,
    bookmarks,
    comments,
    layout,
    shows,
});

/* Export Combined Reducers */
export default appReducer;
