// Import the functions you need from the SDKs you need

import firebase from 'firebase/app';
import "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCiZZ_5PxXvcc4L9J7tvgzLJzwnkSesjyM",

  authDomain: "reservations-app-c1485.firebaseapp.com",

  projectId: "reservations-app-c1485",

  storageBucket: "reservations-app-c1485.appspot.com",

  messagingSenderId: "434885800213",

  appId: "1:434885800213:web:a2e6af4315fa4a9778b91c"

};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage()
