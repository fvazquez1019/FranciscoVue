import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI3dldbWTuP_2aTUyA75zrsoy9h1PzGnM",
  authDomain: "web-programming-final-88382.firebaseapp.com",
  projectId: "web-programming-final-88382",
  storageBucket: "web-programming-final-88382.appspot.com",
  messagingSenderId: "334629079531",
  appId: "1:334629079531:web:8a96ca358d68a7f52431ae",
  measurementId: "G-3N655EBF5B"
};

// ✅ Only initialize if no apps exist
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
