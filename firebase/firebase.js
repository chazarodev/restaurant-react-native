import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            firebase.firestore().settings({ experimentalForceLongPolling: true, merge: true});
        }
        this.db = firebase.firestore();
    }
}

const firebaseApp = new Firebase();
export default firebaseApp;