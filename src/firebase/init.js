// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore, grtFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI3dldbWTuP_2aTUyA75zrsoy9h1PzGnM",
  authDomain: "web-programming-final-88382.firebaseapp.com",
  projectId: "web-programming-final-88382",
  storageBucket: "web-programming-final-88382.firebasestorage.app",
  messagingSenderId: "334629079531",
  appId: "1:334629079531:web:8a96ca358d68a7f52431ae",
  measurementId: "G-3N655EBF5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
export default db;