import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCd1WOnCxZbHzNk50zAivvu8oMki2nfllc",
    authDomain: "health-analysis-e8f51.firebaseapp.com",
    projectId: "health-analysis-e8f51",
    storageBucket: "health-analysis-e8f51.firebasestorage.app",
    messagingSenderId: "701070303878",
    appId: "1:701070303878:web:060ae43d596002b8d1a707",
    measurementId: "G-GKFJFFLQJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };    
