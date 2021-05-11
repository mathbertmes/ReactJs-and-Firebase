import firebase from 'firebase/app'
import 'firebase/firestore'




var firebaseConfig = {
    apiKey: "AIzaSyBpJz01V5gQfqgnQKFqYFE7rnhgqCM-1l4",
    authDomain: "teste-5b3a5.firebaseapp.com",
    databaseURL: "https://teste-5b3a5-default-rtdb.firebaseio.com",
    projectId: "teste-5b3a5",
    storageBucket: "teste-5b3a5.appspot.com",
    messagingSenderId: "976355502958",
    appId: "1:976355502958:web:10f1842e137088abb82f7f",
    measurementId: "G-JS5TDMXZF4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  export default firebase;