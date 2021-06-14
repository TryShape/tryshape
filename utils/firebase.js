import firebase from "firebase";

// firebase config
// TODO: move to env
const firebaseConfig = {
    apiKey: "AIzaSyDeGOAUFx93nPa71uiMkUXgWeZfBXIAQY4",
    authDomain: "tryshape-app.firebaseapp.com",
    projectId: "tryshape-app",
    storageBucket: "tryshape-app.appspot.com",
    messagingSenderId: "309904349527",
    appId: "1:309904349527:web:76cfdc9e028c0e7ae0c612",
    measurementId: "G-R82N2SGZJL"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

// using db and auth
const auth = firebase.auth;
const db = firebase.firestore();

export { db, auth };
