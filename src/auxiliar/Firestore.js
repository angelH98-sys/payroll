import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyCpIJm5_Dczcuho0H27pdMja4vaB9s5Aj4",
    authDomain: "dpspayroll-19f13.firebaseapp.com",
    databaseURL: "https://dpspayroll-19f13.firebaseio.com",
    projectId: "dpspayroll-19f13",
    storageBucket: "dpspayroll-19f13.appspot.com",
    messagingSenderId: "1075708703952",
    appId: "1:1075708703952:web:144f53740b09ebf0309ad5",
    measurementId: "G-7N0S6ERHN3"
  };

const db = firebase.initializeApp(config).firestore();

export default db;