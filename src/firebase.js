// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import * as firebase from 'firebase';
import 'firebase/firestore';
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD4qP-cvnEv9ljI3DrdM0OSLLf1ak73AKc",
  authDomain: "todo-e68e9.firebaseapp.com",
  databaseURL: "https://todo-e68e9.firebaseio.com",
  projectId: "todo-e68e9",
  storageBucket: "todo-e68e9.appspot.com",
  messagingSenderId: "50701535203",
  appId: "1:50701535203:web:2f775c02ebd1c2c5a142d6",
  measurementId: "G-RZ1NV0PE16",
});

const db = firebaseApp.firestore();
    console.log('namita   ++++++ db', db);
export default db;
