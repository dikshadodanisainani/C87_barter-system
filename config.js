import firebase from 'firebase'
require('@firebase/firestore')


const firebaseConfig = {
    apiKey: "AIzaSyDyyJd6SvdEAEZJvFniG45u1N9RIaMpL3E",
    authDomain: "bartar-system-91ce6.firebaseapp.com",
    projectId: "bartar-system-91ce6",
    storageBucket: "bartar-system-91ce6.appspot.com",
    messagingSenderId: "320491191982",
    appId: "1:320491191982:web:2f1402b9ac6924a6ed373f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();