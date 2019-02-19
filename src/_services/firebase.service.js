/* Packages */
import _firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseui from 'firebaseui';

/* Constants */
import { FIREBASE } from '../_constants';

/* Initialize */
_firebase.initializeApp(FIREBASE.CONFIG);

/* Values */
const _auth     = _firebase.auth;
const auth      = _firebase.auth();
const _database = _firebase.firestore;
const database  = _firebase.firestore();

/* Instances */
const ui = new firebaseui.auth.AuthUI(auth);

/* Firebase Service */
export const firebase = {
    /**
     * Get Authenticator reference
     */
    auth: _auth,

    /**
     * Get Authenticator Instance
     */
    getAuth: auth,

    /**
     * Get Database reference
     */
    database: _database,

    /**
     * Get Database Instance
     */
    getDatabase: database,

    /**
     * Get UI instance
     */
    getUi: ui,

    /**
     * Providers IDs
     */
    providers: {
        facebook: _auth.FacebookAuthProvider.PROVIDER_ID,
        google  : _auth.GoogleAuthProvider.PROVIDER_ID,
        twitter : _auth.TwitterAuthProvider.PROVIDER_ID,
    },
};
