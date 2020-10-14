import firebase from 'firebase';
require('@firebase/firestore')

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8la7QYJ1Wip7-0jjjfWbfh4RIJSdWBU0",
  authDomain: "bncs-app.firebaseapp.com",
  databaseURL: "https://bncs-app.firebaseio.com",
  projectId: "bncs-app",
  storageBucket: "bncs-app.appspot.com",
  messagingSenderId: "497230080294",
  appId: "1:497230080294:web:33cf3d7e644c460563b9e7",
  measurementId: "G-85X9BHSEPN"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
