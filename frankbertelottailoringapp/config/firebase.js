// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import Constants from 'expo-constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw1_Vp96MAqRcvmOcD4cglIIAqgbK0WKU",
  authDomain: "frankbertelottailoringap-83075.firebaseapp.com",
  projectId: "frankbertelottailoringap-83075",
  storageBucket: "frankbertelottailoringap-83075.appspot.com",
  messagingSenderId: "359093673742",
  appId: "1:359093673742:web:f24a4e53aca9e58a80415f",
  measurementId: "G-77MT51QNZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth  = getAuth(app);
const firestore = getFirestore(app);
//export const analytics = getAnalytics(firebaseConfig);

export { auth, firestore };